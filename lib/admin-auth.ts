import { env } from "cloudflare:workers";

const COOKIE_NAME = "dl_admin_session";
const encoder = new TextEncoder();

function secretEnv() {
  return env as unknown as {
    ADMIN_USERNAME?: string;
    ADMIN_PASSWORD?: string;
    ADMIN_SESSION_SECRET?: string;
  };
}

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sessionToken() {
  const secret = secretEnv().ADMIN_SESSION_SECRET;
  if (!secret) return "";
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode("dai-long-admin-v1")));
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return mismatch === 0;
}

export async function credentialsAreValid(username: string, password: string) {
  const expectedUser = secretEnv().ADMIN_USERNAME ?? "";
  const expectedPassword = secretEnv().ADMIN_PASSWORD ?? "";
  return (
    expectedUser.length > 0 &&
    expectedPassword.length > 0 &&
    constantTimeEqual(username, expectedUser) &&
    constantTimeEqual(password, expectedPassword)
  );
}

export async function isAdminCookie(cookieHeader: string | null) {
  if (!cookieHeader) return false;
  const cookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));
  if (!cookie) return false;
  const provided = decodeURIComponent(cookie.slice(COOKIE_NAME.length + 1));
  const expected = await sessionToken();
  return expected.length > 0 && constantTimeEqual(provided, expected);
}

export async function createAdminCookie() {
  const token = await sessionToken();
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`;
}

export function clearAdminCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

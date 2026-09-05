import { NextResponse } from "next/server";
import { createAdminCookie, credentialsAreValid } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { username?: string; password?: string } | null;
  if (!body || !(await credentialsAreValid(body.username ?? "", body.password ?? ""))) {
    return NextResponse.json({ error: "Tài khoản hoặc mật khẩu không đúng." }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.headers.set("Set-Cookie", await createAdminCookie());
  return response;
}

import type { Metadata } from "next";
import { headers } from "next/headers";
import { AdminPanel, LoginPanel } from "./admin-panel";
import { isAdminCookie } from "@/lib/admin-auth";
import { getProducts, getSettings } from "@/lib/content";
import { ensureAdminSchema } from "@/lib/admin-schema";

export const metadata: Metadata = { title: "Quản trị Đại Long", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const requestHeaders = await headers();
  const authenticated = await isAdminCookie(requestHeaders.get("cookie"));
  if (!authenticated) return <div className="admin-surface" lang="vi"><LoginPanel /></div>;
  try { await ensureAdminSchema(); }
  catch (error) { console.error("Admin schema setup failed", error); }
  const [settings, products] = await Promise.all([getSettings(), getProducts({ includeUnpublished: true })]);
  return <div className="admin-surface" lang="vi"><AdminPanel initialSettings={settings} initialProducts={products} /></div>;
}

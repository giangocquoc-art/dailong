import type { Metadata } from "next";
import { headers } from "next/headers";
import { AdminPanel, LoginPanel } from "./admin-panel";
import { isAdminCookie } from "@/lib/admin-auth";
import { getProducts, getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Quản trị Đại Long", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const requestHeaders = await headers();
  const authenticated = await isAdminCookie(requestHeaders.get("cookie"));
  if (!authenticated) return <div className="admin-surface" lang="vi"><LoginPanel /></div>;
  const [settings, products] = await Promise.all([getSettings(), getProducts()]);
  return <div className="admin-surface" lang="vi"><AdminPanel initialSettings={settings} initialProducts={products} /></div>;
}

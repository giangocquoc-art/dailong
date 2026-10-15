import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Quản trị Đại Long",
  robots: { index: false, follow: false },
};

// The old Cloudflare D1 admin panel is not writable on Vercel because it has
// no Worker DB bindings. Send customers to the connected Payload CMS so future
// products are stored in the same source of truth as the live storefront.
export default function AdminPage() {
  redirect("https://admin.gomsudailong.vn/admin");
}

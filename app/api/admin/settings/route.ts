import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { isAdminCookie } from "@/lib/admin-auth";
import type { SiteSettings } from "@/lib/content";

function safeText(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (!(await isAdminCookie(request.headers.get("cookie")))) return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  const raw = (await request.json().catch(() => null)) as Partial<SiteSettings> | null;
  if (!raw) return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  const data: SiteSettings = {
    siteTitle: safeText(raw.siteTitle, 120), heroKicker: safeText(raw.heroKicker, 160), heroTitle: safeText(raw.heroTitle, 220),
    heroDescription: safeText(raw.heroDescription, 900), heroImageUrl: safeText(raw.heroImageUrl, 600), aboutText: safeText(raw.aboutText, 1600),
    phone: safeText(raw.phone, 30), email: safeText(raw.email, 160), address: safeText(raw.address, 300),
  };
  if (Object.values(data).some((value) => !value)) return NextResponse.json({ error: "Vui lòng điền đủ thông tin." }, { status: 400 });
  try {
    await env.DB.prepare(`INSERT INTO site_settings (id, site_title, hero_kicker, hero_title, hero_description, hero_image_url, about_text, phone, email, address, updated_at)
      VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET site_title=excluded.site_title, hero_kicker=excluded.hero_kicker, hero_title=excluded.hero_title, hero_description=excluded.hero_description, hero_image_url=excluded.hero_image_url, about_text=excluded.about_text, phone=excluded.phone, email=excluded.email, address=excluded.address, updated_at=excluded.updated_at`)
      .bind(data.siteTitle, data.heroKicker, data.heroTitle, data.heroDescription, data.heroImageUrl, data.aboutText, data.phone, data.email, data.address, Date.now()).run();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("settings save failed", error);
    return NextResponse.json({ error: "Chưa thể lưu thay đổi. Vui lòng thử lại." }, { status: 500 });
  }
}

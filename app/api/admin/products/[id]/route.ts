import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { isAdminCookie } from "@/lib/admin-auth";
import type { Product } from "@/lib/content";
import { ensureAdminSchema } from "@/lib/admin-schema";

function safeText(value: unknown, max: number) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
function safeImageUrl(value: unknown) {
  const url = safeText(value, 600);
  return (url.startsWith("/") && !url.startsWith("//")) || url.startsWith("https://") ? url : "";
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminCookie(request.headers.get("cookie")))) return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  const { id } = await params;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || id.length > 100) return NextResponse.json({ error: "Mã sản phẩm không hợp lệ." }, { status: 400 });
  const raw = (await request.json().catch(() => null)) as Partial<Product> | null;
  if (!raw) return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  const images = Array.isArray(raw.images) ? raw.images.map(safeImageUrl).filter(Boolean).slice(0, 12) : [];
  const data: Product = { id, title: safeText(raw.title, 180), category: safeText(raw.category, 120), code: safeText(raw.code, 80), material: safeText(raw.material, 180), dimensions: safeText(raw.dimensions, 180), description: safeText(raw.description, 1200), imageUrl: safeImageUrl(raw.imageUrl), images, isPublished: raw.isPublished === 0 ? 0 : 1, featured: raw.featured ? 1 : 0, sortOrder: Number.isFinite(Number(raw.sortOrder)) ? Number(raw.sortOrder) : 0 };
  if ([data.title, data.category, data.code, data.material, data.dimensions, data.imageUrl].some((value) => !value)) return NextResponse.json({ error: "Vui lòng điền tên, danh mục, mã, chất liệu, quy cách và ảnh bìa." }, { status: 400 });
  try {
    await ensureAdminSchema();
    await env.DB.prepare(`INSERT INTO products (id, title, category, code, material, dimensions, description, image_url, featured, sort_order, gallery_json, is_published, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET title=excluded.title, category=excluded.category, code=excluded.code, material=excluded.material, dimensions=excluded.dimensions, description=excluded.description, image_url=excluded.image_url, featured=excluded.featured, sort_order=excluded.sort_order, gallery_json=excluded.gallery_json, is_published=excluded.is_published, updated_at=excluded.updated_at`)
      .bind(id, data.title, data.category, data.code, data.material, data.dimensions, data.description, data.imageUrl, data.featured, data.sortOrder, JSON.stringify(data.images), data.isPublished, Date.now()).run();
    return NextResponse.json({ ok: true, product: data });
  } catch (error) {
    console.error("product save failed", error);
    return NextResponse.json({ error: "Chưa thể lưu sản phẩm. Vui lòng thử lại." }, { status: 500 });
  }
}

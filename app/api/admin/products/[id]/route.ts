import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { isAdminCookie } from "@/lib/admin-auth";
import { defaultProducts, type Product } from "@/lib/content";

function safeText(value: unknown, max: number) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminCookie(request.headers.get("cookie")))) return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  const { id } = await params;
  const base = defaultProducts.find((product) => product.id === id);
  if (!base) return NextResponse.json({ error: "Không tìm thấy sản phẩm." }, { status: 404 });
  const raw = (await request.json().catch(() => null)) as Partial<Product> | null;
  if (!raw) return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  const data: Product = { id, title: safeText(raw.title, 180), category: safeText(raw.category, 120), code: safeText(raw.code, 80), material: safeText(raw.material, 180), dimensions: safeText(raw.dimensions, 180), description: safeText(raw.description, 1200), imageUrl: safeText(raw.imageUrl, 600), featured: raw.featured ? 1 : 0, sortOrder: Number.isFinite(Number(raw.sortOrder)) ? Number(raw.sortOrder) : base.sortOrder };
  if ([data.title, data.category, data.code, data.material, data.dimensions, data.description, data.imageUrl].some((value) => !value)) return NextResponse.json({ error: "Vui lòng điền đủ thông tin." }, { status: 400 });
  try {
    await env.DB.prepare(`INSERT INTO products (id, title, category, code, material, dimensions, description, image_url, featured, sort_order, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET title=excluded.title, category=excluded.category, code=excluded.code, material=excluded.material, dimensions=excluded.dimensions, description=excluded.description, image_url=excluded.image_url, featured=excluded.featured, sort_order=excluded.sort_order, updated_at=excluded.updated_at`)
      .bind(id, data.title, data.category, data.code, data.material, data.dimensions, data.description, data.imageUrl, data.featured, data.sortOrder, Date.now()).run();
    return NextResponse.json({ ok: true, product: data });
  } catch (error) {
    console.error("product save failed", error);
    return NextResponse.json({ error: "Chưa thể lưu sản phẩm. Vui lòng thử lại." }, { status: 500 });
  }
}

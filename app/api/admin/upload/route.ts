import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { isAdminCookie } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!(await isAdminCookie(request.headers.get("cookie")))) return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/")) return NextResponse.json({ error: "Vui lòng chọn một tệp hình ảnh." }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Ảnh phải nhỏ hơn 8 MB." }, { status: 400 });
  const extension = file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8) || "jpg";
  const key = `uploads/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  try {
    await env.BUCKET.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" } });
    return NextResponse.json({ ok: true, url: `/media/${key}` });
  } catch (error) {
    console.error("image upload failed", error);
    return NextResponse.json({ error: "Tải ảnh chưa thành công. Vui lòng thử lại." }, { status: 500 });
  }
}

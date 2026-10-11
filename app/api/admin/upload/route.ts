import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { isAdminCookie } from "@/lib/admin-auth";

const rasterTypes: Record<string, { extension: string; matches: (bytes: Uint8Array) => boolean }> = {
  "image/jpeg": { extension: "jpg", matches: (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
  "image/png": { extension: "png", matches: (bytes) => [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => bytes[index] === byte) },
  "image/webp": { extension: "webp", matches: (bytes) => String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP" },
  "image/avif": { extension: "avif", matches: (bytes) => String.fromCharCode(...bytes.slice(4, 8)) === "ftyp" && ["avif", "avis"].includes(String.fromCharCode(...bytes.slice(8, 12))) },
};

export async function POST(request: Request) {
  if (!(await isAdminCookie(request.headers.get("cookie")))) return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Vui lòng chọn một tệp hình ảnh." }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Ảnh phải nhỏ hơn 8 MB." }, { status: 400 });
  const raster = rasterTypes[file.type];
  if (!raster) return NextResponse.json({ error: "Chỉ nhận ảnh JPEG, PNG, WebP hoặc AVIF." }, { status: 400 });
  const bytes = await file.arrayBuffer();
  if (!raster.matches(new Uint8Array(bytes))) return NextResponse.json({ error: "Nội dung tệp không khớp định dạng ảnh." }, { status: 400 });
  const extension = raster.extension;
  const key = `uploads/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  try {
    await env.BUCKET.put(key, bytes, { httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" } });
    return NextResponse.json({ ok: true, url: `/media/${key}` });
  } catch (error) {
    console.error("image upload failed", error);
    return NextResponse.json({ error: "Tải ảnh chưa thành công. Vui lòng thử lại." }, { status: 500 });
  }
}

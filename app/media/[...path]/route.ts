import { env } from "cloudflare:workers";

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const key = (await params).path.join("/");
  const object = await env.BUCKET.get(key);
  if (!object) return new Response("Không tìm thấy ảnh", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
}

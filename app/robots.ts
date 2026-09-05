import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/quan-tri-dai-long", "/api/admin/"] }], sitemap: "https://gomsudailong.com/sitemap.xml" };
}

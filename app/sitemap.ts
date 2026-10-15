import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/content";

// New published CMS products are included as the catalog changes.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://gomsudailong.vn";
  const pages = ["", "/san-pham", "/du-an", "/gioi-thieu", "/lien-he"];
  const products = await getProducts();
  const urls = new Set<string>();

  for (const page of pages) {
    urls.add(base + page);
  }
  for (const product of products) {
    urls.add(base + "/san-pham/" + encodeURIComponent(product.id));
  }

  return Array.from(urls).map((url) => ({
    url,
    changeFrequency: "weekly" as const,
    priority: url === base ? 1 : url.includes("/san-pham/") ? 0.7 : 0.8,
  }));
}

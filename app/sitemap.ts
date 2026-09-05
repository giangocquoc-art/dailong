import type { MetadataRoute } from "next";
import { defaultProducts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gomsudailong.com";
  const pages = ["", "/san-pham", "/du-an", "/gioi-thieu", "/lien-he"];
  return [...pages.map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 })), ...defaultProducts.map((product) => ({ url: `${base}/san-pham/${product.id}`, changeFrequency: "monthly" as const, priority: 0.7 }))];
}

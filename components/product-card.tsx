import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/content";
import { contentText, textFor, withLang, type Language } from "@/lib/presentation";

export function ProductCard({ product, lang = "vi" }: { product: Product; lang?: Language }) {
  return <Link href={withLang("/san-pham/" + product.id, lang)} className="product-card">
    <div className="product-photo"><img src={product.imageUrl} alt={contentText(product.title, lang)} width={480} height={440} loading="lazy" decoding="async" /></div>
    <div className="product-info">
      <p className="product-category">{contentText(product.category, lang)}</p>
      <h3>{contentText(product.title, lang)}</h3>
      <div className="product-meta"><span>{product.code}</span><span>{textFor(lang, "Xem chi tiết", "View details")}<ArrowUpRight aria-hidden="true" /></span></div>
    </div>
  </Link>;
}

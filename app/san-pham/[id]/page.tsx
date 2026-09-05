import type { Metadata } from "next";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { SiteShell } from "@/components/site-shell";
import { SiteButton } from "@/components/site-button";
import { getProductById, getProducts, getSettings } from "@/lib/content";
import { contentText, currentPageHref, formatPhone, getLanguage, phoneHref, textFor, withLang, zaloHref, type PageProps } from "@/lib/presentation";

type DetailProps = PageProps & { params: Promise<{ id: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params, searchParams }: DetailProps): Promise<Metadata> {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const product = await getProductById(id);
  const lang = getLanguage(query.lang);
  return product ? { title: contentText(product.title, lang), description: contentText(product.description, lang) } : { title: textFor(lang, "Không tìm thấy sản phẩm", "Product not found") };
}
export default async function ProductDetail({ params, searchParams }: DetailProps) {
  const [{ id }, query, settings, allProducts] = await Promise.all([params, searchParams, getSettings(), getProducts()]);
  const product = allProducts.find((p) => p.id === id) ?? await getProductById(id);
  if (!product) notFound();
  const lang = getLanguage(query.lang);
  const related = allProducts.filter((p) => p.id !== id && p.category === product.category);
  const relatedProducts = [...related, ...allProducts.filter((p) => p.id !== id && p.category !== product.category)].slice(0, 3);
  return <SiteShell settings={settings} lang={lang} currentHref={currentPageHref("/san-pham/" + id, query)}>
    <section className="section"><div className="container-site">
      <nav className="breadcrumbs" aria-label={textFor(lang, "Đường dẫn trang", "Breadcrumb")}><Link href={withLang("/san-pham", lang)} className="text-link"><ArrowLeft aria-hidden="true" />{textFor(lang, "Bộ sưu tập sản phẩm", "Product collection")}</Link><span aria-hidden="true">/</span><Link href={withLang("/san-pham?danh-muc=" + encodeURIComponent(product.category), lang)}>{contentText(product.category, lang)}</Link></nav>
      <div className="detail-grid">
        <div className="detail-photo"><img src={product.imageUrl} alt={contentText(product.title, lang)} width={680} height={680} fetchPriority="high" /></div>
        <div className="detail-copy">
          <p className="eyebrow">{contentText(product.category, lang)}</p>
          <h1>{contentText(product.title, lang)}</h1>
          <p>{contentText(product.description, lang)}</p>
          <dl className="specs">{[
            [textFor(lang, "Mã sản phẩm", "Product code"), product.code],
            [textFor(lang, "Chất liệu", "Material"), contentText(product.material, lang)],
            [textFor(lang, "Quy cách", "Dimensions"), contentText(product.dimensions, lang)]
          ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          <p className="text-muted">{textFor(lang, "Trao đổi cùng Đại Long để chọn sắc men, số lượng và quy cách phù hợp với công trình.", "Talk to Dai Long about glaze colours, quantities and specifications for your project.")}</p>
          <div className="button-row" style={{ marginTop: 24 }}>
            <SiteButton><a href={zaloHref(settings.phone)} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />{textFor(lang, "Tư vấn & báo giá", "Advice & quotation")}</a></SiteButton>
            <SiteButton tone="outline"><a href={phoneHref(settings.phone)}><Phone aria-hidden="true" />{formatPhone(settings.phone)}</a></SiteButton>
          </div>
          <p className="detail-footnote">{textFor(lang, "Sắc men thực tế có thể khác theo ánh sáng và mẻ nung. Quy cách cần được xác nhận trước khi đặt hàng.", "Glaze may vary with lighting and firing. Confirm specifications before ordering.")}</p>
        </div>
      </div>
    </div></section>
    <section className="section section-soft"><div className="container-site"><div className="section-head"><div><p className="eyebrow">{textFor(lang, "Khám phá thêm", "Explore more")}</p><h2 className="section-title">{textFor(lang, "Có thể bạn quan tâm", "You may also like")}</h2></div></div><div className="product-grid">{relatedProducts.map((item) => <ProductCard key={item.id} product={item} lang={lang} />)}</div></div></section>
  </SiteShell>;
}

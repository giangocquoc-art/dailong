import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SiteShell } from "@/components/site-shell";
import { SiteButton } from "@/components/site-button";
import { categories, getProducts, getSettings } from "@/lib/content";
import { contentText, currentPageHref, getLanguage, textFor, withLang, type PageProps } from "@/lib/presentation";

export const dynamic = "force-dynamic";
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const lang = getLanguage((await searchParams).lang);
  return { title: textFor(lang, "Sản phẩm", "Products"), description: textFor(lang, "Các dòng gốm kiến trúc, ngói, gạch và gốm sân vườn của Đại Long.", "Architectural ceramics, roof tiles, breeze blocks and garden ceramics by Dai Long.") };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const [query, settings, products] = await Promise.all([searchParams, getSettings(), getProducts()]);
  const lang = getLanguage(query.lang);
  const selected = typeof query["danh-muc"] === "string" ? query["danh-muc"] : undefined;
  const visible = selected ? products.filter((product) => product.category === selected) : products;
  const categoryItems = Array.from(new Set([...categories, ...products.map((p) => p.category)]));
  return <SiteShell settings={settings} lang={lang} currentHref={currentPageHref("/san-pham", query)}>
    <section className="page-intro"><div className="container-site">
      <nav className="breadcrumbs" aria-label={textFor(lang, "Đường dẫn trang", "Breadcrumb")}><Link href={withLang("/", lang)}>{textFor(lang, "Trang chủ", "Home")}</Link><span aria-hidden="true">/</span><span>{textFor(lang, "Sản phẩm", "Products")}</span></nav>
      <h1>{textFor(lang, "Bộ sưu tập gốm kiến trúc", "The architectural ceramics collection")}</h1>
      <p>{textFor(lang, "Từ mái ngói, tường gạch đến khoảng sân — chọn dòng gốm phù hợp với công trình của bạn.", "From roofs and walls to courtyards — find the ceramics that belong in your project.")}</p>
    </div></section>
    <section className="section"><div className="container-site catalog-layout">
      <aside className="catalog-sidebar"><h2>{textFor(lang, "Danh mục sản phẩm", "Collections")}</h2>
        <nav className="catalog-nav" aria-label={textFor(lang, "Lọc danh mục sản phẩm", "Filter by collection")}>
          <Link href={withLang("/san-pham", lang)} aria-current={!selected ? "page" : undefined}><span>{textFor(lang, "Tất cả sản phẩm", "All products")}</span><small>{products.length}</small></Link>
          {categoryItems.map((category) => <Link key={category} href={withLang("/san-pham?danh-muc=" + encodeURIComponent(category), lang)} aria-current={selected === category ? "page" : undefined}><span>{contentText(category, lang)}</span><small>{products.filter((p) => p.category === category).length}</small></Link>)}
        </nav>
      </aside>
      <div>
        <div className="catalog-summary"><h2>{selected ? contentText(selected, lang) : textFor(lang, "Tất cả sản phẩm", "All products")}</h2><p>{visible.length} {textFor(lang, "sản phẩm", "products")}</p></div>
        {visible.length ? <div className="product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} lang={lang} />)}</div> : <div className="empty-state"><h3>{textFor(lang, "Danh mục đang được cập nhật", "This collection is being updated")}</h3><p>{textFor(lang, "Bạn có thể xem các mẫu khác hoặc liên hệ Đại Long để được tư vấn.", "Browse other designs or contact Dai Long for advice.")}</p><SiteButton><Link href={withLang("/san-pham", lang)}>{textFor(lang, "Xem tất cả sản phẩm", "View all products")}</Link></SiteButton></div>}
        <p className="section-note">{textFor(lang, "Hình ảnh, sắc men và quy cách mang tính tham khảo. Vui lòng liên hệ để xác nhận mẫu, kích thước và báo giá.", "Images, glaze colours and dimensions are for reference. Contact us to confirm the design, specifications and quotation.")}</p>
      </div>
    </div></section>
  </SiteShell>;
}

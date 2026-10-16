import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SiteShell } from "@/components/site-shell";
import { SiteButton } from "@/components/site-button";
import { catalogHierarchy, catalogParentCategory, catalogProductSubcategory, getProducts, getSettings } from "@/lib/content";
import { contentText, currentPageHref, getLanguage, textFor, withLang, type PageProps } from "@/lib/presentation";

export const dynamic = "force-dynamic";
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const lang = getLanguage((await searchParams).lang);
  return { title: textFor(lang, "Sản phẩm", "Products"), description: textFor(lang, "Các dòng gốm kiến trúc, ngói, gạch và gốm sân vườn của Đại Long.", "Architectural ceramics, roof tiles, breeze blocks and garden ceramics by Dai Long.") };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const [query, settings, products] = await Promise.all([searchParams, getSettings(), getProducts()]);
  const lang = getLanguage(query.lang);
  const oldCategoryAliases: Record<string, string> = { "Rồng phượng": "Rồng - phượng", "Đao - Kìm nóc": "Phụ kiện mái", "Gạch lát - gạch cổ": "Gạch lát - Gạch cổ" };
  const requestedCategory = typeof query["danh-muc"] === "string" ? query["danh-muc"] : undefined;
  const legacyDragonCategory = requestedCategory === "Rồng - phượng" || requestedCategory === "Rồng phượng";
  const selected = requestedCategory ? catalogParentCategory(oldCategoryAliases[requestedCategory] ?? requestedCategory) : undefined;
  const requestedSubcategory = typeof query["phan-loai"] === "string" ? query["phan-loai"] : undefined;
  const selectedSubcategory = legacyDragonCategory
    ? "Rồng - phượng"
    : selected && catalogHierarchy.find((item) => item.name === selected)?.children.includes(requestedSubcategory ?? "")
      ? requestedSubcategory : undefined;
  // Existing bookmarks with a ceramic/porcelain dragon filter still work.
  const legacyDragonVariant = legacyDragonCategory && ["Rồng - phượng sứ", "Rồng - phượng gốm"].includes(requestedSubcategory ?? "")
    ? requestedSubcategory : undefined;
  const visible = products.filter((product) =>
    (!selected || catalogParentCategory(product.category) === selected) &&
    (!selectedSubcategory || catalogProductSubcategory(product) === selectedSubcategory) &&
    (!legacyDragonVariant || product.subcategory === legacyDragonVariant)
  );
  const knownCategories = new Set(catalogHierarchy.map((item) => item.name));
  const categoryItems = [...catalogHierarchy,
    ...Array.from(new Set(products.map((p) => catalogParentCategory(p.category))))
      .filter((category) => !knownCategories.has(category))
      .map((name) => ({ name, children: [] as string[] }))];
  const categoryHref = (category: string, subcategory?: string) =>
    withLang("/san-pham?danh-muc=" + encodeURIComponent(category) +
      (subcategory ? "&phan-loai=" + encodeURIComponent(subcategory) : ""), lang);
  return <SiteShell settings={settings} lang={lang} currentHref={currentPageHref("/san-pham", query)}>
    <section className="page-intro"><div className="container-site">
      <nav className="breadcrumbs" aria-label={textFor(lang, "Đường dẫn trang", "Breadcrumb")}><Link href={withLang("/", lang)}>{textFor(lang, "Trang chủ", "Home")}</Link><span aria-hidden="true">/</span><span>{textFor(lang, "Sản phẩm", "Products")}</span></nav>
      <h1>{textFor(lang, "Bộ sưu tập gốm kiến trúc", "The architectural ceramics collection")}</h1>
      <p>{textFor(lang, "Từ ngói lợp, gạch trang trí đến chi tiết sân vườn — khám phá sản phẩm gốm kiến trúc Đại Long theo từng nhu cầu công trình.", "From roof tiles and decorative brick to garden details — explore Dai Long architectural ceramics for your project.")}</p>
    </div></section>
    <section className="section"><div className="container-site catalog-layout">
      <aside className="catalog-sidebar"><h2>{textFor(lang, "Danh mục sản phẩm", "Collections")}</h2>
        <nav className="catalog-nav" aria-label={textFor(lang, "Lọc danh mục sản phẩm", "Filter by collection")}>
          <Link className="catalog-nav-all" href={withLang("/san-pham", lang)} aria-current={!selected ? "page" : undefined}><span>{textFor(lang, "Tất cả sản phẩm", "All products")}</span><small>{products.length}</small></Link>
          {categoryItems.map((group) => <div className="catalog-nav-group" key={group.name}>
            <Link className="catalog-nav-parent" href={categoryHref(group.name)} aria-current={selected === group.name && !selectedSubcategory ? "page" : undefined}>
              <span>{contentText(group.name, lang)}</span><small>{products.filter((p) => catalogParentCategory(p.category) === group.name).length}</small>
            </Link>
            {group.children.length > 0 && <div className="catalog-subnav">
              {group.children.map((subcategory) => <Link key={subcategory} href={categoryHref(group.name, subcategory)} aria-current={selectedSubcategory === subcategory && selected === group.name ? "page" : undefined}>
                <span>{contentText(subcategory, lang)}</span><small>{products.filter((p) => catalogParentCategory(p.category) === group.name && catalogProductSubcategory(p) === subcategory).length}</small>
              </Link>)}
            </div>}
          </div>)}
        </nav>
      </aside>
      <div>
        <div className="catalog-summary"><h2>{selectedSubcategory ? contentText(selectedSubcategory, lang) : selected ? contentText(selected, lang) : textFor(lang, "Tất cả sản phẩm", "All products")}</h2><p>{visible.length} {textFor(lang, "sản phẩm", "products")}</p></div>
        {visible.length ? <div className="product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} lang={lang} />)}</div> : <div className="empty-state"><h3>{textFor(lang, "Danh mục đang được cập nhật", "This collection is being updated")}</h3><p>{textFor(lang, "Bạn có thể xem các mẫu khác hoặc liên hệ Đại Long để được tư vấn.", "Browse other designs or contact Dai Long for advice.")}</p><SiteButton><Link href={withLang("/san-pham", lang)}>{textFor(lang, "Xem tất cả sản phẩm", "Browse all products")}</Link></SiteButton></div>}
        <p className="section-note">{textFor(lang, "Hình ảnh, sắc men và quy cách mang tính tham khảo. Vui lòng liên hệ để xác nhận mẫu, kích thước và báo giá.", "Images, glaze colours and dimensions are for reference. Contact us to confirm the design, specifications and quotation.")}</p>
      </div>
    </div></section>
  </SiteShell>;
}

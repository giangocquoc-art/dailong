import type { Metadata } from "next";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { RoofTileDimensions } from "@/components/roof-tile-dimensions";
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
  const gallery = Array.from(new Set([product.imageUrl, ...product.images])).filter(Boolean);
  const technicalInfo = product.technicalInfo;
  const hasTechnicalInfo = Boolean(technicalInfo?.sections.length || technicalInfo?.table?.columns.length || technicalInfo?.table?.rows.length);
  return <SiteShell settings={settings} lang={lang} currentHref={currentPageHref("/san-pham/" + id, query)}>
    <section className="section"><div className="container-site">
      <nav className="breadcrumbs" aria-label={textFor(lang, "Đường dẫn trang", "Breadcrumb")}><Link href={withLang("/san-pham", lang)} className="text-link"><ArrowLeft aria-hidden="true" />{textFor(lang, "Bộ sưu tập sản phẩm", "Product collection")}</Link><span aria-hidden="true">/</span><Link href={withLang("/san-pham?danh-muc=" + encodeURIComponent(product.category), lang)}>{contentText(product.category, lang)}</Link>{product.subcategory && <><span aria-hidden="true">/</span><Link href={withLang("/san-pham?danh-muc=" + encodeURIComponent(product.category) + "&phan-loai=" + encodeURIComponent(product.subcategory), lang)}>{contentText(product.subcategory, lang)}</Link></>}</nav>
      <div className="detail-grid">
        <div className="detail-gallery">
          <div className="detail-photo"><img src={product.imageUrl} alt={contentText(product.title, lang)} width={900} height={900} fetchPriority="high" /></div>
          {gallery.length > 1 && <div className="detail-gallery-thumbs" aria-label={textFor(lang, "Ảnh khác của sản phẩm", "More product images")}>{gallery.slice(1).map((url, index) => <img key={`${url}-${index}`} src={url} alt={`${contentText(product.title, lang)} — ${textFor(lang, "ảnh", "image")} ${index + 2}`} width={180} height={180} loading="lazy" decoding="async"/>)}</div>}
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{contentText(product.subcategory ?? product.category, lang)}</p>
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
    {hasTechnicalInfo && <section className="section product-technical-section"><div className="container-site">
      <div className="section-head"><div><p className="eyebrow">{textFor(lang, "Thông tin sản phẩm", "Product information")}</p><h2 className="section-title">{textFor(lang, "Cấu tạo & quy cách", "Details & specifications")}</h2></div></div>
      {technicalInfo?.sections.length ? <div className="product-info-sections">{technicalInfo.sections.map((item, index) => <article className="product-info-card" key={`${item.title}-${index}`}>
        {item.imageUrl && <img src={item.imageUrl} alt={contentText(item.title, lang)} width={720} height={480} loading="lazy" decoding="async"/>}
        <div className="product-info-card-copy">{item.title && <h3>{contentText(item.title, lang)}</h3>}{item.text && <p>{contentText(item.text, lang)}</p>}</div>
      </article>)}</div> : null}
      {product.category === "Ngói âm dương" && <RoofTileDimensions />}
      {technicalInfo?.table && <div className="product-spec-table-wrap">
        {technicalInfo.table.title && <h3>{contentText(technicalInfo.table.title, lang)}</h3>}
        <p className="product-table-scroll-hint">{textFor(lang, "Vuốt ngang bảng để xem đủ các cỡ.", "Swipe horizontally to see all sizes.")}</p>
        <div className="product-spec-table-scroll" tabIndex={0} aria-label={textFor(lang, "Bảng thông số có thể cuộn ngang", "Specification table, scroll horizontally") }><table className="product-spec-table"><thead><tr><th scope="col">{textFor(lang, "Thông số", "Specification")}</th>{technicalInfo.table.columns.map((column, index) => <th scope="col" key={`${column}-${index}`}>{contentText(column, lang)}</th>)}</tr></thead><tbody>{technicalInfo.table.rows.map((row, index) => <tr key={`${row.label}-${index}`}><th scope="row">{contentText(row.label, lang)}</th>{technicalInfo.table!.columns.map((_, columnIndex) => <td key={columnIndex}>{contentText(row.values[columnIndex] ?? "", lang) || "—"}</td>)}</tr>)}</tbody></table></div>
      </div>}
      <p className="product-info-note">{product.category === "Ngói âm dương"
        ? textFor(lang, "Sơ đồ và hình ảnh mang tính tham khảo, không theo tỷ lệ và không thay thế bản vẽ thi công. Thông số cỡ L/M/S cần đối chiếu mẫu thực tế trước khi đặt hàng.", "Diagrams and illustrations are references, not to scale or for construction. Confirm L/M/S measurements against the real product.")
        : textFor(lang, "Hình ở trên là minh họa tham khảo được tạo bằng AI, không theo tỷ lệ và không thay thế bản vẽ thi công. Thông số chi tiết cần đối chiếu mẫu, xác nhận với Đại Long trước khi đặt hàng.", "Images above are AI-generated visual references, not to scale and not construction drawings. Confirm detailed specifications against the product sample with Dai Long before ordering.")}</p>
    </div></section>}
    <section className="section section-soft"><div className="container-site"><div className="section-head"><div><p className="eyebrow">{textFor(lang, "Khám phá thêm", "Explore more")}</p><h2 className="section-title">{textFor(lang, "Có thể bạn quan tâm", "You may also like")}</h2></div></div><div className="product-grid">{relatedProducts.map((item) => <ProductCard key={item.id} product={item} lang={lang} />)}</div></div></section>
  </SiteShell>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Consultation } from "@/components/consultation";
import { getSettings, projects, roofTileApplications } from "@/lib/content";
import { contentText, currentPageHref, getLanguage, textFor, withLang, zaloHref, type PageProps } from "@/lib/presentation";

export const dynamic = "force-dynamic";
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return { title: textFor(getLanguage((await searchParams).lang), "Công trình tham khảo", "Project references") };
}
export default async function ProjectsPage({ searchParams }: PageProps) {
  const [query, settings] = await Promise.all([searchParams, getSettings()]);
  const lang = getLanguage(query.lang);
  const descriptions = [
    textFor(lang, "Mái nhiều lớp gợi cách nhịp ngói và đường bờ mái định hình tổng thể. Đây là ảnh tham khảo kiến trúc, không xác nhận nguồn cung ngói.", "A layered roof shows how tile rhythm and ridge lines shape a building. This is an architectural reference, not a claim about tile supply."),
    textFor(lang, "Men xanh ghi thay đổi sắc độ theo ánh sáng và bối cảnh vật liệu. Nên xem mẫu thực tế trước khi chốt cách phối cùng gỗ, đá hoặc tường vữa.", "Blue-grey glaze shifts with light and surrounding materials. Review a physical sample before pairing it with timber, stone or plaster."),
    textFor(lang, "Mái và chi tiết gốm cần được chọn như một tổng thể. Hình ảnh này gợi ý tinh thần kiến trúc; không đại diện cho một công trình Đại Long đã thi công.", "Roof forms and ceramic details work best as one composition. This image is an architectural reference, not a completed Dai Long project."),
  ];
  return <SiteShell settings={settings} lang={lang} currentHref={currentPageHref("/du-an", query)}>
    <section className="page-intro"><div className="container-site">
      <nav className="breadcrumbs" aria-label={textFor(lang, "Đường dẫn trang", "Breadcrumb")}><Link href={withLang("/", lang)}>{textFor(lang, "Trang chủ", "Home")}</Link><span aria-hidden="true">/</span><span>{textFor(lang, "Công trình", "Projects")}</span></nav>
      <h1>{textFor(lang, "Khi gốm trở thành một phần của kiến trúc", "When ceramics become part of the architecture")}</h1>
      <p>{textFor(lang, "Gợi ý ứng dụng gốm kiến trúc Đại Long qua chất liệu, tỷ lệ và sắc men. Ảnh minh họa giúp hình dung cách phối; mỗi công trình cần được tư vấn theo hiện trạng thực tế.", "Explore Dai Long architectural ceramics through material, proportion and glaze. These visual references help with planning; each project should be specified for its actual conditions.")}</p>
    </div></section>
    <section className="section roof-applications"><div className="container-site">
      <div className="section-head"><div><p className="eyebrow">{textFor(lang, "Ứng dụng ngói âm dương", "Yin-yang roof tile applications")}</p><h2 className="section-title">{textFor(lang, "Một dáng ngói, nhiều sắc thái kiến trúc", "One tile form, many architectural expressions")}</h2></div><p className="roof-applications-intro">{textFor(lang, "Chọn ngói theo tỷ lệ mái và tổng thể công trình. Đại Long có thể cùng bạn rà soát kích thước, sắc men và số lượng trước khi đặt hàng.", "Choose tiles to suit the roof proportions and architecture. Dai Long can help review dimensions, glaze and quantities before ordering.")}</p></div>
      <div className="application-grid">{roofTileApplications.map((item, index) => <article className="application-card" key={item.title}>
        <div className="application-photo"><img src={item.imageUrl} alt={textFor(lang, item.title === "Nhịp mái kiến trúc truyền thống" ? "Mái kiến trúc Việt nhiều lớp ngói, hình tham khảo" : "Cận cảnh ngói gốm men xanh", item.title === "Nhịp mái kiến trúc truyền thống" ? "Layered Vietnamese roof, architectural reference" : "Close-up of blue-green glazed roof tiles")} width={640} height={470} loading="lazy" decoding="async"/><span className="application-index">0{index + 1}</span></div>
        <div className="application-copy"><p className="eyebrow">{contentText(item.type, lang)}</p><h3>{contentText(item.title, lang)}</h3><p>{contentText(item.description, lang)}</p></div>
      </article>)}</div>
      <p className="section-note">{textFor(lang, "Hình ảnh mang tính minh họa vật liệu và cách phối, không đại diện cho một công trình đã thi công.", "Images illustrate materials and composition; they do not represent a completed project.")}</p>
    </div></section>
    <section className="section"><div className="container-site"><div className="project-grid">{projects.map((project, index) => <article className="application-card project-reference-card" id={"cong-trinh-" + index} key={project.title}>
      <img src={project.imageUrl} alt={contentText(project.title, lang)} width={700} height={450} loading={index ? "lazy" : "eager"} decoding="async" />
        <div className="application-copy"><p className="eyebrow">{contentText(project.type, lang)}</p><h2>{contentText(project.title, lang)}</h2><p>{descriptions[index]}</p><a className="text-link" href={zaloHref(settings.phone)} target="_blank" rel="noopener noreferrer">{textFor(lang, "Trao đổi về mẫu ngói", "Ask about roof tile options")}<ArrowUpRight aria-hidden="true" /></a></div>
    </article>)}</div></div></section>
    <Consultation settings={settings} lang={lang} />
  </SiteShell>;
}

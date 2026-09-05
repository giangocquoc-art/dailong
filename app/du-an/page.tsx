import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Consultation } from "@/components/consultation";
import { getSettings, projects } from "@/lib/content";
import { contentText, currentPageHref, getLanguage, textFor, withLang, zaloHref, type PageProps } from "@/lib/presentation";

export const dynamic = "force-dynamic";
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return { title: textFor(getLanguage((await searchParams).lang), "Công trình tham khảo", "Project references") };
}
export default async function ProjectsPage({ searchParams }: PageProps) {
  const [query, settings] = await Promise.all([searchParams, getSettings()]);
  const lang = getLanguage(query.lang);
  const descriptions = [
    textFor(lang, "Gạch thông gió tạo lớp ngăn nhẹ, để ánh sáng và cây xanh kết nối với không gian bên trong. Màu men có thể trở thành điểm nhấn cho một góc nghỉ giữa khu vườn.", "Breeze blocks create a light partition between interior spaces and the garden, allowing daylight and greenery to remain connected."),
    textFor(lang, "Mái ngói và chi tiết gốm giúp công trình nghỉ dưỡng hòa vào cảnh quan. Nhịp mái, sắc men và cách phối cùng gỗ, đá tạo nên tổng thể yên tĩnh.", "Roof tiles and ceramic details help resort buildings sit within the landscape. Roof rhythm, glaze and natural materials create a calm composition."),
    textFor(lang, "Đường cong của mái, ngói và chi tiết trang trí cùng tạo nên dáng dấp truyền thống. Việc chọn mẫu cần cân nhắc tỷ lệ mái và tinh thần chung của công trình.", "The roof curve, tiles and ornamental details work together to create a traditional silhouette. Choosing the right design starts with the roof's proportions."),
  ];
  return <SiteShell settings={settings} lang={lang} currentHref={currentPageHref("/du-an", query)}>
    <section className="page-intro"><div className="container-site">
      <nav className="breadcrumbs" aria-label={textFor(lang, "Đường dẫn trang", "Breadcrumb")}><Link href={withLang("/", lang)}>{textFor(lang, "Trang chủ", "Home")}</Link><span aria-hidden="true">/</span><span>{textFor(lang, "Công trình", "Projects")}</span></nav>
      <h1>{textFor(lang, "Khi gốm trở thành một phần của kiến trúc", "When ceramics become part of the architecture")}</h1>
      <p>{textFor(lang, "Hình ảnh công trình tham khảo được giới thiệu trên website Gốm sứ Thanh Hải trước đây, giúp bạn hình dung cách ứng dụng gốm trong không gian thực tế.", "Project reference images featured on the former Thanh Hai Ceramics website, showing how ceramic materials can be used in real spaces.")}</p>
    </div></section>
    <section className="section"><div className="container-site">{projects.map((project, index) => <article className="project-row" id={"cong-trinh-" + index} key={project.title}>
      <img src={project.imageUrl} alt={contentText(project.title, lang)} width={700} height={450} loading={index ? "lazy" : "eager"} decoding="async" />
      <div><p className="eyebrow">{contentText(project.type, lang)}</p><h2>{contentText(project.title, lang)}</h2><p>{descriptions[index]}</p><a className="text-link" href={zaloHref(settings.phone)} target="_blank" rel="noopener noreferrer">{textFor(lang, "Tư vấn cho công trình của bạn", "Discuss your project")}<ArrowUpRight aria-hidden="true" /></a></div>
    </article>)}</div></section>
    <Consultation settings={settings} lang={lang} />
  </SiteShell>;
}

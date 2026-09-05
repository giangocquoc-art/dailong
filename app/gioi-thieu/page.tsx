import type { Metadata } from "next";
import Link from "next/link";
import { Hand, Layers, MessageCircle } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Consultation } from "@/components/consultation";
import { getSettings } from "@/lib/content";
import { contentText, currentPageHref, getLanguage, textFor, withLang, type PageProps } from "@/lib/presentation";

export const dynamic = "force-dynamic";
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return { title: textFor(getLanguage((await searchParams).lang), "Về Đại Long", "Our story") };
}
export default async function AboutPage({ searchParams }: PageProps) {
  const [query, settings] = await Promise.all([searchParams, getSettings()]);
  const lang = getLanguage(query.lang);
  const values = [
    { icon: Hand, title: textFor(lang, "Trân trọng nghề gốm", "Respect for the craft"), description: textFor(lang, "Giữ nét riêng của tạo hình thủ công và sắc men, những điều khiến một sản phẩm gốm không chỉ là vật liệu xây dựng.", "Preserving the character of handmade forms and glazes — the qualities that make a ceramic piece more than a building material.") },
    { icon: Layers, title: textFor(lang, "Hài hòa cùng kiến trúc", "In harmony with architecture"), description: textFor(lang, "Cân nhắc tỷ lệ, bề mặt và màu sắc để gốm kết nối tự nhiên với gỗ, đá, cây xanh và ánh sáng.", "Considering proportion, texture and colour so ceramics sit naturally alongside timber, stone, planting and light.") },
    { icon: MessageCircle, title: textFor(lang, "Trao đổi rõ ràng", "Clear, practical advice"), description: textFor(lang, "Thống nhất mẫu, quy cách, số lượng và phương án giao nhận trước khi đặt hàng; tư vấn theo nhu cầu cụ thể.", "Agreeing on the design, specifications, quantities and delivery arrangements before ordering, with advice for your specific project.") },
  ];
  return <SiteShell settings={settings} lang={lang} currentHref={currentPageHref("/gioi-thieu", query)}>
    <section className="page-intro"><div className="container-site">
      <nav className="breadcrumbs" aria-label={textFor(lang, "Đường dẫn trang", "Breadcrumb")}><Link href={withLang("/", lang)}>{textFor(lang, "Trang chủ", "Home")}</Link><span aria-hidden="true">/</span><span>{textFor(lang, "Về Đại Long", "Our story")}</span></nav>
      <h1>{textFor(lang, "Tên mới, tiếp nối một tình yêu với gốm", "A new name, the same love for ceramics")}</h1>
      <p>{textFor(lang, "Gốm sứ Đại Long — từ Bát Tràng, cùng bạn gìn giữ và làm mới bản sắc kiến trúc Việt.", "Dai Long Ceramics — from Bat Trang, helping you preserve and reimagine Vietnamese architectural character.")}</p>
    </div></section>
    <section className="section"><div className="container-site story-grid">
      <img className="story-image" src="/images/ngoi-van-mieu.jpg" alt={textFor(lang, "Chi tiết ngói gốm men xanh", "Detail of teal-glazed ceramic roof tiles")} width={600} height={450} />
      <div className="story-copy"><p className="eyebrow">{textFor(lang, "Câu chuyện thương hiệu", "Our story")}</p><h2 className="section-title">{textFor(lang, "Từ đất Bát Tràng đến những công trình Việt", "From Bat Trang clay to Vietnamese architecture")}</h2>
        <p>{contentText(settings.aboutText, lang)}</p>
        <p>{textFor(lang, "Đại Long giới thiệu các dòng gốm kiến trúc cho mái nhà, tường rào, sân vườn và không gian thờ tự. Chúng tôi mong mỗi lựa chọn đều vừa đúng công năng, vừa có nét riêng của chủ nhân.", "Dai Long presents architectural ceramics for roofs, boundary walls, gardens and places of worship. Our aim is to help you choose pieces that suit both their purpose and your personal vision.")}</p>
      </div>
    </div></section>
    <section className="section section-soft"><div className="container-site"><p className="eyebrow">{textFor(lang, "Điều Đại Long theo đuổi", "What guides us")}</p><h2 className="section-title" style={{ marginTop: 10 }}>{textFor(lang, "Chỉn chu từ từng chi tiết", "Care in every detail")}</h2><div className="values-grid">{values.map(({ icon: Icon, title, description }) => <article className="value-item" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
    <Consultation settings={settings} lang={lang} />
  </SiteShell>;
}

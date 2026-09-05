import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { SiteButton } from "@/components/site-button";
import { getSettings } from "@/lib/content";
import { contentText, currentPageHref, formatPhone, getLanguage, phoneHref, textFor, withLang, zaloHref, type PageProps } from "@/lib/presentation";

export const dynamic = "force-dynamic";
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  return { title: textFor(getLanguage((await searchParams).lang), "Liên hệ", "Contact") };
}
export default async function ContactPage({ searchParams }: PageProps) {
  const [query, settings] = await Promise.all([searchParams, getSettings()]);
  const lang = getLanguage(query.lang);
  return <SiteShell settings={settings} lang={lang} currentHref={currentPageHref("/lien-he", query)}>
    <section className="page-intro"><div className="container-site">
      <nav className="breadcrumbs" aria-label={textFor(lang, "Đường dẫn trang", "Breadcrumb")}><Link href={withLang("/", lang)}>{textFor(lang, "Trang chủ", "Home")}</Link><span aria-hidden="true">/</span><span>{textFor(lang, "Liên hệ", "Contact")}</span></nav>
      <h1>{textFor(lang, "Cùng chọn gốm cho công trình của bạn", "Let's find ceramics for your project")}</h1>
      <p>{textFor(lang, "Bạn có mẫu gốm yêu thích hay một ý tưởng đang ấp ủ? Gửi cho Đại Long để cùng trao đổi về sắc men, kích thước và cách ứng dụng.", "Have a ceramic design in mind or a project taking shape? Share it with Dai Long to discuss colours, dimensions and applications.")}</p>
    </div></section>
    <section className="section"><div className="container-site contact-grid">
      <div><p className="eyebrow">{textFor(lang, "Liên hệ trực tiếp", "Contact Dai Long")}</p>
        <div className="contact-list">
          <a href={phoneHref(settings.phone)} className="contact-item"><Phone aria-hidden="true" /><div><span>{textFor(lang, "Điện thoại / Zalo", "Phone / Zalo")}</span><strong>{formatPhone(settings.phone)}</strong></div></a>
          <a href={"mailto:" + settings.email} className="contact-item"><Mail aria-hidden="true" /><div><span>Email</span><strong>{settings.email}</strong></div></a>
          <div className="contact-item"><MapPin aria-hidden="true" /><div><span>{textFor(lang, "Địa chỉ", "Address")}</span><strong>{contentText(settings.address, lang)}</strong></div></div>
        </div>
        <div className="button-row"><SiteButton><a href={zaloHref(settings.phone)} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />{textFor(lang, "Nhắn Zalo cho Đại Long", "Message Dai Long on Zalo")}</a></SiteButton><SiteButton tone="outline"><a href={"mailto:" + settings.email}>{textFor(lang, "Gửi email", "Send an email")}</a></SiteButton></div>
        <p className="section-note">{textFor(lang, "Vui lòng liên hệ trước khi ghé để được hướng dẫn vị trí và chuẩn bị mẫu bạn muốn xem.", "Please contact us before visiting for directions and to arrange the samples you would like to see.")}</p>
      </div>
      <div className="contact-visual"><img src="/images/hero-1.jpg" alt={textFor(lang, "Không gian kiến trúc truyền thống Việt", "Traditional Vietnamese architecture")} width={640} height={400} />
        <div className="contact-guide"><h2>{textFor(lang, "Để Đại Long tư vấn sát nhu cầu", "Help us advise you")}</h2><ol>
          <li>{textFor(lang, "Gửi mã sản phẩm hoặc ảnh mẫu bạn quan tâm.", "Share a product code or a reference image.")}</li>
          <li>{textFor(lang, "Cho biết kích thước, số lượng và vị trí sử dụng.", "Tell us the dimensions, quantity and intended location.")}</li>
          <li>{textFor(lang, "Trao đổi địa điểm giao và thời gian dự kiến cần hàng.", "Let us know the delivery location and your timeline.")}</li>
        </ol></div>
      </div>
    </div></section>
  </SiteShell>;
}

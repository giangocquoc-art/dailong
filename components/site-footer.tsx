import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/content";
import { contentText, formatPhone, phoneHref, textFor, withLang, type Language } from "@/lib/presentation";

export function SiteFooter({ settings, lang = "vi" }: { settings: SiteSettings; lang?: Language }) {
  return <footer className="site-footer"><div className="container-site">
    <div className="footer-grid">
      <div>
        <Link href={withLang("/", lang)} className="brand"><img src="/logo-dai-long.png" alt="" width={65} height={53} /><span><strong className="brand-name">{settings.siteTitle.normalize("NFC")}</strong><span className="brand-origin">{textFor(lang, "Gốm kiến trúc Bát Tràng", "Bat Trang architectural ceramics")}</span></span></Link>
        <p className="footer-description">{textFor(lang, "Từ mái nhà đến khoảng sân, gốm Việt hiện diện trong những chi tiết làm nên bản sắc công trình.", "From the roof to the courtyard, Vietnamese ceramics bring character to the details of a building.")}</p>
      </div>
      <div><p className="footer-title">{textFor(lang, "Khám phá", "Explore")}</p><nav className="footer-links" aria-label={textFor(lang, "Điều hướng chân trang", "Footer navigation")}>
        <Link href={withLang("/san-pham", lang)}>{textFor(lang, "Bộ sưu tập sản phẩm", "Product collection")}</Link>
        <Link href={withLang("/du-an", lang)}>{textFor(lang, "Gốm trong công trình", "Ceramics in architecture")}</Link>
        <Link href={withLang("/gioi-thieu", lang)}>{textFor(lang, "Câu chuyện Đại Long", "The Dai Long story")}</Link>
        <Link href={withLang("/lien-he", lang)}>{textFor(lang, "Liên hệ tư vấn", "Contact us")}</Link>
      </nav></div>
      <div><p className="footer-title">{textFor(lang, "Kết nối với Đại Long", "Get in touch")}</p><div className="footer-links">
        <a href={phoneHref(settings.phone)}><Phone aria-hidden="true" />{formatPhone(settings.phone)}</a>
        <a href={"mailto:" + settings.email}><Mail aria-hidden="true" />{settings.email}</a>
        <p><MapPin aria-hidden="true" /><span>{contentText(settings.address, lang)}</span></p>
      </div></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {settings.siteTitle.normalize("NFC")}</span><span>{textFor(lang, "Gìn giữ tinh hoa gốm Việt.", "Preserving Vietnamese ceramic heritage.")}</span></div>
  </div></footer>;
}

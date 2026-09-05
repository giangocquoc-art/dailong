import Link from "next/link";
import { Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/content";
import { formatPhone, phoneHref, textFor, withLang, type Language } from "@/lib/presentation";
import { SiteButton } from "./site-button";

export function Consultation({ settings, lang }: { settings: SiteSettings; lang: Language }) {
  return <section className="consultation">
    <div className="container-site consultation-inner">
      <div><p className="eyebrow">{textFor(lang, "Cùng Đại Long chọn gốm", "Find the right ceramics")}</p><h2>{textFor(lang, "Một sắc men phù hợp. Một công trình có bản sắc.", "The right glaze. A space with character.")}</h2></div>
      <div className="button-row">
        <SiteButton tone="light"><a href={phoneHref(settings.phone)}><Phone aria-hidden="true" />{formatPhone(settings.phone)}</a></SiteButton>
        <SiteButton tone="inverted"><Link href={withLang("/lien-he", lang)}>{textFor(lang, "Liên hệ tư vấn", "Talk to us")}</Link></SiteButton>
      </div>
    </div>
  </section>;
}

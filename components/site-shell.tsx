import type { ReactNode } from "react";
import type { SiteSettings } from "@/lib/content";
import { textFor, type Language } from "@/lib/presentation";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function SiteShell({ settings, lang, currentHref, children }: {
  settings: SiteSettings; lang: Language; currentHref: string; children: ReactNode;
}) {
  return <div lang={lang}>
    <a href="#main-content" className="skip-link">{textFor(lang, "Đến nội dung chính", "Skip to content")}</a>
    <SiteHeader settings={{ siteTitle: settings.siteTitle, phone: settings.phone, address: settings.address }} lang={lang} currentHref={currentHref} />
    <main id="main-content" className="site-main">{children}</main>
    <SiteFooter settings={settings} lang={lang} />
  </div>;
}

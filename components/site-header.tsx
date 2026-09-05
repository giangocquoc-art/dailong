"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { SiteSettings } from "@/lib/content";
import { contentText, phoneHref, textFor, withLang, type Language } from "@/lib/presentation";

export function SiteHeader({ settings, lang, currentHref }: { settings: Pick<SiteSettings, "siteTitle" | "phone" | "address">; lang: Language; currentHref: string }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const path = currentHref.split("?")[0];
  const navigation = [
    { href: "/", label: textFor(lang, "Trang chủ", "Home") },
    { href: "/san-pham", label: textFor(lang, "Sản phẩm", "Products") },
    { href: "/du-an", label: textFor(lang, "Công trình", "Projects") },
    { href: "/gioi-thieu", label: textFor(lang, "Về Đại Long", "Our story") },
    { href: "/lien-he", label: textFor(lang, "Liên hệ", "Contact") },
  ];
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  function isActive(href: string) { return href === "/" ? path === "/" : path.startsWith(href); }
  return <header className="site-header" onKeyDown={(event) => {
    if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); }
  }}>
    <div className="container-site header-inner">
      <Link href={withLang("/", lang)} className="brand" aria-label={textFor(lang, "Gốm sứ Đại Long — Trang chủ", "Dai Long Ceramics — Home")}>
        <img src="/logo-dai-long.png" alt="" width={65} height={53} />
        <span><strong className="brand-name">{settings.siteTitle.normalize("NFC")}</strong><span className="brand-origin">{textFor(lang, "Bát Tràng · Hà Nội", "Bat Trang · Hanoi")}</span></span>
      </Link>
      <nav className="desktop-nav" aria-label={textFor(lang, "Điều hướng chính", "Main navigation")}>
        {navigation.map((item) => <Link key={item.href} href={withLang(item.href, lang)} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}
      </nav>
      <div className="header-tools">
        <a className="header-phone text-link" href={phoneHref(settings.phone)} aria-label={textFor(lang, "Gọi Đại Long", "Call Dai Long")}><Phone size={18} aria-hidden="true" /></a>
        <nav className="language-switch" aria-label={textFor(lang, "Ngôn ngữ", "Language")}>
          <Link href={withLang(currentHref, "vi")} lang="vi" hrefLang="vi" aria-label="Tiếng Việt" aria-current={lang === "vi" ? "true" : undefined} onClick={() => setOpen(false)}>VI</Link>
          <Link href={withLang(currentHref, "en")} lang="en" hrefLang="en" aria-label="English" aria-current={lang === "en" ? "true" : undefined} onClick={() => setOpen(false)}>EN</Link>
        </nav>
        <button ref={menuButton} type="button" className="menu-toggle" aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? textFor(lang, "Đóng menu", "Close menu") : textFor(lang, "Mở menu", "Open menu")} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-nav" aria-label={textFor(lang, "Điều hướng di động", "Mobile navigation")}>
      <div className="container-site">
        {navigation.map((item) => <Link key={item.href} href={withLang(item.href, lang)} aria-current={isActive(item.href) ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>)}
        <a href={phoneHref(settings.phone)} className="site-button site-button--primary"><Phone size={18} aria-hidden="true" />{textFor(lang, "Gọi tư vấn", "Call for advice")}</a>
        <p className="section-note">{contentText(settings.address, lang)}</p>
      </div>
    </nav>}
  </header>;
}

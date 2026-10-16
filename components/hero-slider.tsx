"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

// The historic Dai Long carousel had three photographs. preview.jpg was removed
// from the current public build, so the existing hero-3.jpg is the safe first slide.
const slides = [
  { src: "/images/hero-3.jpg", vi: "Đa dạng dự án", en: "Diverse projects", altVi: "Ngói gốm kiến trúc Bát Tràng", altEn: "Bat Trang architectural ceramics" },
  { src: "/images/hero-2.jpg", vi: "Dấu ấn công trình", en: "Architectural heritage", altVi: "Công trình gốm sứ Đại Long", altEn: "Dai Long ceramic architecture" },
  { src: "/images/hero-1.jpg", vi: "Tinh hoa thủ công", en: "Artisan craftsmanship", altVi: "Nghệ thuật gốm thủ công", altEn: "Handcrafted ceramics" },
] as const;

export function HeroSlider({ lang, title }: { lang: string; title: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const en = lang === "en";

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const move = (step: number) => setActive((current) => (current + step + slides.length) % slides.length);

  return (
    <section
      className="heritage-hero"
      aria-label={en ? "Dai Long project image carousel" : "Bộ ảnh công trình Đại Long"}
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      {slides.map((slide, index) => (
        <img
          key={slide.src}
          className={`heritage-hero__image${index === active ? " is-active" : ""}`}
          src={slide.src}
          alt={en ? slide.altEn : slide.altVi}
          width={1772}
          height={584}
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          decoding="async"
          aria-hidden={index !== active}
        />
      ))}
      <div className="heritage-hero__shade" aria-hidden="true" />
      <div className="heritage-hero__content container-site">
        <h1 className="heritage-hero__sr-title">{title}</h1>
        <p className="heritage-hero__caption" aria-live="polite">{en ? slides[active].en : slides[active].vi}</p>
      </div>
      <button className="heritage-hero__arrow heritage-hero__arrow--left" type="button" aria-label={en ? "Previous image" : "Ảnh trước"} onClick={() => move(-1)}>
        <ChevronLeft aria-hidden="true" />
      </button>
      <button className="heritage-hero__arrow heritage-hero__arrow--right" type="button" aria-label={en ? "Next image" : "Ảnh tiếp theo"} onClick={() => move(1)}>
        <ChevronRight aria-hidden="true" />
      </button>
      <div className="heritage-hero__dots" role="group" aria-label={en ? "Choose carousel image" : "Chọn ảnh trình chiếu"}>
        {slides.map((slide, index) => (
          <button key={slide.src} type="button" aria-label={en ? `Image ${index + 1}` : `Ảnh ${index + 1}`} aria-pressed={index === active} onClick={() => setActive(index)}>
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}

import type { Language } from "@/lib/presentation";

export type MascotMood = "welcome" | "guide" | "proud";

const artwork: Record<MascotMood, { src: string; vi: string; en: string }> = {
  welcome: {
    src: "/images/mascot-long-gom-chao.png",
    vi: "Long Gốm vẫy tay chào",
    en: "Long Gom waving hello",
  },
  guide: {
    src: "/images/mascot-long-gom-tu-van.png",
    vi: "Long Gốm giới thiệu gạch thông gió men xanh",
    en: "Long Gom presenting a celadon breeze block",
  },
  proud: {
    src: "/images/mascot-long-gom-thanh-cong.png",
    vi: "Long Gốm vui mừng giới thiệu ngói men lam",
    en: "Long Gom happily presenting blue glazed roof tiles",
  },
};

export function DaiLongMascot({
  mood,
  lang = "vi",
  className = "",
}: {
  mood: MascotMood;
  lang?: Language;
  className?: string;
}) {
  const selected = artwork[mood];
  return <img className={className} src={selected.src} alt={lang === "vi" ? selected.vi : selected.en} width={420} height={420} loading="lazy" decoding="async" />;
}

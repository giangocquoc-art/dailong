export type Language = "vi" | "en";
export type PageQuery = Record<string, string | string[] | undefined>;
export type PageProps = { searchParams: Promise<PageQuery> };

export function getLanguage(value?: string | string[]): Language {
  return value === "en" ? "en" : "vi";
}

export function textFor(lang: Language, vi: string, en: string) {
  return (lang === "en" ? en : vi).normalize("NFC");
}

export function withLang(href: string, lang: Language) {
  const [beforeHash, hash] = href.split("#");
  const [path, query = ""] = beforeHash.split("?");
  const params = new URLSearchParams(query);
  if (lang === "en") params.set("lang", "en");
  else params.delete("lang");
  return path + (params.size ? `?${params}` : "") + (hash ? `#${hash}` : "");
}

export function currentPageHref(path: string, query: PageQuery) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === "string") params.set(key, value);
  }
  return path + (params.size ? `?${params}` : "");
}

export function phoneHref(phone: string) { return `tel:${phone.replace(/[^\d+]/g, "")}`; }
export function zaloHref(phone: string) { return `https://zalo.me/${phone.replace(/\D/g, "")}`; }
export function formatPhone(phone: string) {
  const clean = phone.replace(/\s/g, "");
  return /^0\d{9}$/.test(clean) ? `${clean.slice(0, 4)} ${clean.slice(4, 7)} ${clean.slice(7)}` : phone;
}

// Exact-match translations never overwrite content edited by the owner.
// Untranslated custom content is shown as entered instead of showing stale copy.
const translations: Record<string, string> = {
  "Rồng phượng": "Dragons & phoenixes",
  "Gạch thông gió": "Breeze blocks",
  "Đèn vườn": "Garden lanterns",
  "Lan can": "Balustrades",
  "Gạch trang trí": "Decorative tiles",
  "Gạch lát - gạch cổ": "Paving & antique bricks",
  "Ngói âm dương": "Yin-yang roof tiles",
  "Ngói văn miếu": "Temple roof tiles",
  "Nghê phong thủy": "Guardian figures",
  "Đao - Kìm nóc": "Roof ornaments",
  "Tinh hoa gốm kiến trúc Bát Tràng": "Architectural ceramics from Bat Trang",
  "Gìn giữ dáng Việt trong từng nếp nhà": "Vietnamese heritage, shaped for your home",
  "Gốm sứ kiến trúc được chế tác thủ công tại Bát Tràng, dành cho công trình tâm linh, nhà ở và không gian sân vườn mang bản sắc riêng.": "Handcrafted architectural ceramics from Bat Trang for traditional buildings, homes and gardens with a character of their own.",
  "Từ đất, lửa và đôi tay người thợ Bát Tràng, Đại Long tiếp nối kỹ nghệ gốm kiến trúc truyền thống bằng tinh thần chỉn chu của một thương hiệu đương đại. Mỗi sản phẩm được lựa chọn về tỷ lệ, sắc men và độ bền để hài hòa cùng công trình Việt.": "Shaped by clay, fire and the hands of Bat Trang craftspeople, Dai Long carries traditional ceramic craftsmanship into today's architecture. Each piece is considered for its proportions, glaze and place within the building.",
  "Phố Gốm - Bát Tràng - Hà Nội": "Pho Gom, Bat Trang, Hanoi, Vietnam",
  "Rồng chầu nguyệt men đa sắc": "Multicolour glazed dragon roof set",
  "Gạch thông gió Hoa Roi men xanh": "Hoa Roi green-glazed breeze block",
  "Đèn vườn Ngàn Hoa": "Ngan Hoa ceramic garden lantern",
  "Lan can lục bình sứ trắng": "White porcelain balustrade",
  "Gạch trang trí hoa văn cổ": "Traditional patterned ceramic tile",
  "Gạch lát sân gốm cổ": "Rustic ceramic paving tile",
  "Ngói âm dương men xanh giả đá": "Stone-blue glazed yin-yang roof tile",
  "Ngói Văn Miếu men xanh cổ vịt": "Teal-glazed temple roof tile",
  "Nghê phong thủy men rạn": "Crackle-glazed guardian figure",
  "Bò hoa chanh đôi men da lươn": "Amber-glazed floral ridge ornament",
  "Gốm Bát Tràng tráng men": "Glazed Bat Trang ceramic",
  "Sứ tráng men": "Glazed porcelain",
  "Sứ men kết tinh": "Crystalline-glazed porcelain",
  "Sứ trắng": "White porcelain",
  "Gốm đất nung": "Terracotta",
  "Gốm nung nhiệt cao": "High-fired ceramic",
  "Gốm men rạn đa sắc": "Multicolour crackle-glazed ceramic",
  "Chế tác theo công trình": "Made to project specifications",
  "Nhiều kích thước": "Various sizes",
  "Thi công theo mét dài": "Specified per linear metre",
  "Theo mẫu": "According to selected design",
  "Theo quy cách": "According to specification",
  "Cỡ S / M / L": "Sizes S / M / L",
  "Theo quy cách mái": "According to roof specification",
  "Chế tác theo mái": "Made to roof specifications",
  "Bộ rồng chầu nguyệt tạo điểm nhấn trang nghiêm cho mái đình, chùa, từ đường và công trình kiến trúc truyền thống.": "A traditional dragon-and-moon roof set for temples, ancestral halls and heritage-inspired architecture.",
  "Hoa văn mềm, thoáng sáng và có chiều sâu bề mặt; phù hợp mặt tiền, tường rào và vách ngăn sân vườn.": "An open floral pattern lets air and daylight pass through facades, garden walls and partitions.",
  "Thân đèn tạo hình thủ công với hàng trăm ô thoáng, cho ánh sáng ấm và lớp bóng đổ giàu trang trí.": "A handcrafted pierced ceramic lantern that creates decorative patterns of light and shadow in the garden.",
  "Con tiện sứ sáng, bền thời tiết, thích hợp ban công, hiên nhà và công trình mang phong cách Đông Dương.": "White porcelain balusters for balconies, verandas and Indochine-inspired architecture.",
  "Gạch gốm giàu sắc độ tự nhiên, dùng tạo mảng tường, lối đi và điểm nhấn cho không gian kiến trúc.": "Natural ceramic tones bring texture to feature walls, paths and architectural details.",
  "Bề mặt mộc, màu trầm và chống trơn, phù hợp sân vườn, bậc tam cấp và không gian phục dựng.": "Rustic surfaces and earthy tones for courtyards, steps and restoration-inspired spaces. Confirm surface suitability for your project.",
  "Dáng ngói truyền thống với lớp men xanh ghi có chiều sâu, phù hợp mái nhà Việt, nhà thờ họ và khu nghỉ dưỡng.": "Traditional roof tiles with a deep blue-grey glaze for Vietnamese homes, ancestral halls and resort architecture.",
  "Dòng ngói mang dáng dấp kiến trúc cổ, màu men bền và nổi bật dưới ánh sáng tự nhiên.": "A traditional temple-style tile with a teal glaze that comes to life in natural daylight.",
  "Tạo tác nghê cân đối, thần thái sống động; thích hợp đặt tại cổng, từ đường và không gian thờ tự.": "An expressive Vietnamese guardian figure for gateways, ancestral halls and places of worship.",
  "Phụ kiện hoàn thiện đường nóc, giữ nhịp mái và tăng vẻ bề thế cho kiến trúc truyền thống.": "A decorative ridge finishing piece that completes the rhythm and silhouette of a traditional roof.",
  "Khu sinh thái Ecopark": "Ecopark ecological urban area",
  "Vườn Nhật Bản – Vinpearl Nha Trang": "Japanese garden — Vinpearl Nha Trang",
  "Chùa Đu": "Du Pagoda",
  "Không gian sân vườn": "Garden spaces",
  "Cảnh quan nghỉ dưỡng": "Resort landscapes",
  "Kiến trúc tâm linh": "Sacred architecture",
};

export function contentText(value: string, lang: Language) {
  const normalized = value.normalize("NFC");
  return lang === "en" ? translations[normalized] ?? normalized : normalized;
}

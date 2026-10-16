import { env } from "cloudflare:workers";
import { loadPublishedPayloadProducts, mergeCatalogWithoutExactDuplicates } from "./payload-catalog";

export type SiteSettings = {
  siteTitle: string;
  heroKicker: string;
  heroTitle: string;
  heroDescription: string;
  heroImageUrl: string;
  aboutText: string;
  phone: string;
  email: string;
  address: string;
};

export type ProductInfoSection = {
  title: string;
  text: string;
  imageUrl: string;
};

export type ProductInfoTable = {
  title: string;
  columns: string[];
  rows: { label: string; values: string[] }[];
};

export type ProductTechnicalInfo = {
  sections: ProductInfoSection[];
  table: ProductInfoTable | null;
};

export type Product = {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  code: string;
  material: string;
  dimensions: string;
  description: string;
  imageUrl: string;
  images: string[];
  isPublished: number;
  featured: number;
  sortOrder: number;
  technicalInfo?: ProductTechnicalInfo;
  specifications?: { label: string; value: string }[];
};

export const defaultSettings: SiteSettings = {
  siteTitle: "Gốm sứ Đại Long",
  heroKicker: "Tinh hoa gốm kiến trúc Bát Tràng",
  heroTitle: "Gìn giữ dáng Việt trong từng nếp nhà",
  heroDescription:
    "Gốm sứ kiến trúc được chế tác thủ công tại Bát Tràng, dành cho công trình tâm linh, nhà ở và không gian sân vườn mang bản sắc riêng.",
  heroImageUrl: "/images/hero-3.jpg",
  aboutText:
    "Từ đất, lửa và đôi tay người thợ Bát Tràng, Đại Long tiếp nối kỹ nghệ gốm kiến trúc truyền thống bằng tinh thần chỉn chu của một thương hiệu đương đại. Mỗi sản phẩm được lựa chọn về tỷ lệ, sắc men và độ bền để hài hòa cùng công trình Việt.",
  phone: "0975203933",
  email: "cskh@gomsudailong.com",
  address: "Phố Gốm - Bát Tràng - Hà Nội",
};

export const defaultProducts: Product[] = [
  {
    id: "rong-chau-nguyet",
    title: "Rồng chầu nguyệt men đa sắc",
    category: "Rồng - phượng",
    subcategory: "Rồng - phượng gốm",
    code: "DL-RP01",
    material: "Gốm Bát Tràng tráng men",
    dimensions: "Chế tác theo công trình",
    description:
      "Bộ rồng chầu nguyệt tạo điểm nhấn trang nghiêm cho mái đình, chùa, từ đường và công trình kiến trúc truyền thống.",
    imageUrl: "/images/rong-phuong.jpg",
    images: [],
    isPublished: 1,
    featured: 1,
    sortOrder: 1,
  },
  {
    id: "gach-thong-gio-hoa-roi",
    title: "Gạch thông gió Hoa Roi men xanh",
    category: "Gạch thông gió",
    subcategory: "Gạch thông gió sứ",
    code: "DL-GTG01",
    material: "Sứ tráng men",
    dimensions: "30 × 30 cm",
    description:
      "Hoa văn mềm, thoáng sáng và có chiều sâu bề mặt; phù hợp mặt tiền, tường rào và vách ngăn sân vườn.",
    imageUrl: "/images/gach-thong-gio.jpg",
    images: [],
    isPublished: 1,
    featured: 1,
    sortOrder: 2,
  },
  {
    id: "den-ngan-hoa",
    title: "Đèn vườn Ngàn Hoa",
    category: "Đèn vườn",
    subcategory: "Đèn vườn sứ",
    code: "DL-DV01",
    material: "Sứ men kết tinh",
    dimensions: "Nhiều kích thước",
    description:
      "Thân đèn tạo hình thủ công với hàng trăm ô thoáng, cho ánh sáng ấm và lớp bóng đổ giàu trang trí.",
    imageUrl: "/images/den-vuon.jpg",
    images: [],
    isPublished: 1,
    featured: 1,
    sortOrder: 3,
  },
  {
    id: "lan-can-luc-binh",
    title: "Lan can lục bình sứ trắng",
    category: "Lan can",
    subcategory: "Lan can sứ",
    code: "DL-LC01",
    material: "Sứ trắng",
    dimensions: "Thi công theo mét dài",
    description:
      "Con tiện sứ sáng, bền thời tiết, thích hợp ban công, hiên nhà và công trình mang phong cách Đông Dương.",
    imageUrl: "/images/lan-can.jpg",
    images: [],
    isPublished: 1,
    featured: 0,
    sortOrder: 4,
  },
  {
    id: "gach-trang-tri-hoa-van",
    title: "Gạch trang trí hoa văn cổ",
    category: "Gạch trang trí",
    code: "DL-GTT01",
    material: "Gốm đất nung",
    dimensions: "Theo mẫu",
    description:
      "Gạch gốm giàu sắc độ tự nhiên, dùng tạo mảng tường, lối đi và điểm nhấn cho không gian kiến trúc.",
    imageUrl: "/images/gach-trang-tri.jpg",
    images: [],
    isPublished: 1,
    featured: 0,
    sortOrder: 5,
  },
  {
    id: "gach-lat-ngoai-that",
    title: "Gạch lát sân gốm cổ",
    category: "Gạch lát - Gạch cổ",
    code: "DL-GL01",
    material: "Gốm nung nhiệt cao",
    dimensions: "Theo quy cách",
    description:
      "Bề mặt mộc, màu trầm và chống trơn, phù hợp sân vườn, bậc tam cấp và không gian phục dựng.",
    imageUrl: "/images/gach-lat.jpg",
    images: [],
    isPublished: 1,
    featured: 0,
    sortOrder: 6,
  },
  {
    id: "ngoi-am-duong-men-xanh",
    title: "Ngói âm dương men xanh giả đá",
    category: "Ngói âm dương",
    subcategory: "Ngói âm dương sứ",
    code: "DL-NAD01",
    material: "Sứ tráng men",
    dimensions: "Cỡ S / M / L",
    description:
      "Dáng ngói truyền thống với lớp men xanh ghi có chiều sâu, phù hợp mái nhà Việt, nhà thờ họ và khu nghỉ dưỡng.",
    imageUrl: "/images/ngoi-am-duong.jpg",
    images: [],
    technicalInfo: {
      sections: [
        { title: "Minh họa tham khảo · cỡ L", text: "Hình minh họa hình dáng cặp ngói âm và ngói dương cỡ L; không theo tỷ lệ. Kích thước tham khảo được ghi riêng trong bảng bên dưới.", imageUrl: "/images/technical/ngoi-am-duong-l.webp" },
        { title: "Minh họa tham khảo · cỡ M", text: "Hình minh họa hình dáng cặp ngói âm và ngói dương cỡ M; không theo tỷ lệ. Kích thước tham khảo được ghi riêng trong bảng bên dưới.", imageUrl: "/images/technical/ngoi-am-duong-m.webp" },
        { title: "Minh họa tham khảo · cỡ S", text: "Hình minh họa hình dáng cặp ngói âm và ngói dương cỡ S; không theo tỷ lệ. Kích thước tham khảo được ghi riêng trong bảng bên dưới.", imageUrl: "/images/technical/ngoi-am-duong-s.webp" },
      ],
      table: {
        title: "Bảng tham khảo ba quy cách ngói âm dương",
        columns: ["Ngói âm dương cỡ L", "Ngói âm dương cỡ M", "Ngói âm dương cỡ S"],
        rows: [
          { label: "Kích thước tổng thể tham khảo", values: ["200 × 195 × 100 mm", "145 × 165 × 80 mm", "102 × 117 × 60 mm"] },
          { label: "Ngói âm", values: ["L180 × W190 × D8", "L140 × W170 × D8", "L102 × W117 × D6"] },
          { label: "Ngói dương", values: ["L155 × D8 × Ø95", "L120 × D8 × Ø76", "L110 × D6 × Ø70"] },
          { label: "Số cặp/m²", values: ["27 cặp/m²", "43 cặp/m²", "80 cặp/m²"] },
          { label: "Số cặp/m dài", values: ["5 cặp/m dài", "6 cặp/m dài", "8 cặp/m dài"] },
          { label: "Công trình ứng dụng", values: ["Mái trên 200 m²; mái ngói trang trí nhà hàng", "Mái nhà từ 50–200 m²", "Mái khoảng 10 m²; miếu mộ và bờ rào"] },
        ],
      },
    },
    isPublished: 1,
    featured: 1,
    sortOrder: 7,
  },
  {
    id: "ngoi-van-mieu-xanh",
    title: "Ngói Văn Miếu men xanh cổ vịt",
    category: "Ngói văn miếu",
    subcategory: "Ngói văn miếu sứ",
    code: "DL-NVM01",
    material: "Sứ tráng men",
    dimensions: "Theo quy cách mái",
    description:
      "Dòng ngói mang dáng dấp kiến trúc cổ, màu men bền và nổi bật dưới ánh sáng tự nhiên.",
    imageUrl: "/images/ngoi-van-mieu.jpg",
    images: [],
    isPublished: 1,
    featured: 0,
    sortOrder: 8,
  },
  {
    id: "nghe-phong-thuy-men-ran",
    title: "Nghê phong thủy men rạn",
    category: "Nghê phong thủy",
    subcategory: "Nghê gốm",
    code: "DL-NPT01",
    material: "Gốm men rạn đa sắc",
    dimensions: "Nhiều kích thước",
    description:
      "Tạo tác nghê cân đối, thần thái sống động; thích hợp đặt tại cổng, từ đường và không gian thờ tự.",
    imageUrl: "/images/nghe-phong-thuy.jpg",
    images: [],
    isPublished: 1,
    featured: 1,
    sortOrder: 9,
  },
  {
    id: "bo-hoa-chanh-doi",
    title: "Bò hoa chanh đôi men da lươn",
    category: "Phụ kiện mái",
    subcategory: "Ngói bò nóc",
    code: "DL-DKN01",
    material: "Sứ tráng men",
    dimensions: "Chế tác theo mái",
    description:
      "Phụ kiện hoàn thiện đường nóc, giữ nhịp mái và tăng vẻ bề thế cho kiến trúc truyền thống.",
    imageUrl: "/images/dao-kim-noc.jpg",
    images: [],
    isPublished: 1,
    featured: 0,
    sortOrder: 10,
  },
];

const technicalDrawingByProduct: Record<string, { image: string; title: string; text: string }> = {
  "rong-chau-nguyet": { image: "rong-chau-nguyet.webp", title: "Minh họa bố cục bộ rồng chầu nguyệt", text: "Hình tham khảo gợi bố cục cặp rồng chầu nguyệt, không theo tỷ lệ và không xác nhận cấu tạo đặt trên mái. Kích thước, hình thức và điểm liên kết cần chốt theo mẫu và hiện trạng công trình." },
  "gach-thong-gio-hoa-roi": { image: "gach-thong-gio-hoa-roi.webp", title: "Minh họa viên gạch thông gió và mảng ghép", text: "Hình tham khảo hoa văn, bề mặt và cách ghép mảng; không thay thế bản vẽ có kích thước. Quy cách catalog hiện có: 30 × 30 cm; chiều dày và chi tiết liên kết cần xác nhận theo mẫu." },
  "den-ngan-hoa": { image: "den-ngan-hoa.webp", title: "Minh họa hình dáng đèn Ngàn Hoa", text: "Hình tham khảo thân đèn và hoa văn ô thoáng, không xác nhận cấu tạo chân đế hoặc bộ điện. Dòng sản phẩm có nhiều kích thước; cần chốt số đo và phương án chiếu sáng theo mẫu." },
  "lan-can-luc-binh": { image: "lan-can-luc-binh.webp", title: "Minh họa con tiện lục bình và nhịp lan can", text: "Hình gợi ý hình dáng và bố cục tham khảo; chưa xác nhận chi tiết liên kết, cao độ hay khoảng cách. Quy cách cần đo và duyệt theo công trình." },
  "gach-trang-tri-hoa-van": { image: "gach-trang-tri-hoa-van-v2.webp", title: "Minh họa dải gạch trang trí hoa văn", text: "Hình tham khảo dải gạch men xanh và hoa văn lặp theo ảnh sản phẩm; không thay thế bản vẽ có kích thước. Kích thước, độ dày và cách ghép cần xác nhận theo mẫu thực tế." },
  "gach-lat-ngoai-that": { image: "gach-lat-ngoai-that.webp", title: "Minh họa bề mặt và cách ghép gạch lát", text: "Hình tham khảo bề mặt và cách ghép viên lát; lớp nền trong hình chỉ mang tính minh họa, không phải chi tiết cấu tạo thi công. Kích thước viên và phương án lát cần xác nhận theo mẫu và hiện trạng." },
  "ngoi-van-mieu-xanh": { image: "ngoi-van-mieu-xanh.webp", title: "Minh họa hình dáng ngói Văn Miếu", text: "Hình tham khảo hình dáng và sắc men; phần lợp dưới diềm mái chỉ gợi ý bố cục, không xác nhận cấu tạo thực tế. Catalog chưa có số đo cấu kiện; cần chốt theo mẫu và mái công trình." },
  "nghe-phong-thuy-men-ran": { image: "nghe-phong-thuy-men-ran.webp", title: "Minh họa ý tưởng tượng nghê men rạn", text: "Hình tham khảo gợi hình dáng nghê men rạn, chưa xác nhận tư thế, chi tiết tạo hình hay kích thước của mẫu bán. Cần đối chiếu mẫu thực tế và chốt số đo trước khi đặt." },
  "bo-hoa-chanh-doi": { image: "bo-hoa-chanh-doi.webp", title: "Minh họa hoa văn bò hoa chanh đôi", text: "Hình tham khảo hoa văn và sắc men; cách bố trí trên đường nóc chỉ mang tính gợi ý, không xác nhận cấu tạo lắp đặt. Kích thước, điểm nối và số lượng cần xác định theo mẫu và công trình." },
};

for (const product of defaultProducts) {
  if (product.id === "ngoi-am-duong-men-xanh") continue;
  const drawing = technicalDrawingByProduct[product.id];
  if (!drawing) continue;
  product.technicalInfo = {
    sections: [{ title: drawing.title, text: drawing.text, imageUrl: `/images/technical/${drawing.image}` }],
    table: {
      title: "Thông tin kỹ thuật hiện có",
      columns: ["Thông tin"],
      rows: [
        { label: "Chất liệu", values: [product.material] },
        { label: "Quy cách catalog", values: [product.dimensions] },
        { label: "Ứng dụng", values: [product.description] },
        { label: "Số đo chi tiết", values: [product.id === "gach-thong-gio-hoa-roi" ? "30 × 30 cm (quy cách catalog); chiều dày cần xác nhận." : "Chưa có bản số đo được xác nhận; vui lòng đo theo mẫu/công trình."] },
      ],
    },
  };
}

type DbSettingsRow = {
  site_title: string;
  hero_kicker: string;
  hero_title: string;
  hero_description: string;
  hero_image_url: string;
  about_text: string;
  phone: string;
  email: string;
  address: string;
};

type DbProductRow = {
  id: string;
  title: string;
  category: string;
  code: string;
  material: string;
  dimensions: string;
  description: string;
  image_url: string;
  gallery_json?: string;
  technical_info_json?: string;
  is_published?: number;
  featured: number;
  sort_order: number;
};

function settingsFromRow(row: DbSettingsRow): SiteSettings {
  return {
    siteTitle: row.site_title,
    heroKicker: row.hero_kicker,
    heroTitle: row.hero_title,
    heroDescription: row.hero_description,
    heroImageUrl: row.hero_image_url,
    aboutText: row.about_text,
    phone: row.phone,
    email: row.email,
    address: row.address,
  };
}

function productFromRow(row: DbProductRow): Product {
  let images: string[] = [];
  try {
    const parsed = JSON.parse(row.gallery_json || "[]") as unknown;
    if (Array.isArray(parsed)) images = parsed.filter((url): url is string => typeof url === "string").slice(0, 12);
  } catch { /* An invalid legacy gallery falls back to its cover image. */ }
  let technicalInfo: ProductTechnicalInfo | undefined;
  try {
    const parsed = JSON.parse(row.technical_info_json || "null") as ProductTechnicalInfo | null;
    if (parsed && Array.isArray(parsed.sections)) technicalInfo = parsed;
  } catch { /* Old rows have no technical information yet. */ }
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    code: row.code,
    material: row.material,
    dimensions: row.dimensions,
    description: row.description,
    imageUrl: row.image_url,
    images,
    isPublished: row.is_published ?? 1,
    featured: row.featured,
    sortOrder: row.sort_order,
    technicalInfo,
  };
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    const row = await env.DB.prepare(
      "SELECT site_title, hero_kicker, hero_title, hero_description, hero_image_url, about_text, phone, email, address FROM site_settings WHERE id = 1",
    ).first<DbSettingsRow>();
    return row ? settingsFromRow(row) : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export async function getProducts({ includeUnpublished = false }: { includeUnpublished?: boolean } = {}): Promise<Product[]> {
  // Preview-only during recovery. Production opt-in requires an explicit environment flag.
  const readFromPayload = typeof process !== "undefined" && process.env.VERCEL === "1" &&
    (process.env.VERCEL_GIT_COMMIT_REF === "codex/dai-long-cms-catalog-recovery" ||
      process.env.DAI_LONG_ENABLE_PAYLOAD_CATALOG === "1");
  if (readFromPayload) {
    const restored = await loadPublishedPayloadProducts();
    if (restored !== null) {
      const roofReference = defaultProducts.find((p) => p.id === "ngoi-am-duong-men-xanh")?.technicalInfo;
      return mergeCatalogWithoutExactDuplicates(defaultProducts, restored)
        .filter((product) => includeUnpublished || product.isPublished === 1)
        // The same reference diagrams and L/M/S sizing guide apply to both
        // porcelain and earthenware tiles; they are reference data, not per-SKU promises.
        .map((product) => product.category === "Ngói âm dương" && !product.technicalInfo
          ? { ...product, technicalInfo: roofReference }
          : product);
    }
  }
  try {
    let result: { results: DbProductRow[] };
    try {
      result = await env.DB.prepare(
        "SELECT id, title, category, code, material, dimensions, description, image_url, gallery_json, technical_info_json, is_published, featured, sort_order FROM products ORDER BY sort_order, title",
      ).all<DbProductRow>();
    } catch {
      const legacy = await env.DB.prepare(
        "SELECT id, title, category, code, material, dimensions, description, image_url, featured, sort_order FROM products ORDER BY sort_order, title",
      ).all<DbProductRow>();
      result = { results: (legacy.results as DbProductRow[]).map((row) => ({ ...row, gallery_json: "[]", technical_info_json: "null", is_published: 1 })) };
    }
    const overrides = new Map(
      result.results.map((row) => [row.id, productFromRow(row)]),
    );
    const defaultIds = new Set(defaultProducts.map((product) => product.id));
    const combined = [
      ...defaultProducts.map((product) => {
        const override = overrides.get(product.id);
        if (!override) return product;
        const storedInfo = override.technicalInfo;
      const previousGeneratedImages = new Set([
        "/images/technical/ngoi-am-duong.webp",
        "/images/technical/gach-trang-tri-hoa-van.webp",
        ...Object.values(technicalDrawingByProduct).map(({ image }) => `/images/technical/${image}`),
      ]);
      const staleDefaultIllustrations = storedInfo?.sections.length && storedInfo.sections.every((section) => section.imageUrl && previousGeneratedImages.has(section.imageUrl));
      const technicalInfo = !storedInfo || (!storedInfo.sections.length && !storedInfo.table?.columns.length) || staleDefaultIllustrations
          ? product.technicalInfo
          : storedInfo;
        return { ...product, ...override, technicalInfo };
      }),
      ...result.results.map(productFromRow).filter((product) => !defaultIds.has(product.id)),
    ];
    return combined
      .filter((product) => includeUnpublished || product.isPublished === 1)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return defaultProducts.filter((product) => includeUnpublished || product.isPublished === 1);
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  return (await getProducts()).find((product) => product.id === id) ?? null;
}

// Historical category export remains for the legacy editor. The live catalog
// uses the customer's two-level taxonomy below.
export const categories = [
  "Rồng phượng",
  "Gạch thông gió",
  "Đèn vườn",
  "Lan can",
  "Gạch trang trí",
  "Gạch lát - gạch cổ",
  "Ngói âm dương",
  "Ngói văn miếu",
  "Nghê phong thủy",
  "Đao - Kìm nóc",
];

export const catalogHierarchy: { name: string; children: string[] }[] = [
  { name: "Ngói âm dương", children: ["Ngói âm dương sứ", "Ngói âm dương gốm"] },
  { name: "Ngói văn miếu", children: ["Ngói văn miếu sứ", "Ngói văn miếu gốm"] },
  { name: "Gạch thông gió", children: ["Gạch thông gió sứ", "Gạch thông gió gốm"] },
  { name: "Lan can", children: ["Lan can sứ", "Lan can gốm"] },
  { name: "Đèn vườn", children: ["Đèn vườn gốm", "Đèn vườn sứ"] },
  { name: "Nghê phong thủy", children: ["Nghê gốm", "Nghê sứ"] },
  { name: "Phụ kiện mái", children: ["Ngói bò nóc", "Hồ lô chống sét", "Đao - kìm", "Rồng - phượng"] },
  { name: "Gạch lát - Gạch cổ", children: [] },
  { name: "Mảnh sành sứ", children: [] },
  // Preserve existing gạch trang trí / gạch hoa records not named in the
  // supplied hierarchy, rather than silently hiding them.
  { name: "Gạch trang trí", children: ["Gạch hoa sứ", "Gạch hoa gốm"] },
];

// Display-only grouping: keep the original category and material variant in the CMS.
export function catalogParentCategory(category: string): string {
  return category === "Rồng - phượng" || category === "Rồng phượng" ? "Phụ kiện mái" : category;
}

export function catalogProductSubcategory(product: Pick<Product, "category" | "subcategory">): string | undefined {
  return product.category === "Rồng - phượng" || product.category === "Rồng phượng"
    ? "Rồng - phượng"
    : product.subcategory;
}

export const projects = [
  {
    title: "Ngói âm dương trên mái nhà Việt",
    type: "Gợi ý ứng dụng · mái nhà",
    imageUrl: "/images/ngoi-am-duong.jpg",
  },
  {
    title: "Sắc men xanh cho công trình",
    type: "Gợi ý ứng dụng · sắc men",
    imageUrl: "/images/ngoi-van-mieu.jpg",
  },
  {
    title: "Chi tiết mái kiến trúc truyền thống",
    type: "Gợi ý ứng dụng · chi tiết mái",
    imageUrl: "/images/project-chua-du.jpg",
  },
];

export const roofTileApplications = [
  {
    title: "Nhịp mái kiến trúc truyền thống",
    type: "Hình tham khảo · mái ngói",
    imageUrl: "/images/project-chua-du.jpg",
    description: "Mái nhiều lớp gợi cách nhịp ngói và đường bờ mái định hình tổng thể. Ảnh tham khảo kiến trúc, không xác nhận nguồn cung ngói.",
  },
  {
    title: "Sắc men xanh trên từng viên ngói",
    type: "Chi tiết vật liệu · men xanh",
    imageUrl: "/images/ngoi-van-mieu.jpg",
    description: "Bề mặt men xanh ghi tạo chiều sâu và thay đổi theo ánh sáng. Hãy đối chiếu màu thực tế bằng mẫu gốm trước khi chọn.",
  },
];

import { env } from "cloudflare:workers";

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

export type Product = {
  id: string;
  title: string;
  category: string;
  code: string;
  material: string;
  dimensions: string;
  description: string;
  imageUrl: string;
  featured: number;
  sortOrder: number;
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
    category: "Rồng phượng",
    code: "DL-RP01",
    material: "Gốm Bát Tràng tráng men",
    dimensions: "Chế tác theo công trình",
    description:
      "Bộ rồng chầu nguyệt tạo điểm nhấn trang nghiêm cho mái đình, chùa, từ đường và công trình kiến trúc truyền thống.",
    imageUrl: "/images/rong-phuong.jpg",
    featured: 1,
    sortOrder: 1,
  },
  {
    id: "gach-thong-gio-hoa-roi",
    title: "Gạch thông gió Hoa Roi men xanh",
    category: "Gạch thông gió",
    code: "DL-GTG01",
    material: "Sứ tráng men",
    dimensions: "30 × 30 cm",
    description:
      "Hoa văn mềm, thoáng sáng và có chiều sâu bề mặt; phù hợp mặt tiền, tường rào và vách ngăn sân vườn.",
    imageUrl: "/images/gach-thong-gio.jpg",
    featured: 1,
    sortOrder: 2,
  },
  {
    id: "den-ngan-hoa",
    title: "Đèn vườn Ngàn Hoa",
    category: "Đèn vườn",
    code: "DL-DV01",
    material: "Sứ men kết tinh",
    dimensions: "Nhiều kích thước",
    description:
      "Thân đèn tạo hình thủ công với hàng trăm ô thoáng, cho ánh sáng ấm và lớp bóng đổ giàu trang trí.",
    imageUrl: "/images/den-vuon.jpg",
    featured: 1,
    sortOrder: 3,
  },
  {
    id: "lan-can-luc-binh",
    title: "Lan can lục bình sứ trắng",
    category: "Lan can",
    code: "DL-LC01",
    material: "Sứ trắng",
    dimensions: "Thi công theo mét dài",
    description:
      "Con tiện sứ sáng, bền thời tiết, thích hợp ban công, hiên nhà và công trình mang phong cách Đông Dương.",
    imageUrl: "/images/lan-can.jpg",
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
    featured: 0,
    sortOrder: 5,
  },
  {
    id: "gach-lat-ngoai-that",
    title: "Gạch lát sân gốm cổ",
    category: "Gạch lát - gạch cổ",
    code: "DL-GL01",
    material: "Gốm nung nhiệt cao",
    dimensions: "Theo quy cách",
    description:
      "Bề mặt mộc, màu trầm và chống trơn, phù hợp sân vườn, bậc tam cấp và không gian phục dựng.",
    imageUrl: "/images/gach-lat.jpg",
    featured: 0,
    sortOrder: 6,
  },
  {
    id: "ngoi-am-duong-men-xanh",
    title: "Ngói âm dương men xanh giả đá",
    category: "Ngói âm dương",
    code: "DL-NAD01",
    material: "Sứ tráng men",
    dimensions: "Cỡ S / M / L",
    description:
      "Dáng ngói truyền thống với lớp men xanh ghi có chiều sâu, phù hợp mái nhà Việt, nhà thờ họ và khu nghỉ dưỡng.",
    imageUrl: "/images/ngoi-am-duong.jpg",
    featured: 1,
    sortOrder: 7,
  },
  {
    id: "ngoi-van-mieu-xanh",
    title: "Ngói Văn Miếu men xanh cổ vịt",
    category: "Ngói văn miếu",
    code: "DL-NVM01",
    material: "Sứ tráng men",
    dimensions: "Theo quy cách mái",
    description:
      "Dòng ngói mang dáng dấp kiến trúc cổ, màu men bền và nổi bật dưới ánh sáng tự nhiên.",
    imageUrl: "/images/ngoi-van-mieu.jpg",
    featured: 0,
    sortOrder: 8,
  },
  {
    id: "nghe-phong-thuy-men-ran",
    title: "Nghê phong thủy men rạn",
    category: "Nghê phong thủy",
    code: "DL-NPT01",
    material: "Gốm men rạn đa sắc",
    dimensions: "Nhiều kích thước",
    description:
      "Tạo tác nghê cân đối, thần thái sống động; thích hợp đặt tại cổng, từ đường và không gian thờ tự.",
    imageUrl: "/images/nghe-phong-thuy.jpg",
    featured: 1,
    sortOrder: 9,
  },
  {
    id: "bo-hoa-chanh-doi",
    title: "Bò hoa chanh đôi men da lươn",
    category: "Đao - Kìm nóc",
    code: "DL-DKN01",
    material: "Sứ tráng men",
    dimensions: "Chế tác theo mái",
    description:
      "Phụ kiện hoàn thiện đường nóc, giữ nhịp mái và tăng vẻ bề thế cho kiến trúc truyền thống.",
    imageUrl: "/images/dao-kim-noc.jpg",
    featured: 0,
    sortOrder: 10,
  },
];

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
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    code: row.code,
    material: row.material,
    dimensions: row.dimensions,
    description: row.description,
    imageUrl: row.image_url,
    featured: row.featured,
    sortOrder: row.sort_order,
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

export async function getProducts(): Promise<Product[]> {
  try {
    const result = await env.DB.prepare(
      "SELECT id, title, category, code, material, dimensions, description, image_url, featured, sort_order FROM products ORDER BY sort_order, title",
    ).all<DbProductRow>();
    const overrides = new Map(
      result.results.map((row) => [row.id, productFromRow(row)]),
    );
    return defaultProducts
      .map((product) => overrides.get(product.id) ?? product)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return defaultProducts;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const row = await env.DB.prepare(
      "SELECT id, title, category, code, material, dimensions, description, image_url, featured, sort_order FROM products WHERE id = ?",
    )
      .bind(id)
      .first<DbProductRow>();
    if (row) return productFromRow(row);
  } catch {
    // Fall through to the bundled catalog while the database is unavailable.
  }
  return defaultProducts.find((product) => product.id === id) ?? null;
}

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

export const projects = [
  {
    title: "Khu sinh thái Ecopark",
    type: "Không gian sân vườn",
    imageUrl: "/images/project-ecopark.jpg",
  },
  {
    title: "Vườn Nhật Bản – Vinpearl Nha Trang",
    type: "Cảnh quan nghỉ dưỡng",
    imageUrl: "/images/project-vinpearl.jpg",
  },
  {
    title: "Chùa Đu",
    type: "Kiến trúc tâm linh",
    imageUrl: "/images/project-chua-du.jpg",
  },
];

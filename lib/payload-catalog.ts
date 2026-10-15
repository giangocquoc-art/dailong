import type { Product } from "./content";
import { recoveredCmsMediaUrl } from "./recovered-cms-media";

/**
 * Read-only adapter for the separately deployed Payload CMS.
 * Never writes product records or media, and never treats a reused stock image
 * as proof that two product records represent the same physical SKU.
 */
type Media = { url?: string | null } | number | string | null;
type Category = { name?: string | null } | number | string | null;
type CMSProduct = {
  id?: number | string;
  slug?: string | null;
  code?: string | null;
  title?: string | null;
  category?: Category;
  _status?: string | null;
  material?: string | null;
  dimensions?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  featuredImage?: Media;
  externalImageUrl?: string | null;
  gallery?: Array<Media | { image?: Media }> | null;
  externalGallery?: Array<{ url?: string | null } | null> | null;
  hoverImage?: Media;
  externalHoverImageUrl?: string | null;
  featured?: boolean | null;
  order?: number | null;
};


/**
 * Payload stores granular CMS categories; the customer-facing catalog retains
 * its existing ten top-level product groups plus the distinct mosaic category.
 * The original CMS taxonomy remains unchanged in the Payload database.
 */
const topLevelCategoryByCmsName: Record<string, string> = {
  "Mảnh sành sứ": "Mảnh sành sứ",
  "Đao - Kìm": "Đao - Kìm nóc",
  "Hồ lô chống sét": "Đao - Kìm nóc",
  "Ngói bò nóc": "Đao - Kìm nóc",
  "Nghê sứ": "Nghê phong thủy",
  "Nghê gốm": "Nghê phong thủy",
  "Rồng - Phượng sứ": "Rồng phượng",
  "Rồng - Phượng gốm": "Rồng phượng",
  "Ngói Văn Miếu sứ": "Ngói văn miếu",
  "Ngói Văn Miếu gốm": "Ngói văn miếu",
  "Lan can sứ": "Lan can",
  "Lan can gốm": "Lan can",
  "Gạch cổ Bát Tràng": "Gạch lát - gạch cổ",
  "Đèn vườn sứ": "Đèn vườn",
  "Đèn vườn gốm": "Đèn vườn",
  "Gạch hoa sứ": "Gạch trang trí",
  "Gạch hoa gốm": "Gạch trang trí",
  "Ngói âm dương sứ": "Ngói âm dương",
  "Ngói âm dương gốm": "Ngói âm dương",
};

function cmsImageUrl(url: string): string {
  const recovered = recoveredCmsMediaUrl(url);
  if (recovered.startsWith("/api/") || recovered.startsWith("/media/")) {
    return "https://admin.gomsudailong.vn" + recovered;
  }
  return recovered;
}

type CMSPage = {
  docs?: CMSProduct[];
  page?: number;
  totalPages?: number;
  totalDocs?: number;
  hasNextPage?: boolean;
};

function mediaUrl(value: Media | undefined): string {
  if (typeof value === "string") return value.trim();
  if (value && typeof value === "object" && typeof value.url === "string") return value.url.trim();
  return "";
}

function firstText(...values: Array<string | null | undefined>): string {
  return values.find((value) => typeof value === "string" && value.trim().length > 0)?.trim() ?? "";
}

export async function loadPublishedPayloadProducts(): Promise<Product[] | null> {
  try {
    const collected: CMSProduct[] = [];
    let totalPages = 1;
    for (let page = 1; page <= totalPages; page += 1) {
      if (page > 20) return null; // Fail closed instead of silently truncating.
      const response = await fetch(
        "https://admin.gomsudailong.vn/api/products?limit=100&depth=1&page=" + page,
        { next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) },
      );
      if (!response.ok) return null;
      const data: CMSPage = await response.json();
      if (!Array.isArray(data.docs) || !Number.isInteger(data.totalPages) || !data.totalPages || data.totalPages > 20) {
        return null;
      }
      totalPages = data.totalPages;
      collected.push(...data.docs);
      if (page === totalPages && typeof data.totalDocs === "number" && collected.length !== data.totalDocs) {
        return null;
      }
    }

    return collected
      .filter((row) => row._status === "published" && row.slug && row.title)
      .map((row, index): Product => {
        const media = mediaUrl(row.featuredImage);
        const imageUrl = cmsImageUrl(firstText(media, row.externalImageUrl));
        const category = typeof row.category === "object" && row.category
          ? firstText(row.category.name)
          : typeof row.category === "string" ? row.category : "Khác";
        const gallery = [
          ...(row.gallery ?? []).map((item) => item && typeof item === "object" && "image" in item ? mediaUrl(item.image) : mediaUrl(item as Media)),
          ...(row.externalGallery ?? []).map((item) => firstText(item?.url)),
        ];
        const images = Array.from(new Set(gallery.map(cmsImageUrl).filter((url) => url && url !== imageUrl)));
        return {
          id: row.slug!,
          title: row.title!,
          code: firstText(row.code) || String(row.id ?? row.slug),
          category: topLevelCategoryByCmsName[category] ?? category,
          material: firstText(row.material) || "Liên hệ để xác nhận",
          dimensions: firstText(row.dimensions) || "Theo mẫu thực tế",
          description: firstText(row.shortDescription, row.description),
          imageUrl,
          images,
          isPublished: 1,
          featured: row.featured ? 1 : 0,
          sortOrder: 100 + (typeof row.order === "number" ? row.order : index),
        };
      });
  } catch {
    return null;
  }
}

function normalized(value: string): string {
  return value.trim().normalize("NFKC").toLocaleLowerCase("vi");
}

/**
 * Preserve all distinct codes. Exact SKU, slug or name matches count as duplicates;
 * shared photographs do not, because several CMS products reuse generic images.
 */
export function mergeCatalogWithoutExactDuplicates(current: Product[], cms: Product[]): Product[] {
  const codes = new Set<string>();
  const slugs = new Set<string>();
  const titles = new Set<string>();
  const result: Product[] = [];
  for (const product of [...current, ...cms]) {
    const code = normalized(product.code);
    const slug = normalized(product.id);
    const title = normalized(product.title);
    if ((code && codes.has(code)) || slugs.has(slug) || titles.has(title)) continue;
    result.push(product);
    if (code) codes.add(code);
    slugs.add(slug);
    titles.add(title);
  }
  return result.sort((a, b) => a.sortOrder - b.sortOrder);
}

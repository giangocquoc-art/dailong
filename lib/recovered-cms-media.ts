/**
 * Verified original Dai Long media recovered from the 2026-09-23 Vercel deployment.
 * All 33 source assets were checked as image files and copied without alteration
 * into the project's existing Vercel Blob storage (2026-10-15).
 *
 * This is an allowlist: future CMS media must not be redirected to a missing blob.
 * The production site's own default image URLs remain unchanged.
 */
export const RECOVERED_CMS_MEDIA_BASE = "https://wewoaj1xzedqy2c6.public.blob.vercel-storage.com/dailong-recovery-2026-10-15";

const recoveredMediaPaths = new Set<string>([
  "/images/catalog/12-manh-sanh-su-anh-man-hinh-2026-09-23-luc-08-53-54.png",
  "/images/catalog/12-manh-sanh-su-anh-man-hinh-2026-09-23-luc-08-54-08.png",
  "/images/catalog/ao-kim-dsc-5365-copy.jpg",
  "/images/catalog/ho-lo-chong-set-dsc-5359.jpg",
  "/images/catalog/ngoi-bo-noc-750-5242.jpg",
  "/images/catalog/ngoi-bo-noc-750-5246.jpg",
  "/images/catalog/nghe-su-a7500174.jpg",
  "/images/catalog/nghe-gom-dsc-5388.jpg",
  "/images/rong-phuong.jpg",
  "/images/rong-phuong-hover.png",
  "/images/catalog/rong-phuong-gom-dsc-5319.jpg",
  "/images/catalog/ngoi-van-mieu-su-pan-7470.jpg",
  "/images/catalog/ngoi-van-mieu-su-pan-7471.jpg",
  "/images/ngoi-van-mieu.jpg",
  "/images/ngoi-van-mieu-hover.png",
  "/images/catalog/lan-can-su-ban-sao-cua-dsc-8401.jpg",
  "/images/catalog/lan-can-su-lan-can-giot-len-57-nau-en.jpg",
  "/images/catalog/lan-can-gom-lan-can-gom.jpg",
  "/images/catalog/6-gach-lat-gach-co-img-0424.jpg",
  "/images/den-vuon.jpg",
  "/images/den-vuon-hover.png",
  "/images/catalog/en-vuon-gom-pan-7441.jpg",
  "/images/catalog/en-vuon-gom-pan-7445.jpg",
  "/images/catalog/gach-hoa-su-gach-hoa-buoi-30-xanh-ong-3.jpg",
  "/images/catalog/gach-hoa-su-gach-hoa-buoi-30-xanh-ong.jpg",
  "/images/catalog/gach-hoa-gom-gach-hoa-buoi-30-gom-3.jpg",
  "/images/catalog/gach-hoa-gom-gach-hoa-buoi-30-gom.jpg",
  "/images/catalog/ngoi-am-duong-su-dav-0006.jpg",
  "/images/catalog/ngoi-am-duong-su-dav-0007.jpg",
  "/images/catalog/ngoi-am-duong-su-dav-6224.jpg",
  "/images/catalog/ngoi-am-duong-su-dav-6234.jpg",
  "/images/catalog/ngoi-am-duong-gom-anh-1.jpg",
  "/images/catalog/ngoi-am-duong-gom-ngoi-am-duong-dat-nung-co-lon.jpg",
]);

export function recoveredCmsMediaUrl(url: string): string {
  const raw = url.trim();
  const path = raw.startsWith("https://gomsudailong.vn/")
    ? raw.slice("https://gomsudailong.vn".length)
    : raw;
  return recoveredMediaPaths.has(path) ? RECOVERED_CMS_MEDIA_BASE + path : raw;
}

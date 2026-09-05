import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SiteShell } from "@/components/site-shell";
import { SiteButton } from "@/components/site-button";
import { Consultation } from "@/components/consultation";
import { categories, getProducts, getSettings, projects } from "@/lib/content";
import { contentText, currentPageHref, getLanguage, textFor, withLang, zaloHref, type PageProps } from "@/lib/presentation";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: PageProps) {
  const [query, settings, products] = await Promise.all([searchParams, getSettings(), getProducts()]);
  const lang = getLanguage(query.lang);
  const featured = [...products.filter((p) => p.featured), ...products.filter((p) => !p.featured)].slice(0, 6);
  const categoryItems = Array.from(new Set([...categories, ...products.map((p) => p.category)]));
  return <SiteShell settings={settings} lang={lang} currentHref={currentPageHref("/", query)}>
    <section className="hero">
      <div className="container-site hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{contentText(settings.heroKicker, lang)}</p>
          <h1 className="hero-title">{contentText(settings.heroTitle, lang)}</h1>
          <p className="hero-description">{contentText(settings.heroDescription, lang)}</p>
          <div className="button-row">
            <SiteButton><Link href={withLang("/san-pham", lang)}>{textFor(lang, "Khám phá sản phẩm", "Explore products")}<ArrowRight aria-hidden="true" /></Link></SiteButton>
            <SiteButton tone="outline"><a href={zaloHref(settings.phone)} target="_blank" rel="noopener noreferrer">{textFor(lang, "Tư vấn qua Zalo", "Chat on Zalo")}</a></SiteButton>
          </div>
          <p className="hero-origin"><MapPin size={17} aria-hidden="true" />{contentText(settings.address, lang)}</p>
        </div>
        <figure className="hero-visual">
          <img className="hero-image" src={settings.heroImageUrl} alt={textFor(lang, "Mái chùa với ngói và chi tiết gốm kiến trúc truyền thống", "Traditional temple roof with architectural ceramic details")} width={700} height={600} fetchPriority="high" />
          <div className="hero-inset"><img src="/images/ngoi-van-mieu.jpg" alt={textFor(lang, "Cận cảnh sắc men xanh ngói Văn Miếu", "Close-up of teal-glazed temple roof tiles")} width={160} height={160} /></div>
          <figcaption>{textFor(lang, "Đất, lửa và sắc men Việt.", "Clay, fire and Vietnamese glaze.")}</figcaption>
        </figure>
      </div>
    </section>
    <section className="category-section" aria-labelledby="categories-title">
      <div className="container-site">
        <div className="category-heading"><h2 id="categories-title">{textFor(lang, "Tìm theo dòng sản phẩm", "Browse by collection")}</h2></div>
        <div className="category-grid">{categoryItems.map((category) => {
          const item = products.find((product) => product.category === category);
          if (!item) return null;
          return <Link className="category-tile" key={category} href={withLang("/san-pham?danh-muc=" + encodeURIComponent(category), lang)}>
            <div className="category-image"><img src={item.imageUrl} alt="" width={120} height={120} loading="lazy" decoding="async" /></div><span>{contentText(category, lang)}</span>
          </Link>;
        })}</div>
      </div>
    </section>
    <section className="section">
      <div className="container-site">
        <div className="section-head"><div><p className="eyebrow">{textFor(lang, "Bộ sưu tập Đại Long", "The Dai Long collection")}</p><h2 className="section-title">{textFor(lang, "Nét gốm cho từng không gian", "Ceramics for every space")}</h2></div><Link className="text-link" href={withLang("/san-pham", lang)}>{textFor(lang, "Xem tất cả sản phẩm", "View all products")}<ArrowRight aria-hidden="true" /></Link></div>
        <div className="product-grid">{featured.map((product) => <ProductCard key={product.id} product={product} lang={lang} />)}</div>
      </div>
    </section>
    <section className="section section-soft">
      <div className="container-site story-grid">
        <img className="story-image" src="/images/ngoi-van-mieu.jpg" alt={textFor(lang, "Lớp men xanh trên những viên ngói gốm", "Blue glaze on handcrafted ceramic roof tiles")} width={600} height={470} loading="lazy" decoding="async" />
        <div className="story-copy">
          <p className="eyebrow">{textFor(lang, "Từ làng nghề Bát Tràng", "Rooted in Bat Trang")}</p>
          <h2 className="section-title">{textFor(lang, "Giữ hồn gốm Việt, tiếp nối cùng Đại Long", "Vietnamese craftsmanship, a new chapter")}</h2>
          <p>{contentText(settings.aboutText, lang)}</p>
          <div className="story-details">
            <div><h3>{textFor(lang, "Dáng gốm truyền thống", "Traditional forms")}</h3><p>{textFor(lang, "Đường nét hài hòa với mái nhà và cảnh quan Việt.", "Forms that belong to Vietnamese roofs and landscapes.")}</p></div>
            <div><h3>{textFor(lang, "Tư vấn theo công trình", "Project-led advice")}</h3><p>{textFor(lang, "Cùng chọn sắc men, quy cách và cách phối vật liệu.", "Choose the glaze, proportions and material palette together.")}</p></div>
          </div>
          <Link className="text-link" href={withLang("/gioi-thieu", lang)}>{textFor(lang, "Câu chuyện Đại Long", "Read our story")}<ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container-site">
        <div className="section-head"><div><p className="eyebrow">{textFor(lang, "Từ sản phẩm đến công trình", "From object to architecture")}</p><h2 className="section-title">{textFor(lang, "Gốm trong không gian sống", "Ceramics in living spaces")}</h2></div><Link className="text-link" href={withLang("/du-an", lang)}>{textFor(lang, "Xem công trình tham khảo", "Explore project references")}<ArrowRight aria-hidden="true" /></Link></div>
        <div className="project-grid">{projects.map((project, index) => <Link key={project.title} href={withLang("/du-an#cong-trinh-" + index, lang)} className="project-card">
          <img src={project.imageUrl} alt={contentText(project.title, lang)} width={480} height={330} loading="lazy" decoding="async" />
          <p className="eyebrow">{contentText(project.type, lang)}</p><h3>{contentText(project.title, lang)}</h3>
        </Link>)}</div>
        <p className="section-note">{textFor(lang, "Hình ảnh công trình tham khảo từ website Gốm sứ Thanh Hải trước đây.", "Project reference images from the former Thanh Hai Ceramics website.")}</p>
      </div>
    </section>
    <Consultation settings={settings} lang={lang} />
  </SiteShell>;
}

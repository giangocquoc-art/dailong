import { textFor, type Language } from "@/lib/presentation";

/** Visualises body tiles versus eave-edge tiles; illustrative, not a construction drawing. */
export function RoofTileConstruction({ lang = "vi" }: { lang?: Language }) {
  const items = [
    {
      id: "body",
      title: textFor(lang, "Thân mái: Ngói âm và Ngói dương", "Roof body: Yin and Yang tiles"),
      copy: textFor(lang,
        "Ngói âm nằm dưới để thoát nước; ngói dương phủ lên khe tiếp giáp, giúp mái kín và bền.",
        "Yin tiles channel water underneath; Yang tiles cap the joints for a durable roof."),
    },
    {
      id: "eaves",
      title: textFor(lang, "Diềm mái: Diềm âm và Diềm dương", "Roof eaves: Yin and Yang edge tiles"),
      copy: textFor(lang,
        "Các viên diềm kết thúc hàng ngói, che đầu mái và hoàn thiện hoa văn mặt đứng.",
        "Edge tiles finish the roof courses, protect the eaves and complete the facade."),
    },
  ];
  return <div className="roof-construction-grid">
    {items.map((item) => <article className="product-info-card roof-construction-card" key={item.id}>
      <img
        src={item.id === "body" ? "/images/roof/than-mai-from-reference.webp" : "/images/roof/diem-mai-from-reference.webp"}
        alt={textFor(lang,
          item.id === "body" ? "Hình ảnh ngói âm dương thân mái theo ảnh tham khảo người dùng" : "Hình ảnh ngói âm dương diềm mái theo ảnh tham khảo người dùng",
          item.id === "body" ? "Yin-yang roof body tiles from owner's reference image" : "Yin-yang eaves tiles from owner's reference image")}
        width={631} height={394} loading="lazy" decoding="async"
      />
      <div className="product-info-card-copy">
        <h3>{item.title}</h3><p>{item.copy}</p>
      </div>
    </article>)}
  </div>;
}

/** A compact, accessible scale-reference diagram using the original L/M/S data. */
const sizes = [
  { key: "l", name: "Ngói âm dương cỡ L", widthTop: "200 mm", widthBottom: "195 mm", height: "100 mm" },
  { key: "m", name: "Ngói âm dương cỡ M", widthTop: "145 mm", widthBottom: "165 mm", height: "80 mm" },
  { key: "s", name: "Ngói âm dương cỡ S", widthTop: "102 mm", widthBottom: "117 mm", height: "60 mm" },
];

export function RoofTileDimensions({ lang = "vi" }: { lang?: Language }) {
  return <div className="roof-size-reference" aria-label={textFor(lang, "Sơ đồ kích thước tham khảo ngói âm dương cỡ L, M, S", "Reference dimensions of yin-yang roof tiles in sizes L, M and S")}>
    <h3>{textFor(lang, "Sơ đồ kích thước ngói âm dương", "Yin-yang roof tile size diagrams")}</h3>
    <div className="roof-size-grid">
      {sizes.map((size) => <figure className="roof-size-card" key={size.key}>
        <figcaption>{textFor(lang, size.name, `Yin-yang roof tile size ${size.key.toUpperCase()}`)}</figcaption>
        <svg viewBox="0 0 320 250" role="img" aria-label={`${textFor(lang, size.name, `Size ${size.key.toUpperCase()}`)}: ${size.widthTop}, ${size.widthBottom}, ${size.height}`}>
          <defs>
            <marker id={`roof-arrow-${size.key}`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
              <path d="M0 0 L6 3 L0 6 Z" fill="#19345f"/>
            </marker>
          </defs>
          <g fill="none" stroke="#19345f" strokeWidth="2.1" strokeLinejoin="round" strokeLinecap="round">
            <path d="M65 77 Q160 138 254 77 L233 164 Q159 206 89 164 Z"/>
            <path d="M65 77 L89 164 M254 77 L233 164" strokeWidth="1"/>
          </g>
          <g fill="none" stroke="#ac844b" strokeWidth="1.8">
            <path d="M111 133 Q159 102 209 133 Q158 167 111 133 Z"/>
            <path d="M133 133 Q159 116 184 133 Q159 149 133 133 Z"/>
          </g>
          <g fill="none" stroke="#19345f" strokeWidth="1.5" markerStart={`url(#roof-arrow-${size.key})`} markerEnd={`url(#roof-arrow-${size.key})`}>
            <path d="M60 59 L100 80"/>
            <path d="M74 219 L241 219"/>
            <path d="M271 83 L271 174"/>
          </g>
          <g fill="#19345f" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="600">
            <text x="40" y="50">{size.widthTop}</text>
            <text x="158" y="240" textAnchor="middle">{size.widthBottom}</text>
            <text x="277" y="133" fontSize="14">{size.height}</text>
          </g>
        </svg>
      </figure>)}
    </div>
    <p className="roof-size-note">{textFor(lang, "Sơ đồ không theo tỷ lệ. Kích thước và số lượng tham khảo được đối chiếu trong bảng quy cách bên dưới.", "Diagrams are not to scale. Refer to the specification table below for indicative dimensions and quantities.")}</p>
  </div>;
}

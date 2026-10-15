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
      <svg viewBox="0 0 480 290" role="img" aria-label={textFor(lang,
        "Sơ đồ minh họa vị trí ngói âm và ngói dương, không theo tỷ lệ",
        "Illustrative diagram of yin and yang roof tiles, not to scale")}>
        <defs>
          <linearGradient id={`roof-tile-glaze-${item.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#27465a"/>
            <stop offset="48%" stopColor="#698a83"/>
            <stop offset="100%" stopColor="#182f42"/>
          </linearGradient>
          <linearGradient id={`roof-tile-shadow-${item.id}`} x1="0" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#5b7d80"/>
            <stop offset="100%" stopColor="#1b2f3e"/>
          </linearGradient>
        </defs>
        <rect width="480" height="290" fill="#f0ede5"/>
        <g transform={item.id === "eaves" ? "translate(9 9) rotate(-6 240 150)" : undefined}>
          <path d="M72 105 Q151 194 238 121 Q311 193 408 101 L392 170 Q312 253 238 182 Q164 246 88 173 Z"
            fill={`url(#roof-tile-glaze-${item.id})`} stroke="#344751" strokeWidth="5"/>
          <path d="M72 105 Q145 180 238 121 Q323 186 408 101" fill="none" stroke="#9cad96" strokeWidth="5"/>
          <path d="M205 171 L205 107 Q216 54 243 57 Q276 57 283 111 L280 177 Q250 124 205 171 Z"
            fill={`url(#roof-tile-shadow-${item.id})`} stroke="#213648" strokeWidth="5"/>
          <path d="M211 165 Q243 111 274 167" fill="none" stroke="#e5e3d8" strokeWidth="9" strokeLinecap="round"/>
          <path d="M89 173 Q166 239 237 182 Q311 248 392 170" fill="none" stroke="#b6a17c" strokeWidth={item.id === "eaves" ? "10" : "4"}/>
        </g>
      </svg>
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

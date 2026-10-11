/** A kiln guardian built around Đại Long's original interlocking monogram. */
export function DaiLongMascot({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 160 160" role="img" aria-labelledby="dai-long-mascot-title">
    <title id="dai-long-mascot-title">Long Gốm — linh vật từ biểu trưng Đại Long</title>
    <defs>
      <linearGradient id="mascot-glaze" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#587c70"/><stop offset="1" stopColor="#284d4b"/></linearGradient>
      <clipPath id="mascot-medallion"><circle cx="80" cy="80" r="73" /></clipPath>
    </defs>
    <circle cx="80" cy="80" r="75" fill="#f7f1e5" stroke="#d8c8aa" strokeWidth="2" />
    <g clipPath="url(#mascot-medallion)">
      <image href="/logo-dai-long.png" x="13" y="50" width="132" height="100" preserveAspectRatio="xMidYMid meet" />
      <path d="M91 51c-5-9-4-20 3-27l10 5c3-10 12-16 22-15l1 10c10-3 20 1 24 9l-8 5c7 5 9 13 5 20l-9-2c-2 10-12 15-22 12l-2-8c-6 6-15 6-21 2l5-6-8 1Z" fill="url(#mascot-glaze)" stroke="#193b39" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m99 31-1-17 14 12m14-5 10-13 4 19" fill="#bf8055" stroke="#8f5b3d" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M116 39c5-5 13-6 18-2 4 2 6 6 6 11-7 1-12 5-16 10-6-1-11-5-15-9l-7 2c0-5 5-11 14-12Z" fill="#f7f1e5" stroke="#193b39" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="132" cy="43" r="3" fill="#47372b" /><circle cx="145" cy="45" r="1.8" fill="#193b39" />
      <path d="M145 52c-4 3-8 3-11 2m-31-24c5 0 8 2 11 6m-13 22c7 4 15 5 22 3" fill="none" stroke="#d19a67" strokeWidth="2" strokeLinecap="round" />
      <circle cx="27" cy="124" r="3" fill="#bf8055" />
    </g>
  </svg>;
}

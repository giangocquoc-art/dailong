/** Original Đại Long kiln dragon mark: a small, friendly guardian shaped by clay and glaze. */
export function DaiLongMascot({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 160 160" role="img" aria-labelledby="dai-long-mascot-title">
    <title id="dai-long-mascot-title">Rồng gốm Đại Long</title>
    <defs>
      <linearGradient id="dragon-glaze" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#527f78"/><stop offset="1" stopColor="#173e43"/></linearGradient>
      <linearGradient id="dragon-clay" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e3aa72"/><stop offset="1" stopColor="#b86c47"/></linearGradient>
    </defs>
    <circle cx="80" cy="80" r="73" fill="#f1e7d6" stroke="#d7c8af" strokeWidth="2"/>
    <path d="M33 106c-3-14 5-25 18-31-6-10-5-23 2-32l13 9c4-12 15-20 29-19l-2 14c12-3 24 2 31 12l-13 6c9 8 12 19 8 31l-13-5c-4 14-16 24-32 25l-2-13c-13 9-28 10-39 3Z" fill="url(#dragon-glaze)" stroke="#173e43" strokeWidth="3" strokeLinejoin="round"/>
    <path d="m49 44 9-18 13 15m26-2 11-18 8 24" fill="url(#dragon-clay)" stroke="#9c593d" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M61 64c10-9 26-11 38-5 8 4 12 11 13 19-11 2-20 8-27 17-9-3-17-9-24-17l-12 1c0-6 4-12 12-15Z" fill="#f1e7d6" stroke="#173e43" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M79 93c9 6 21 7 31 2 8-4 14-10 17-18 7 10 8 22 2 33-7 14-23 23-43 22-16-1-28-8-35-19 12 1 22-5 28-20Z" fill="url(#dragon-glaze)" stroke="#173e43" strokeWidth="3" strokeLinejoin="round"/>
    <circle cx="87" cy="66" r="3.8" fill="#4a3327"/><path d="M105 75c-5 3-9 3-13 1m-8-27c7 1 12 4 15 8m-38 43c8 5 16 7 24 6" fill="none" stroke="#c9895f" strokeWidth="3" strokeLinecap="round"/>
    <path d="M42 118c9 6 18 9 28 9m56-53c5-1 9-4 12-8" fill="none" stroke="#d8bc92" strokeWidth="2" strokeLinecap="round"/>
  </svg>;
}

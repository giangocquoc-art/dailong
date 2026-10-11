/** Long Gốm: a full ceramic dragon whose coiled body recalls the curved D and rising serif of the DL mark. */
export function DaiLongMascot({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 180 180" role="img" aria-labelledby="long-gom-title">
    <title id="long-gom-title">Long Gốm, rồng gốm men lam Đại Long</title>
    <defs>
      <linearGradient id="long-gom-blue" x1=".12" y1=".05" x2=".86" y2=".96">
        <stop stopColor="#355b99"/><stop offset=".58" stopColor="#1f417d"/><stop offset="1" stopColor="#173565"/>
      </linearGradient>
      <linearGradient id="long-gom-celadon" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#d9e1cf"/><stop offset="1" stopColor="#9eae91"/>
      </linearGradient>
    </defs>

    {/* The upright neck and head rise like the L serif; warm clay horns echo kiln-fired details. */}
    <path d="M101 94c11-10 16-23 10-36-5-11-2-22 8-27 10-5 21 0 25 10l19 8-17 11c-1 12-11 20-23 16-1 15 8 27 20 34-9 14-25 24-43 28l-10-25Z" fill="url(#long-gom-blue)" stroke="#173565" strokeWidth="3" strokeLinejoin="round"/>
    <path d="m116 38-3-17c9 3 14 9 15 16m12-4 9-14c4 8 4 15 1 21" fill="#bd8056" stroke="#8e593b" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M128 45c7-5 16-3 20 3 3 4 4 8 2 12-6 0-11 3-15 8-7-1-11-5-14-10l-7 1c1-7 6-12 14-14Z" fill="#f7f1e5" stroke="#173565" strokeWidth="2.5" strokeLinejoin="round"/>
    <ellipse cx="143" cy="50" rx="3.2" ry="4" fill="#e2ad73" stroke="#173565" strokeWidth="1.5"/>
    <circle cx="156" cy="56" r="1.8" fill="#173565"/>
    <path d="M153 65c-4 3-8 3-12 2m-22-25c5 0 8 2 10 5" fill="none" stroke="#d5a06d" strokeWidth="2" strokeLinecap="round"/>
    <path d="M118 72c-4 11-2 21 4 29" fill="none" stroke="#8ea2c9" strokeWidth="2" strokeLinecap="round"/>

    {/* The curled D-shaped body and inner sweep borrow the monogram's broad curve and fine serif cuts. */}
    <path d="M54 147c-23-5-36-26-31-50 5-25 28-42 53-39 26 3 43 23 39 46-3 19-19 31-37 27-15-3-23-16-18-29 4-12 17-18 28-13 9 4 13 14 9 22-2 4-5 7-10 9 12-3 20-13 20-25 1-18-14-33-33-34-20-1-37 15-38 36-2 20 12 38 33 43 13 4 27 2 38-5-13 17-35 25-56 19Z" fill="url(#long-gom-blue)" stroke="#173565" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M48 78c8-8 19-12 31-11m-38 26c7-9 16-14 27-16m31 43c-7 8-17 12-27 12" fill="none" stroke="#9db1d3" strokeWidth="2.2" strokeLinecap="round" opacity=".9"/>

    {/* Pale glazed belly, with small stamped curves inspired by the logo's interlocking strokes. */}
    <path d="M76 128c15 3 30-4 37-17 3 14 12 23 23 28-14 13-38 18-59 10-7-3-13-7-17-12 7-1 12-4 16-9Z" fill="url(#long-gom-celadon)" stroke="#173565" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M83 137c11 4 22 3 32-1m-26 10c10 3 20 2 29-2m-44-14 6-3m44 9 5 3" fill="none" stroke="#f4ecd9" strokeWidth="2" strokeLinecap="round"/>

    {/* Curled tail finishes the silhouette like the sweeping foot of the original serif mark. */}
    <path d="M43 138c-11 10-23 13-28 8-4-4 0-11 7-13 6-2 12 1 13 6m-12-4c-1 4 1 6 5 6" fill="none" stroke="#1f417d" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 138c-2-6-1-11 3-15 4 5 5 9 3 14m-2-14-5-6" fill="none" stroke="#bd8056" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}

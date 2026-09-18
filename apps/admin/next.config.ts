import type { NextConfig } from "next";

const upstream = process.env.UPSTREAM_ADMIN_ORIGIN || "https://gomsudailong.vn";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/api/admin/:path*", destination: `${upstream}/api/admin/:path*` },
        { source: "/_next/:path*", destination: `${upstream}/_next/:path*` },
        { source: "/fonts/:path*", destination: `${upstream}/fonts/:path*` },
        { source: "/images/:path*", destination: `${upstream}/images/:path*` },
        { source: "/logo-dai-long.png", destination: `${upstream}/logo-dai-long.png` },
        { source: "/admin", destination: `${upstream}/admin` },
        { source: "/admin/:path*", destination: `${upstream}/admin/:path*` },
        { source: "/quan-tri-dai-long", destination: `${upstream}/quan-tri-dai-long` },
        { source: "/quan-tri-dai-long/:path*", destination: `${upstream}/quan-tri-dai-long/:path*` },
        { source: "/media/:path*", destination: `${upstream}/media/:path*` },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;

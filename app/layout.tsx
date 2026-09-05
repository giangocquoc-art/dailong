import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Gốm sứ Đại Long | Gốm kiến trúc Bát Tràng",
    template: "%s | Gốm sứ Đại Long",
  },
  description:
    "Rồng phượng, gạch thông gió, đèn vườn, lan can, ngói và gốm kiến trúc chế tác tại Bát Tràng.",
  metadataBase: new URL("https://gomsudailong.com"),
  icons: {
    icon: "/logo-dai-long.png",
    shortcut: "/logo-dai-long.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preload" href="/fonts/BeVietnamPro-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/BeVietnamPro-SemiBold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ksnve-future-mobility.shyeone-kim.chatgpt.site"),
  title: "미래모빌리티 부문위원회 | 한국소음진동공학회",
  description: "한국소음진동공학회 미래모빌리티 부문위원회입니다.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "미래모빌리티 부문위원회",
    description: "Connecting Technology, People and Mobility",
    images: [{ url: "/images/FutureMobility_Picture_wihtext.png", width: 1683, height: 935 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "미래모빌리티 부문위원회",
    description: "Connecting Technology, People and Mobility",
    images: ["/images/FutureMobility_Picture_wihtext.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}

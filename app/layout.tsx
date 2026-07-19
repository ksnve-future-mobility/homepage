import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ksnve-future-mobility.shyeone-kim.chatgpt.site"),
  title: "미래모빌리티 부문위원회 | 한국소음진동공학회",
  description: "미래모빌리티의 소음·진동 기술을 연구하고 산학연을 연결하는 한국소음진동공학회 미래모빌리티 부문위원회입니다.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "미래모빌리티 부문위원회",
    description: "Connecting Technology, People and Mobility",
    images: [{ url: "/images/FutureMobility_Picture.png", width: 1732, height: 910 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "미래모빌리티 부문위원회",
    description: "이동의 미래를 더 조용하고, 더 편안하게.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}

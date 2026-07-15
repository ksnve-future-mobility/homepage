import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "미래모빌리티 부문위원회 | 한국소음진동공학회",
  description: "미래모빌리티의 소음·진동 기술을 연구하고 산학연을 연결하는 한국소음진동공학회 미래모빌리티 부문위원회입니다.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}

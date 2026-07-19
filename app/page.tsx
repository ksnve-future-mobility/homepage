import Link from "next/link";
import Image from "next/image";
import { getNotices } from "@/lib/notices";
import HomeHeroCarousel from "@/components/HomeHeroCarousel";

const menus = [
  { title: "부문회 및 임원진 소개", english: "DIVISION & COMMITTEE", number: "01", href: "/about" },
  { title: "연구회", english: "STUDY GROUP", number: "02", href: "/study-groups" },
  { title: "학술대회", english: "ACADEMIC EVENTS", number: "03", href: "/events" },
  { title: "학술교류회 및 세미나", english: "NETWORKING & SEMINAR", number: "04", href: "/networking-seminars" },
  { title: "워크숍 및 친선교류/간담회", english: "WORKSHOP & MEETING", number: "05", href: "/workshops" },
  { title: "미래모빌리티 토크", english: "FUTURE MOBILITY TALK", number: "06", href: "/future-mobility-talk" },
];

const heroSlides = [
  { src: "/images/FutureMobility_Picture.png", alt: "미래 모빌리티 이미지", showText: true },
  { src: "/images/slide-2.jpeg", alt: "세미나 단체사진" },
  { src: "/images/slide-3.jpg", alt: "2025 추계 소음진동학술대회 자동차-가전 교류 특별세션"},
  { src: "/images/slide-4.jpeg", alt: "ICSV32"},
];

export default async function Home() {
  const notices = await getNotices(5);

  return (
    <main className="home-shell">
      <header className="top-header">
        <div className="brand">
          <a className="society-logo-link" href="https://www.ksnve.or.kr" target="_blank" rel="noreferrer" aria-label="한국소음진동공학회 홈페이지 열기">
            <Image src="/images/ksnve_logo_wide.png" alt="한국소음진동공학회" width={2918} height={571} />
          </a>
          <span className="brand-divider" aria-hidden="true" />
          <Image className="division-title" src="/images/division-logo.png" alt="미래모빌리티 부문회" width={1644} height={524} />
        </div>
      </header>

      <section className="main-grid">
        <nav className="menu-grid" aria-label="주요 메뉴">
          {menus.map((menu) => (
            <Link className="menu-card" href={menu.href || "#"} key={menu.title}>
              <span className="menu-number">{menu.number}</span>
              <span className="menu-title"><b>{menu.title}</b><small>{menu.english}</small></span>
            </Link>
          ))}
        </nav>

        <div className="right-column">
          <HomeHeroCarousel slides={heroSlides} />

          <section className="notice-panel" aria-labelledby="notice-title">
            <div className="notice-heading">
              <div><span>NOTICE</span><h2 id="notice-title">공지사항</h2></div>
              <Link href="/notices" aria-label="공지사항 전체 보기">전체보기 <b>＋</b></Link>
            </div>
            <ul>
              {notices.map((notice) => (
                <li key={notice.id}>
                  <Link href={`/notices/${notice.id}`}>{notice.title}</Link>
                  <time>{notice.date}</time>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <footer className="mini-footer">
        <p>© 2026 KSNVE FUTURE MOBILITY DIVISION</p>
        <span>한국소음진동공학회 미래모빌리티 부문위원회</span>
      </footer>
    </main>
  );
}

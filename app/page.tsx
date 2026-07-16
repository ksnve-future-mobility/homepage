import { getNotices } from "@/lib/notices";
import HomeHeroCarousel from "@/components/HomeHeroCarousel";

const menus = [
  { title: "부문회 및 임원진 소개", english: "DIVISION & COMMITTEE", number: "01", href: "/about" },
  { title: "연구회", english: "SUBCOMMITTEES", number: "02" },
  { title: "학술대회", english: "ACADEMIC EVENTS", number: "03", href: "/events" },
  { title: "학술교류회 및 세미나", english: "NETWORKING & SEMINAR", number: "04" },
  { title: "워크숍 및 간담회", english: "WORKSHOP & MEETING", number: "05" },
  { title: "미래모빌리티 토크", english: "FUTURE MOBILITY TALK", number: "06" },
];

const heroSlides = [
  { src: "/images/FutureMobility_Picture.png", alt: "미래 모빌리티 이미지" },
  { src: "/images/slide-2.jpg", alt: "세미나 단체사진" },
];

export default async function Home() {
  const notices = await getNotices(5);

  return (
    <main className="home-shell">
      <header className="top-header">
        <div className="brand">
          <a className="society-logo-link" href="https://www.ksnve.or.kr" target="_blank" rel="noreferrer" aria-label="한국소음진동공학회 홈페이지 열기">
            <img src="/images/ksnve_logo_wide.png" alt="한국소음진동공학회" />
          </a>
          <span className="brand-divider" aria-hidden="true" />
          <b className="division-title">미래모빌리티 부문회</b>
        </div>
        <div className="header-side">
          <a className="home-button" href="#" aria-current="page">Home</a>
        </div>
      </header>

      <section className="main-grid">
        <nav className="menu-grid" aria-label="주요 메뉴">
          {menus.map((menu) => (
            <a className="menu-card" href={menu.href || "#"} key={menu.title}>
              <span className="menu-number">{menu.number}</span>
              <span className="menu-title"><b>{menu.title}</b><small>{menu.english}</small></span>
            </a>
          ))}
        </nav>

        <div className="right-column">
          <HomeHeroCarousel slides={heroSlides} />

          <section className="notice-panel" aria-labelledby="notice-title">
            <div className="notice-heading">
              <div><span>NOTICE</span><h2 id="notice-title">공지사항</h2></div>
              <a href="/notices" aria-label="공지사항 전체 보기">전체보기 <b>＋</b></a>
            </div>
            <ul>
              {notices.map((notice) => (
                <li key={notice.id}>
                  <span className="notice-tag">{notice.tag}</span>
                  <a href={notice.link || `/notices/${notice.id}`}>{notice.title}</a>
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

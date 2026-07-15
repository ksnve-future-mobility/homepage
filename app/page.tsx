import { getNotices } from "@/lib/notices";

const menus = [
  { title: "부문회 및 임원진 소개", english: "DIVISION & COMMITTEE", number: "01", href: "/about" },
  { title: "공지사항", english: "NOTICE", number: "02", href: "/notices", accent: true },
  { title: "소위원회", english: "SUBCOMMITTEES", number: "03" },
  { title: "학술대회 및 외부행사", english: "ACADEMIC & EXTERNAL EVENTS", number: "04" },
  { title: "교류회 및 세미나", english: "NETWORKING & SEMINAR", number: "05" },
  { title: "친목회 및 간담회", english: "MEMBER GATHERING", number: "06" },
];

export default async function Home() {
  const notices = await getNotices(5);

  return (
    <main className="home-shell">
      <header className="top-header">
        <div className="brand">
          <a className="society-logo-link" href="https://www.ksnve.or.kr" target="_blank" rel="noreferrer" aria-label="한국소음진동공학회 홈페이지 열기">
            <img src="/images/ksnve_logo.png" alt="한국소음진동공학회" />
          </a>
          <span className="brand-divider" aria-hidden="true" />
          <b className="division-title">미래모빌리티 부문회</b>
        </div>
        <div className="header-side">
          <a className="home-button" href="#" aria-current="page"><span className="home-icon" aria-hidden="true">⌂</span> Home</a>
        </div>
      </header>

      <section className="main-grid">
        <nav className="menu-grid" aria-label="주요 메뉴">
          {menus.map((menu) => (
            <a className={`menu-card ${menu.accent ? "active" : ""}`} href={menu.href || "#"} key={menu.title}>
              <span className="menu-number">{menu.number}</span>
              <span className="menu-title"><b>{menu.title}</b><small>{menu.english}</small></span>
              <span className="menu-arrow" aria-hidden="true">↗</span>
              <span className="menu-lines" aria-hidden="true"><i /><i /><i /></span>
            </a>
          ))}
        </nav>

        <div className="right-column">
          <section className="visual-panel" aria-labelledby="hero-title">
            <div className="visual-grid" aria-hidden="true" />
            <div className="visual-orbit orbit-a" aria-hidden="true" />
            <div className="visual-orbit orbit-b" aria-hidden="true" />
            <div className="visual-car" aria-hidden="true"><i /><i /><span /><span /></div>
            <div className="visual-copy">
              <p><span /> FUTURE MOBILITY DIVISION</p>
              <h1 id="hero-title">이동의 미래를<br /><em>더 조용하고</em>,<br />더 편안하게.</h1>
              <small>Noise · Vibration · Mobility</small>
            </div>
            <div className="visual-index"><b>01</b><span>—</span><small>03</small></div>
          </section>

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

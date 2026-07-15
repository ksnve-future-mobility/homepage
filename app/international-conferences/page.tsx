const internationalConferences = [
  {
    year: "2026",
    title: "The 32nd International Congress on Sound and Vibration (ICSV32)",
    period: "2026.07.05 - 07.10",
    venue: "Istanbul, Türkiye",
    session: "Future Mobility Acoustics 세션 기획 및 운영",
    latest: true,
    papers: [
      {
        authors: "Seonghyeon Kim, Jaesik Yang, Eunju Jeong, Cheong-Un Kim, Chang-Hwan Im, and M. Ercan Altinsoy",
        title: "EEG feasibility for in-vehicle acoustic comfort assessment: A real driving study",
      },
    ],
  },
];

const tabs = [
  { label: "소음진동학술대회", href: "/events" },
  { label: "국제 학술대회", href: "/international-conferences", active: true },
];

export const metadata = {
  title: "국제 학술대회 | 미래모빌리티 부문회",
};

export default function InternationalConferencesPage() {
  return (
    <main className="sub-shell">
      <header className="sub-header">
        <a className="sub-logo" href="/" aria-label="홈으로 이동">
          <img src="/images/ksnve_logo.png" alt="한국소음진동공학회" />
          <span>미래모빌리티 부문회</span>
        </a>
        <a className="home-button" href="/">Home</a>
      </header>

      <section className="board-hero events-hero">
        <p>ACADEMIC & EXTERNAL EVENTS</p>
        <h1>학술대회 및 국제 학술대회</h1>
        <span>미래모빌리티 소음·진동·음향 분야의 학술대회와 국제 학술대회를 안내합니다.</span>
      </section>

      <nav className="event-tabs" aria-label="행사 구분">
        {tabs.map((tab) => (
          <a className={tab.active ? "active" : ""} href={tab.href} key={tab.href}>{tab.label}</a>
        ))}
      </nav>

      <section className="event-section" id="international-conferences" aria-labelledby="international-conferences-title">
        <div className="event-section-head">
          <span>EXTERNAL CONFERENCE</span>
          <h2 id="international-conferences-title">국제 학술대회</h2>
          <p>미래모빌리티 소음·진동·음향 분야와 연계된 국제학술대회를 안내합니다.</p>
        </div>

        <div className="event-list">
          {internationalConferences.map((event) => (
            <article className="event-card" key={`${event.year}-${event.title}`}>
              <div className="event-year">
                <strong>{event.year}</strong>
                <span>{event.latest ? "Latest" : "Archive"}</span>
              </div>
              <div className="event-info">
                <h3>{event.title}</h3>
                <dl>
                  <div><dt>기간</dt><dd>{event.period || "추후 안내"}</dd></div>
                  <div><dt>장소</dt><dd>{event.venue || "추후 안내"}</dd></div>
                  <div><dt>참여현황</dt><dd>{event.session || "추후 안내"}</dd></div>
                </dl>
                {event.papers.length > 0 ? (
                  <section className="paper-list" aria-label={`${event.title} 발표논문 리스트`}>
                    <h4>발표논문 리스트</h4>
                    <div className="paper-table">
                      <div className="paper-row paper-head">
                        <span>저자</span>
                        <span>제목</span>
                      </div>
                      {event.papers.map((paper) => (
                        <div className="paper-row" key={paper.title}>
                          <span>{paper.authors}</span>
                          <span>{paper.title}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

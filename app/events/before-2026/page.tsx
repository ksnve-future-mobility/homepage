import { AcademicEvent, getAcademicEventBadge, getBefore2026AcademicEvents } from "@/lib/events";

export const metadata = {
  title: "2026 이전 활동 | 미래모빌리티 부문회",
};

function EventArchive({ events }: { events: AcademicEvent[] }) {
  return (
    <section className="event-section event-section-simple" aria-label="2026 이전 학술대회 목록">
      {events.length > 0 ? (
        <div className="event-list">
          {events.map((event) => {
            const badge = getAcademicEventBadge(event);

            return (
              <article className="event-card" key={`${event.year}-${event.title}`}>
                <div className="event-year">
                  <strong>{event.year}</strong>
                  <span className={`event-badge event-badge-${badge.toLowerCase()}`}>{badge}</span>
                </div>
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <dl>
                    <div><dt>기간</dt><dd>{event.period || "추후 안내"}</dd></div>
                    <div><dt>장소</dt><dd>{event.venue || "추후 안내"}</dd></div>
                    <div><dt>참여현황</dt><dd>{event.session || "추후 안내"}</dd></div>
                  </dl>
                </div>
                <a className="event-view-link" href={`/events/${event.slug}`}>페이지 보기</a>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="empty-message">2026 이전 활동 자료를 준비 중입니다.</p>
      )}
    </section>
  );
}

export default async function Before2026EventsPage() {
  const academicEvents = await getBefore2026AcademicEvents();

  return (
    <main className="sub-shell">
      <header className="sub-header">
        <a className="sub-logo" href="/" aria-label="홈으로 이동">
          <img className="sub-society-logo" src="/images/ksnve_logo_wide.png" alt="한국소음진동공학회" />
          <img className="sub-division-logo" src="/images/division-logo.png" alt="미래모빌리티 부문회" />
        </a>
        <a className="home-button" href="/">Home</a>
      </header>

      <section className="board-hero events-hero">
        <p>BEFORE 2026 ARCHIVE</p>
        <div className="hero-title-row">
          <h1>2026 이전 활동</h1>
          <a className="hero-archive-link" href="/events">학술대회 목록</a>
        </div>
        <span>미래모빌리티 부문회 설립 전 관련 학술대회 및 교류 활동을 정리합니다.</span>
      </section>

      <EventArchive events={academicEvents} />
    </main>
  );
}

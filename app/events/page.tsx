import { AcademicEvent, getAcademicEventBadge, getAcademicEvents } from "@/lib/events";

export const metadata = {
  title: "소음진동 학술대회 | 미래모빌리티 부문회",
};

function EventArchive({
  id,
  events,
}: {
  id: string;
  events: AcademicEvent[];
}) {
  return (
    <section className="event-section event-section-simple" id={id} aria-label="학술대회 목록">
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
    </section>
  );
}

export default async function EventsPage() {
  const academicEvents = await getAcademicEvents();

  return (
    <main className="sub-shell">
      <header className="sub-header">
        <a className="sub-logo" href="/" aria-label="홈으로 이동">
          <img src="/images/ksnve_logo_wide.png" alt="한국소음진동공학회" />
          <span>미래모빌리티 부문회</span>
        </a>
        <a className="home-button" href="/">Home</a>
      </header>

      <section className="board-hero events-hero">
        <p>ANNUAL KSNVE CONFERENCE AND INTERNATIONAL CONFERENCE</p>
        <h1>학술대회</h1>
        <span>한국소음진동공학회 학술대회와 국제 학술대회 참여 현황입니다.</span>
      </section>

      <EventArchive
        id="academic-events"
        events={academicEvents}
      />
    </main>
  );
}

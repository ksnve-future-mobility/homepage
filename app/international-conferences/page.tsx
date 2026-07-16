import { AcademicEvent, getInternationalAcademicEvents } from "@/lib/events";

export const metadata = {
  title: "국제학술대회 | 미래모빌리티 부문회",
};

function EventArchive({
  id,
  events,
  detailLabel = "참여현황",
}: {
  id: string;
  events: AcademicEvent[];
  detailLabel?: string;
}) {
  return (
    <section className="event-section event-section-simple" id={id} aria-label="국제학술대회 목록">
      <div className="event-list">
        {events.map((event) => (
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
                <div><dt>{detailLabel}</dt><dd>{event.session || "추후 안내"}</dd></div>
              </dl>
            </div>
            <a className="event-view-link" href={`/events/${event.slug}`}>페이지 보기</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default async function InternationalConferencesPage() {
  const internationalEvents = await getInternationalAcademicEvents();

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
        <p>INTERNATIONAL CONFERENCE</p>
        <h1>국제학술대회</h1>
        <span>미래모빌리티 소음·진동·음향 분야와 연계된 국제학술대회 정보를 안내합니다.</span>
      </section>

      <nav className="event-tabs" aria-label="학술대회 구분">
        <a href="/events">소음진동 학술대회</a>
        <a className="active" href="/international-conferences">국제학술대회</a>
      </nav>

      <EventArchive
        id="international-events"
        events={internationalEvents}
      />
    </main>
  );
}

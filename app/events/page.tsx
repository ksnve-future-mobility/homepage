const academicEvents = [
  {
    year: "2026",
    title: "2026년 한국소음진동공학회 춘계소음진동학술대회",
    period: "",
    venue: "",
    session: "",
    latest: true,
  },
];

export const metadata = {
  title: "소음진동학술대회 | 미래모빌리티 부문회",
};

function EventArchive({
  id,
  eyebrow,
  title,
  description,
  events,
  detailLabel = "기획세션",
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  events: typeof academicEvents;
  detailLabel?: string;
}) {
  return (
    <section className="event-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="event-section-head">
        <span>{eyebrow}</span>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{description}</p>
      </div>

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
          </article>
        ))}
      </div>
    </section>
  );
}

export default function EventsPage() {
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
        <p>ANNUAL SPRING AND FALL CONFERENCE</p>
        <h1>소음진동학술대회</h1>
        <span>한국소음진동공학회 학술대회와 미래모빌리티 부문회 기획세션 정보를 안내합니다.</span>
      </section>

      <EventArchive
        id="academic-events"
        eyebrow="CONFERENCE"
        title="소음진동학술대회"
        description="한국소음진동공학회 학술대회와 미래모빌리티 부문회 기획세션 정보를 확인할 수 있습니다."
        events={academicEvents}
      />
    </main>
  );
}

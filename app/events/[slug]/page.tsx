import { notFound } from "next/navigation";
import { getAcademicEvent, getAcademicEvents } from "@/lib/events";

type EventDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const events = await getAcademicEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getAcademicEvent(slug);

  return {
    title: event ? `${event.title} | 미래모빌리티 부문회` : "학술대회 | 미래모빌리티 부문회",
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getAcademicEvent(slug);

  if (!event) {
    notFound();
  }

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
        <p>ANNUAL SPRING AND FALL CONFERENCE</p>
        <h1>{event.title}</h1>
        <span>미래모빌리티 부문회 기획세션 및 학술대회 정보를 확인할 수 있습니다.</span>
      </section>

      <section className="event-detail-section" aria-label="학술대회 상세 정보">
        <aside className="event-detail-year">
          <strong>{event.year}</strong>
          <span>{event.latest ? "Latest" : "Archive"}</span>
        </aside>
        <div className="event-detail-card">
          <h2>행사 개요</h2>
          <dl>
            <div><dt>기간</dt><dd>{event.period || "추후 안내"}</dd></div>
            <div><dt>장소</dt><dd>{event.venue || "추후 안내"}</dd></div>
            <div><dt>기획세션</dt><dd>{event.session || "추후 안내"}</dd></div>
          </dl>
          <div className="event-detail-note">
            <h3>페이지 정보</h3>
            <p>세부 프로그램, 발표자료, 사진 및 관련 링크는 확정 후 이 페이지에 추가할 수 있습니다.</p>
          </div>
          <a className="event-back-link" href="/events">목록으로</a>
        </div>
      </section>
    </main>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { getAcademicEvent, getAcademicEventBadge, getAcademicEventDetail, getAcademicEvents } from "@/lib/events";
import HomeHeroCarousel from "@/components/HomeHeroCarousel";
import SubHeader from "@/components/SubHeader";

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
  const eventDetail = await getAcademicEventDetail(slug);

  if (!eventDetail) {
    notFound();
  }

  const { event, details, programs, images } = eventDetail;
  const isInternational = event.category === "international";
  const eventBadge = getAcademicEventBadge(event);
  const detailParagraphs = event.detailText
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <main className="sub-shell">
      <SubHeader />

      <section className="board-hero events-hero">
        <p>{isInternational ? "INTERNATIONAL CONFERENCE" : "ANNUAL SPRING AND FALL CONFERENCE"}</p>
        <h1>{event.title}</h1>
        <span>
          {isInternational
            ? "미래모빌리티 부문회가 참여한 국제학술대회 정보입니다"
            : "미래모빌리티 부문회 기획세션 및 학술대회 정보입니다"}
        </span>
      </section>

      <section className="event-detail-section" aria-label="학술대회 상세 정보">
        <aside className="event-detail-year">
          <strong>{event.year}</strong>
          <span className={`event-badge event-badge-${eventBadge.toLowerCase()}`}>{eventBadge}</span>
        </aside>
        <div className="event-detail-card">
          <div className="event-detail-top">
            <div className="event-detail-info">
              <h2>행사 개요</h2>
              <dl>
                <div><dt>기간</dt><dd>{event.period || "추후 안내"}</dd></div>
                <div><dt>장소</dt><dd>{event.venue || "추후 안내"}</dd></div>
                <div><dt>참여현황</dt><dd>{event.session || "추후 안내"}</dd></div>
              </dl>
              <div className="event-detail-note">
                {details.length > 0 ? (
                  <div className="event-detail-body">
                    {details.map((detail) => (
                      <section className={`event-detail-copy event-detail-copy-${detail.type || "paragraph"}`} key={`${detail.type}-${detail.order}-${detail.title}`}>
                        {detail.title ? <h4>{detail.title}</h4> : null}
                        <p>{detail.content}</p>
                      </section>
                    ))}
                  </div>
                ) : detailParagraphs.length > 0 ? (
                  <div className="event-detail-body">
                    {detailParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p>세부 프로그램 준비 중입니다.</p>
                )}
              </div>
            </div>
            {event.imageUrl || images.length > 0 ? (
              <div className="event-detail-media">
                {event.imageUrl ? (
                  <img className="event-detail-image" src={event.imageUrl} alt={`${event.title} 관련 이미지`} />
                ) : null}
                {images.length > 0 ? (
                  <section className="event-gallery-section" aria-label="행사 사진">
                    <HomeHeroCarousel
                      slides={images.map((image) => ({
                        src: image.imageUrl,
                        alt: image.caption || `${event.title} 사진`,
                      }))}
                    />
                  </section>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="event-detail-extra">
            {programs.length > 0 ? (
              <section className="event-program-section" aria-label="세부 프로그램">
                <h3>세부 프로그램</h3>
                <div className="event-program-list">
                  {programs.map((program) => (
                    <article className="event-program-card" key={`${program.sessionNo}-${program.sessionTitle}`}>
                      <header>
                        <div>
                          <b>{program.sessionTitle}</b>
                          <span>{[program.date, program.time, program.room].filter(Boolean).join(" · ")}</span>
                        </div>
                        {program.chair ? <p>좌장: {program.chair}</p> : null}
                      </header>
                      {program.items.length > 0 ? (
                        <ul>
                          {program.items.map((item) => (
                            <li key={`${program.sessionNo}-${item.order}-${item.title}`}>
                              <time>{item.time}</time>
                              <div>
                                <strong>
                                  {item.label ? <em>{item.label}</em> : null}
                                  {item.title}
                                </strong>
                                {item.speakers ? <span>{item.speakers}</span> : null}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
            {event.linkUrl ? (
              <a className="event-detail-link" href={event.linkUrl} target="_blank" rel="noreferrer">
                {event.linkText || "관련 링크 보기"}
              </a>
            ) : null}
          </div>
          <Link className="event-back-link" href={event.before2026 ? "/events/before-2026" : "/events"}>목록으로</Link>
        </div>
      </section>
    </main>
  );
}

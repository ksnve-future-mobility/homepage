import { notFound } from "next/navigation";
import Link from "next/link";
import HomeHeroCarousel from "@/components/HomeHeroCarousel";
import SubHeader from "@/components/SubHeader";
import { getSeminarDetail, getSeminars } from "@/lib/events";
import { toProxiedImageSrc } from "@/lib/imageProxy";

type SeminarDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const seminars = await getSeminars();
  return seminars.map((seminar) => ({ slug: seminar.slug }));
}

export async function generateMetadata({ params }: SeminarDetailPageProps) {
  const { slug } = await params;
  const seminarDetail = await getSeminarDetail(slug);

  if (!seminarDetail) {
    return { title: "학술교류회 및 세미나 | 미래모빌리티 부문회" };
  }

  const { seminar, images } = seminarDetail;
  const description =
    seminar.description.split(/\n+/)[0]?.slice(0, 100) ||
    [seminar.date, seminar.venue].filter(Boolean).join(" · ") ||
    "미래모빌리티 부문회 학술교류회 및 세미나";
  const coverImageUrl = images[0]?.imageUrl;
  const image = coverImageUrl
    ? { url: toProxiedImageSrc(coverImageUrl) }
    : { url: "/images/FutureMobility_Picture_wihtext.png", width: 1683, height: 935 };

  return {
    title: `${seminar.title} | 미래모빌리티 부문회`,
    description,
    openGraph: {
      title: seminar.title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: seminar.title,
      description,
      images: [image.url],
    },
  };
}

export default async function SeminarDetailPage({ params }: SeminarDetailPageProps) {
  const { slug } = await params;
  const seminarDetail = await getSeminarDetail(slug);

  if (!seminarDetail) {
    notFound();
  }

  const { seminar, details, programs, images } = seminarDetail;
  const speaker = [seminar.speaker, seminar.affiliation].filter(Boolean).join(" · ");

  return (
    <main className="sub-shell">
      <SubHeader />

      <section className="board-hero networking-hero">
        <p>NETWORKING &amp; SEMINAR</p>
        <h1>{seminar.title}</h1>
        <span>{[seminar.date, seminar.venue].filter(Boolean).join(" · ")}</span>
      </section>

      <section className="event-detail-section" aria-label="세미나 상세 정보">
        <aside className="event-detail-year">
          <strong>{seminar.year}</strong>
          <span className="event-badge event-badge-archive">{seminar.category}</span>
        </aside>
        <div className="event-detail-card">
          <div className={`event-detail-top${images.length > 0 ? "" : " event-detail-top-single"}`}>
            <div className="event-detail-info">
              <h2>행사 개요</h2>
              <dl>
                <div><dt>일시</dt><dd>{seminar.date || "추후 안내"}</dd></div>
                <div><dt>장소</dt><dd>{seminar.venue || "추후 안내"}</dd></div>
                {speaker ? <div><dt>연사</dt><dd>{speaker}</dd></div> : null}
                {seminar.host ? <div><dt>주최</dt><dd>{seminar.host}</dd></div> : null}
                {seminar.organizer ? <div><dt>주관</dt><dd>{seminar.organizer}</dd></div> : null}
              </dl>
              {seminar.description || details.length > 0 ? (
                <div className="event-detail-note">
                  <div className="event-detail-body">
                    {seminar.description
                      ? seminar.description
                          .split(/\n+/)
                          .map((paragraph) => paragraph.trim())
                          .filter(Boolean)
                          .map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                      : null}
                    {details.map((detail) => (
                      <section className="event-detail-copy" key={`${detail.order}-${detail.title}`}>
                        {detail.title ? <h4>{detail.title}</h4> : null}
                        <p>{detail.content}</p>
                      </section>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            {images.length > 0 ? (
              <div className="event-detail-media">
                <section className="event-gallery-section" aria-label="행사 사진">
                  <HomeHeroCarousel
                    slides={images.map((image) => ({
                      src: toProxiedImageSrc(image.imageUrl),
                      alt: image.alt || image.caption || `${seminar.title} 사진`,
                    }))}
                  />
                </section>
              </div>
            ) : null}
          </div>

          <div className="event-detail-extra">
            {programs.length > 0 ? (
              <section className="event-program-section" aria-label="세부 프로그램">
                <h3>프로그램</h3>
                <div className="event-program-list">
                  <article className="event-program-card">
                    <ul>
                      {programs.map((item) => (
                        <li key={`${item.order}-${item.title}`}>
                          <time>{item.time}</time>
                          <div>
                            <strong>{item.title}</strong>
                            {item.speakers ? <span>{item.speakers}</span> : null}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              </section>
            ) : null}

            {seminar.registerUrl ? (
              <a className="event-detail-link" href={seminar.registerUrl} target="_blank" rel="noreferrer">
                {seminar.registerText || "참가 신청하기"}
              </a>
            ) : null}
          </div>

          <Link className="event-back-link" href="/networking-seminars">목록으로</Link>
        </div>
      </section>
    </main>
  );
}

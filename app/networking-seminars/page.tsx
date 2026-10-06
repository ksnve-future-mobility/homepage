import Link from "next/link";
import SubHeader from "@/components/SubHeader";
import { getSeminars, Seminar } from "@/lib/events";
import { toProxiedImageSrc } from "@/lib/imageProxy";

export const metadata = {
  title: "학술교류회 및 세미나 | 미래모빌리티 부문회",
};

function SeminarCard({ seminar }: { seminar: Seminar }) {
  const speaker = [seminar.speaker, seminar.affiliation].filter(Boolean).join(" · ");

  return (
    <article className="workshop-card seminar-card">
      <div className="workshop-card-info">
        <div className="workshop-year">
          <strong>{seminar.year}</strong>
          <span>{seminar.category}</span>
        </div>
        <h3>{seminar.title}</h3>
        <dl>
          {seminar.date ? <div><dt>날짜</dt><dd>{seminar.date}</dd></div> : null}
          {seminar.venue ? <div><dt>장소</dt><dd>{seminar.venue}</dd></div> : null}
          {speaker ? <div><dt>연사</dt><dd>{speaker}</dd></div> : null}
          {seminar.host ? <div><dt>주최</dt><dd>{seminar.host}</dd></div> : null}
          {seminar.organizer ? <div><dt>주관</dt><dd>{seminar.organizer}</dd></div> : null}
        </dl>
        <Link className="workshop-card-link" href={`/networking-seminars/${seminar.slug}`}>
          자세히 보기
        </Link>
      </div>
      {/* 목록에는 리플렛만 싣고, 행사 사진은 상세 페이지에서 보여준다. */}
      <div className="workshop-card-visual">
        {seminar.leafletUrl ? (
          <a
            className="workshop-card-leaflet"
            href={seminar.leafletUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${seminar.title} 리플렛 전체 보기`}
          >
            <img src={toProxiedImageSrc(seminar.leafletUrl)} alt={`${seminar.title} 리플렛`} />
            <span>리플렛 보기</span>
          </a>
        ) : (
          <div className="workshop-image-placeholder">
            <span>리플렛 준비 중입니다.</span>
          </div>
        )}
      </div>
    </article>
  );
}

function groupByCategory(seminars: Seminar[]) {
  const grouped = new Map<string, Seminar[]>();

  seminars.forEach((seminar) => {
    const group = grouped.get(seminar.category) || [];
    group.push(seminar);
    grouped.set(seminar.category, group);
  });

  return Array.from(grouped.entries());
}

export default async function NetworkingSeminarsPage() {
  const seminars = await getSeminars();
  const groupedSeminars = groupByCategory(seminars);

  return (
    <main className="sub-shell">
      <SubHeader />

      <section className="board-hero networking-hero">
        <p>NETWORKING & SEMINAR</p>
        <h1>학술교류회 및 세미나</h1>
        <span>미래모빌리티 부문회 주관 학술교류회와 세미나 정보를 전합니다.</span>
      </section>

      <section className="workshop-section" aria-label="학술교류회 및 세미나 목록">
        {groupedSeminars.length > 0 ? (
          groupedSeminars.map(([category, items]) => (
            <section className="workshop-category" key={category} aria-label={category}>
              <div className="workshop-list">
                {items.map((seminar) => (
                  <SeminarCard seminar={seminar} key={seminar.slug} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <p className="board-empty">등록된 학술교류회 및 세미나가 없습니다.</p>
        )}
      </section>
    </main>
  );
}

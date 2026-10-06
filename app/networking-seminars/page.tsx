import Link from "next/link";
import HomeHeroCarousel from "@/components/HomeHeroCarousel";
import SubHeader from "@/components/SubHeader";
import { getSeminarsWithImages, SeminarWithImages } from "@/lib/events";
import { toProxiedImageSrc } from "@/lib/imageProxy";

export const metadata = {
  title: "학술교류회 및 세미나 | 미래모빌리티 부문회",
};

function SeminarCard({ seminar }: { seminar: SeminarWithImages }) {
  const slides = seminar.images.map((image) => ({
    src: toProxiedImageSrc(image.imageUrl),
    alt: image.alt || image.caption || `${seminar.title} 사진`,
  }));
  const speaker = [seminar.speaker, seminar.affiliation].filter(Boolean).join(" · ");

  return (
    <article className="workshop-card">
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
          {seminar.description ? <div><dt>내용</dt><dd className="workshop-card-summary">{seminar.description}</dd></div> : null}
        </dl>
        <Link className="workshop-card-link" href={`/networking-seminars/${seminar.slug}`}>
          자세히 보기
        </Link>
      </div>
      <div className="workshop-card-visual">
        {slides.length > 0 ? (
          <HomeHeroCarousel slides={slides} />
        ) : (
          <div className="workshop-image-placeholder">
            <span>사진 준비 중입니다.</span>
          </div>
        )}
      </div>
    </article>
  );
}

function groupByCategory(seminars: SeminarWithImages[]) {
  const grouped = new Map<string, SeminarWithImages[]>();

  seminars.forEach((seminar) => {
    const group = grouped.get(seminar.category) || [];
    group.push(seminar);
    grouped.set(seminar.category, group);
  });

  return Array.from(grouped.entries());
}

export default async function NetworkingSeminarsPage() {
  const seminars = await getSeminarsWithImages();
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

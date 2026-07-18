import HomeHeroCarousel from "@/components/HomeHeroCarousel";
import { getWorkshopActivitiesWithImages, WorkshopActivityWithImages } from "@/lib/events";

export const metadata = {
  title: "워크숍 및 친선교류/간담회 | 미래모빌리티 부문회",
};

function WorkshopActivityCard({ activity }: { activity: WorkshopActivityWithImages }) {
  const slides = activity.images.map((image) => ({
    src: image.imageUrl,
    alt: image.alt || image.caption || `${activity.title} 사진`,
  }));

  return (
    <article className="workshop-card">
      <div className="workshop-card-info">
        <div className="workshop-year">
          <strong>{activity.year}</strong>
          <span>{activity.category}</span>
        </div>
        <h3>{activity.title}</h3>
        <dl>
          {activity.date ? <div><dt>날짜</dt><dd>{activity.date}</dd></div> : null}
          {activity.venue ? <div><dt>장소</dt><dd>{activity.venue}</dd></div> : null}
          {activity.description ? <div><dt>내용</dt><dd>{activity.description}</dd></div> : null}
        </dl>
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

function groupByCategory(activities: WorkshopActivityWithImages[]) {
  const grouped = new Map<string, WorkshopActivityWithImages[]>();

  activities.forEach((activity) => {
    const group = grouped.get(activity.category) || [];
    group.push(activity);
    grouped.set(activity.category, group);
  });

  return Array.from(grouped.entries());
}

export default async function WorkshopsPage() {
  const activities = await getWorkshopActivitiesWithImages();
  const groupedActivities = groupByCategory(activities);

  return (
    <main className="sub-shell">
      <header className="sub-header">
        <a className="sub-logo" href="/" aria-label="홈으로 이동">
          <img src="/images/ksnve_logo_wide.png" alt="한국소음진동공학회" />
          <span>미래모빌리티 부문회</span>
        </a>
        <a className="home-button" href="/">Home</a>
      </header>

      <section className="board-hero workshops-hero">
        <p>WORKSHOP & MEETING</p>
        <h1>워크숍 및 친선교류/간담회</h1>
        <span>미래모빌리티 부문회의 교류, 네트워킹, 운영 논의 활동을 전합니다.</span>
      </section>

      <section className="workshop-section" aria-label="워크숍 및 간담회 목록">
        {groupedActivities.map(([category, items]) => (
          <section className="workshop-category" key={category} aria-label={category}>
            <div className="workshop-list">
              {items.map((activity) => (
                <WorkshopActivityCard activity={activity} key={activity.slug} />
              ))}
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}

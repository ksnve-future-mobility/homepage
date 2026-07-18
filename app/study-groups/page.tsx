const studyGroups = [
  {
    title: "(예정) 멀미 연구회 (2026.07 ~ 2027.12)",
    topic: "전기차, 자율주행차 탑승객의 멀미 완화 기술 연구",
    secretary: "미정",
    affiliation: "",
    members: "",
    imageUrl: "/images/motion-sickness-study-group.png",
  },
  {
    title: "(예정) 버추얼개발 연구회 (2026.07~)",
    topic: "시뮬레이션과 AI기반 버추얼 개발 기술 연구",
    secretary: "미정",
    affiliation: "",
    members: "",
    imageUrl: "/images/virtual-development-study-group.png",
  },
  {
    title: "(예정) 차량 오디오 연구회 (2026.07~)",
    topic: "차량 오디오 시스템의 설계, 튜닝 및 음향 기술을 연구",
    secretary: "미정",
    affiliation: "",
    members: "",
    imageUrl: "/images/vehicle-audio-study-group.png",
  },
];

export const metadata = {
  title: "연구회 | 미래모빌리티 부문회",
};

export default function StudyGroupsPage() {
  return (
    <main className="sub-shell">
      <header className="sub-header">
        <a className="sub-logo" href="/" aria-label="홈으로 이동">
          <img className="sub-society-logo" src="/images/ksnve_logo_wide.png" alt="한국소음진동공학회" />
          <img className="sub-division-logo" src="/images/division-logo.png" alt="미래모빌리티 부문회" />
        </a>
        <a className="home-button" href="/">Home</a>
      </header>

      <section className="board-hero study-hero">
        <p>STUDY GROUP</p>
        <h1>연구회</h1>
        <span>
          관심 주제를 함께 연구하고 교류하기 위한 연구회입니다. 미래모빌리티 부문회 회원은 누구나 자유롭게 연구회를 구성하고 운영할 수 있습니다.
        </span>
      </section>

      <section className="study-section" aria-label="연구회 목록">
        <div className="study-list">
          {studyGroups.map((group) => (
            <article className="study-card" key={group.title}>
              {group.imageUrl ? (
                <div className="study-card-image">
                  <img src={group.imageUrl} alt={`${group.title} 소개 이미지`} />
                </div>
              ) : null}
              <div className="study-card-main">
                <h2>{group.title}</h2>
                <dl>
                  <div>
                    <dt>주제</dt>
                    <dd>{group.topic}</dd>
                  </div>
                  <div>
                    <dt>간사</dt>
                    <dd>
                      {group.secretary}
                      <small>{group.affiliation}</small>
                    </dd>
                  </div>
                  {group.members ? (
                    <div>
                      <dt>회원</dt>
                      <dd>{group.members}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

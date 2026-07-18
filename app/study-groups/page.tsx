const studyGroups = [
  {
    title: "멀미 연구회",
    topic: "전기차, 자율주행차 탑승객의 멀미 완화 기술을 연구하는 그룹입니다.",
    secretary: "김성현",
    affiliation: "현대자동차",
    members: "",
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
          <img src="/images/ksnve_logo_wide.png" alt="한국소음진동공학회" />
          <span>미래모빌리티 부문회</span>
        </a>
        <a className="home-button" href="/">Home</a>
      </header>

      <section className="board-hero study-hero">
        <p>STUDY GROUP</p>
        <h1>연구회</h1>
        <span>
          관심 주제를 함께 연구하고 교류해 보세요. 미래모빌리티 부문회 회원이라면 누구나 자유롭게 연구회를 구성하고 운영할 수 있습니다.
        </span>
      </section>

      <section className="study-section" aria-label="연구회 목록">
        <div className="study-list">
          {studyGroups.map((group) => (
            <article className="study-card" key={group.title}>
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
                  <div>
                    <dt>회원</dt>
                    <dd>{group.members}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

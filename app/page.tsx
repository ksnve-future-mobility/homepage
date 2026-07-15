const activities = [
  {
    number: "01",
    title: "기술 교류",
    description: "미래모빌리티의 소음·진동 현안을 함께 정의하고 연구 성과와 산업 경험을 나눕니다.",
    tags: ["기술세미나", "사례 공유"],
  },
  {
    number: "02",
    title: "산학연 협력",
    description: "학계·산업계·연구기관을 연결해 공동 연구와 실증으로 이어지는 접점을 만듭니다.",
    tags: ["공동 연구", "네트워킹"],
  },
  {
    number: "03",
    title: "미래 의제 발굴",
    description: "전동화, 자율주행, UAM 등 새로운 이동수단이 마주할 NVH 과제를 선제적으로 탐색합니다.",
    tags: ["기술 로드맵", "정책 제안"],
  },
];

const topics = [
  "전기·수소 모빌리티 NVH",
  "자율주행 승차감과 감성 품질",
  "UAM·드론 소음",
  "철도·해양 미래모빌리티",
  "AI 기반 진단·예측",
  "친환경 소재와 경량 구조",
];

const schedule = [
  { date: "2026. 03", title: "부문위원회 출범 및 창립 회의", type: "출범" },
  { date: "2026. 상반기", title: "미래모빌리티 NVH 기술세미나", type: "세미나" },
  { date: "2026. 하반기", title: "산학연 기술교류회", type: "교류" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="미래모빌리티 부문위원회 홈">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span><b>미래모빌리티 부문위원회</b><small>한국소음진동공학회</small></span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#about">위원회 소개</a>
          <a href="#activities">주요 활동</a>
          <a href="#schedule">일정</a>
          <a href="#join">참여 안내</a>
        </nav>
        <a className="header-cta" href="#join">함께하기 <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> 2026 NEW COMMITTEE</p>
          <h1>이동의 미래를<br />더 <em>조용하고</em>,<br />더 편안하게.</h1>
          <p className="hero-description">미래모빌리티의 소음·진동 기술을 연구하고 연결합니다.<br className="desktop" /> 산업과 학문이 함께 다음 이동 경험의 기준을 만듭니다.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#about">위원회 알아보기 <span>↓</span></a>
            <a className="text-link" href="#schedule">2026 활동 일정 <span>→</span></a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="signal signal-a" />
          <div className="signal signal-b" />
          <div className="signal signal-c" />
          <div className="mobility-line"><span /><span /><span /></div>
          <p>NOISE · VIBRATION · MOBILITY</p>
        </div>
        <div className="hero-meta">
          <span>KSNVE</span><p>Korean Society for Noise<br />and Vibration Engineering</p>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="section-label"><span>01</span> ABOUT US</div>
        <div className="about-content">
          <p className="lead">기술의 경계를 넘어,<br /><strong>사람을 위한 이동</strong>을 연구합니다.</p>
          <div className="about-copy">
            <p>한국소음진동공학회 미래모빌리티 부문위원회는 2026년 새롭게 출범했습니다. 급변하는 모빌리티 환경에서 소음·진동·승차감 기술의 새로운 역할을 모색하는 전문가 네트워크입니다.</p>
            <p>다양한 이동수단과 기반 기술을 아우르며, 학계와 산업 현장의 지식을 연결해 더 나은 이동 경험을 만들어갑니다.</p>
          </div>
        </div>
        <div className="principles">
          <div><b>Connect</b><span>산학연을 잇다</span></div>
          <div><b>Explore</b><span>미래 의제를 찾다</span></div>
          <div><b>Advance</b><span>기술의 기준을 높이다</span></div>
        </div>
      </section>

      <section className="activities section" id="activities">
        <div className="section-label light"><span>02</span> WHAT WE DO</div>
        <div className="section-heading-row">
          <h2>함께 질문하고,<br />함께 답을 찾습니다.</h2>
          <p>교류에서 협력으로, 아이디어에서 실증으로.<br />미래모빌리티 NVH 생태계를 함께 만들어갑니다.</p>
        </div>
        <div className="activity-list">
          {activities.map((activity) => (
            <article key={activity.number}>
              <span className="activity-number">{activity.number}</span>
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
              <div>{activity.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="topics section">
        <div className="section-label"><span>03</span> RESEARCH TOPICS</div>
        <div className="topic-layout">
          <div><h2>우리가 주목하는<br /><em>기술의 최전선</em></h2><p>경계를 두지 않는 열린 논의로<br />새로운 연구와 협력의 기회를 만듭니다.</p></div>
          <div className="topic-list">
            {topics.map((topic, index) => <div key={topic}><span>{String(index + 1).padStart(2, "0")}</span><b>{topic}</b><i>↗</i></div>)}
          </div>
        </div>
      </section>

      <section className="schedule section" id="schedule">
        <div className="section-label"><span>04</span> 2026 SCHEDULE</div>
        <div className="section-heading-row dark-text">
          <h2>첫해의 발걸음</h2>
          <p>구체적인 일정과 장소는 확정 후 안내됩니다.</p>
        </div>
        <div className="schedule-list">
          {schedule.map((item) => <article key={item.title}><time>{item.date}</time><h3>{item.title}</h3><span>{item.type}</span></article>)}
        </div>
      </section>

      <section className="join" id="join">
        <p className="eyebrow"><span /> OPEN NETWORK</p>
        <h2>미래의 이동을 함께<br />연구할 동료를 기다립니다.</h2>
        <p>미래모빌리티와 소음·진동 기술에 관심 있는<br />학계·산업계·연구기관 전문가 모두에게 열려 있습니다.</p>
        <a className="primary-button inverted" href="https://www.ksnve.or.kr" target="_blank" rel="noreferrer">학회 홈페이지 방문 <span>↗</span></a>
        <small>참여 문의 채널은 준비 중입니다.</small>
      </section>

      <footer>
        <div className="brand footer-brand"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span><b>미래모빌리티 부문위원회</b><small>한국소음진동공학회</small></span></div>
        <p>© 2026 KSNVE Future Mobility Division. All rights reserved.</p>
        <a href="#top">맨 위로 ↑</a>
      </footer>
    </main>
  );
}

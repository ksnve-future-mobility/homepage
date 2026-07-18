export const metadata = {
  title: "미래모빌리티 토크 | 미래모빌리티 부문회",
};

export default function FutureMobilityTalkPage() {
  return (
    <main className="sub-shell">
      <header className="sub-header">
        <a className="sub-logo" href="/" aria-label="홈으로 이동">
          <img className="sub-society-logo" src="/images/ksnve_logo_wide.png" alt="한국소음진동공학회" />
          <img className="sub-division-logo" src="/images/division-logo.png" alt="미래모빌리티 부문회" />
        </a>
        <a className="home-button" href="/">Home</a>
      </header>

      <section className="board-hero talk-hero">
        <p>FUTURE MOBILITY TALK</p>
        <h1>미래모빌리티 토크</h1>
        <span>미래 모빌리티의 기술과 사람, 그리고 경험을 연결하는 산학연 전문가 온라인 오픈 토크입니다.</span>
      </section>
    </main>
  );
}

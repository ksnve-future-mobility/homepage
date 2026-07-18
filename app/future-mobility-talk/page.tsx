export const metadata = {
  title: "미래모빌리티 토크 | 미래모빌리티 부문회",
};

export default function FutureMobilityTalkPage() {
  return (
    <main className="sub-shell">
      <header className="sub-header">
        <a className="sub-logo" href="/" aria-label="홈으로 이동">
          <img src="/images/ksnve_logo_wide.png" alt="한국소음진동공학회" />
          <span>미래모빌리티 부문회</span>
        </a>
        <a className="home-button" href="/">Home</a>
      </header>

      <section className="board-hero talk-hero">
        <p>FUTURE MOBILITY TALK</p>
        <h1>미래모빌리티 토크</h1>
        <span>미래모빌리티 기술과 경험을 나누는 토크 프로그램을 준비하고 있습니다.</span>
      </section>
    </main>
  );
}

export const metadata = {
  title: "학술교류회 및 세미나 | 미래모빌리티 부문회",
};

export default function NetworkingSeminarsPage() {
  return (
    <main className="sub-shell">
      <header className="sub-header">
        <a className="sub-logo" href="/" aria-label="홈으로 이동">
          <img className="sub-society-logo" src="/images/ksnve_logo_wide.png" alt="한국소음진동공학회" />
          <img className="sub-division-logo" src="/images/division-logo.png" alt="미래모빌리티 부문회" />
        </a>
        <a className="home-button" href="/">Home</a>
      </header>

      <section className="board-hero networking-hero">
        <p>NETWORKING & SEMINAR</p>
        <h1>학술교류회 및 세미나</h1>
        <span>미래모빌리티 분야의 학술교류와 세미나 활동을 전합니다.</span>
      </section>
    </main>
  );
}

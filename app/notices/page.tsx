import { getNotices } from "@/lib/notices";

export const metadata = {
  title: "공지사항 | 미래모빌리티 부문회",
};

export default async function NoticesPage() {
  const notices = await getNotices();

  return (
    <main className="sub-shell">
      <header className="sub-header">
        <a className="sub-logo" href="/" aria-label="홈으로 이동">
          <img src="/images/ksnve_logo_wide.png" alt="한국소음진동공학회" />
          <span>미래모빌리티 부문회</span>
        </a>
        <a className="home-button" href="/">Home</a>
      </header>

      <section className="board-hero">
        <p>NOTICE</p>
        <h1>공지사항</h1>
        <span>미래모빌리티 부문회의 주요 안내와 활동 소식을 전합니다.</span>
      </section>

      <section className="board-section" aria-label="공지사항 목록">
        <div className="board-toolbar board-toolbar-count-only">
          <p>총 <b>{notices.length}</b>건</p>
        </div>

        <div className="board-list">
          <div className="board-row board-head" aria-hidden="true">
            <span>번호</span>
            <span>제목</span>
            <span>분류</span>
            <span>등록일</span>
          </div>
          {notices.map((notice, index) => (
            <a className="board-row" href={`/notices/${notice.id}`} key={notice.id}>
              <span className="board-number">{notices.length - index}</span>
              <strong>{notice.title}</strong>
              <span className="board-tag">{notice.tag || "공지"}</span>
              <time>{notice.date}</time>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

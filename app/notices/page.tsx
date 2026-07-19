import Link from "next/link";
import { getNotices } from "@/lib/notices";
import SubHeader from "@/components/SubHeader";

export const metadata = {
  title: "공지사항 | 미래모빌리티 부문회",
};

export default async function NoticesPage() {
  const notices = await getNotices();

  return (
    <main className="sub-shell">
      <SubHeader />

      <section className="board-hero notices-hero">
        <p>NOTICE</p>
        <h1>공지사항</h1>
        <span>미래모빌리티 부문회의 주요 안내와 활동 소식을 전합니다.</span>
      </section>

      <section className="board-section notice-board-section" aria-label="공지사항 목록">
        <div className="board-toolbar board-toolbar-count-only">
          <p>총 <b>{notices.length}</b>건</p>
        </div>

        <div className="board-list">
          <div className="board-row board-head" aria-hidden="true">
            <span>번호</span>
            <span>제목</span>
            <span>등록일</span>
          </div>
          {notices.map((notice, index) => (
            <Link className="board-row" href={`/notices/${notice.id}`} key={notice.id}>
              <span className="board-number">{notices.length - index}</span>
              <strong>{notice.title}</strong>
              <time>{notice.date}</time>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

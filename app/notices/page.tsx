import { getNotices } from "@/lib/notices";
import SubHeader from "@/components/SubHeader";
import NoticeBoardList from "@/components/NoticeBoardList";

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
        <NoticeBoardList notices={notices} />
      </section>
    </main>
  );
}

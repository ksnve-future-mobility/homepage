import { getNotice, getNotices } from "@/lib/notices";
import { notFound } from "next/navigation";

type NoticeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: NoticeDetailPageProps) {
  const { id } = await params;
  const notice = await getNotice(id);

  return {
    title: notice ? `${notice.title} | 공지사항` : "공지사항",
  };
}

export async function generateStaticParams() {
  const notices = await getNotices();
  return notices.map((notice) => ({ id: notice.id }));
}

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { id } = await params;
  const notice = await getNotice(id);

  if (!notice) {
    notFound();
  }

  const body = notice.content || "자세한 내용은 추후 안내드리겠습니다.";

  return (
    <main className="sub-shell">
      <header className="sub-header">
        <a className="sub-logo" href="/" aria-label="홈으로 이동">
          <img src="/images/ksnve_logo_wide.png" alt="한국소음진동공학회" />
          <span>미래모빌리티 부문회</span>
        </a>
        <a className="home-button" href="/">Home</a>
      </header>

      <section className="board-hero compact">
        <p>NOTICE</p>
        <h1>공지사항</h1>
      </section>

      <article className="notice-detail">
        <header>
          <h2>{notice.title}</h2>
          <dl>
            <div><dt>등록일</dt><dd>{notice.date}</dd></div>
          </dl>
        </header>

        <div className="notice-body">
          {body.split(/\n+/).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {notice.imageUrl ? (
            <img className="notice-image" src={notice.imageUrl} alt={`${notice.title} 관련 이미지`} />
          ) : null}
        </div>

        <footer>
          <a href="/notices">목록</a>
        </footer>
      </article>
    </main>
  );
}

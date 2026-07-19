import { getNotice, getNotices } from "@/lib/notices";
import { notFound } from "next/navigation";
import Link from "next/link";
import SubHeader from "@/components/SubHeader";

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
      <SubHeader />

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
          <Link href="/notices">목록</Link>
        </footer>
      </article>
    </main>
  );
}

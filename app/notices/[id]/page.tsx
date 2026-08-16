import { getNotice, getNotices } from "@/lib/notices";
import { notFound } from "next/navigation";
import Link from "next/link";
import SubHeader from "@/components/SubHeader";
import { toProxiedImageSrc } from "@/lib/imageProxy";

type NoticeDetailPageProps = {
  params: Promise<{ id: string }>;
};

const urlPattern = /(https?:\/\/[^\s]+)/g;

function linkifyParagraph(text: string, keyPrefix: string) {
  return text.split(urlPattern).map((segment, index) => {
    if (!/^https?:\/\//.test(segment)) {
      return segment || null;
    }

    const trailingMatch = segment.match(/[).,!?;:'"]+$/);
    const trailing = trailingMatch ? trailingMatch[0] : "";
    const href = trailing ? segment.slice(0, segment.length - trailing.length) : segment;

    return (
      <span key={`${keyPrefix}-${index}`}>
        <a href={href} target="_blank" rel="noreferrer">{href}</a>
        {trailing}
      </span>
    );
  });
}

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
            <p key={paragraph}>{linkifyParagraph(paragraph, paragraph)}</p>
          ))}
          {notice.imageUrl ? (
            <img className="notice-image" src={toProxiedImageSrc(notice.imageUrl)} alt={`${notice.title} 관련 이미지`} />
          ) : null}
        </div>

        <footer>
          <Link href="/notices">목록</Link>
        </footer>
      </article>
    </main>
  );
}

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

  if (!notice) {
    return { title: "공지사항" };
  }

  const description = (notice.content || "").split(/\n+/)[0]?.slice(0, 100) || "미래모빌리티 부문회 공지사항";
  const image = notice.imageUrl
    ? { url: toProxiedImageSrc(notice.imageUrl) }
    : { url: "/images/FutureMobility_Picture_wihtext.png", width: 1683, height: 935 };

  return {
    title: `${notice.title} | 공지사항`,
    description,
    openGraph: {
      title: notice.title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: notice.title,
      description,
      images: [image.url],
    },
  };
}

export async function generateStaticParams() {
  const notices = await getNotices();
  return notices.map((notice) => ({ id: notice.id }));
}

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { id } = await params;
  const notices = await getNotices();
  const currentIndex = notices.findIndex((item) => item.id === id);
  const notice = currentIndex >= 0 ? notices[currentIndex] : await getNotice(id);

  if (!notice) {
    notFound();
  }

  const newerNotice = currentIndex > 0 ? notices[currentIndex - 1] : null;
  const olderNotice = currentIndex >= 0 && currentIndex < notices.length - 1 ? notices[currentIndex + 1] : null;

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

        {newerNotice || olderNotice ? (
          <nav className="adjacent-nav" aria-label="다른 공지사항">
            {newerNotice ? (
              <Link className="adjacent-link" href={`/notices/${newerNotice.id}`}>
                <span className="adjacent-label">다음글</span>
                <span className="adjacent-title">{newerNotice.title}</span>
              </Link>
            ) : null}
            {olderNotice ? (
              <Link className="adjacent-link" href={`/notices/${olderNotice.id}`}>
                <span className="adjacent-label">이전글</span>
                <span className="adjacent-title">{olderNotice.title}</span>
              </Link>
            ) : null}
          </nav>
        ) : null}

        <footer>
          <Link href="/notices">목록</Link>
        </footer>
      </article>
    </main>
  );
}

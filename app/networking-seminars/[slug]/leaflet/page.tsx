import { notFound } from "next/navigation";
import Link from "next/link";
import { getSeminarDetail, getSeminars } from "@/lib/events";
import { toProxiedImageSrc } from "@/lib/imageProxy";

type SeminarLeafletPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const seminars = await getSeminars();
  return seminars.filter((seminar) => seminar.leafletUrl).map((seminar) => ({ slug: seminar.slug }));
}

export async function generateMetadata({ params }: SeminarLeafletPageProps) {
  const { slug } = await params;
  const seminarDetail = await getSeminarDetail(slug);

  return {
    title: seminarDetail ? `${seminarDetail.seminar.title} 리플렛` : "리플렛",
  };
}

export default async function SeminarLeafletPage({ params }: SeminarLeafletPageProps) {
  const { slug } = await params;
  const seminarDetail = await getSeminarDetail(slug);

  if (!seminarDetail?.seminar.leafletUrl) {
    notFound();
  }

  const { seminar } = seminarDetail;

  return (
    <main className="leaflet-view">
      <header>
        <h1>{seminar.title}</h1>
        <Link href={`/networking-seminars/${seminar.slug}`}>세미나 안내 보기</Link>
      </header>
      <img src={toProxiedImageSrc(seminar.leafletUrl)} alt={`${seminar.title} 리플렛`} />
    </main>
  );
}

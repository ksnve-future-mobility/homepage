// 구글시트에 등록된 이미지 주소가 실제로 살아있는지 점검하는 스크립트.
// 담당자가 드라이브 파일을 지우거나 공유 설정을 바꾸면 사이트에서는 조용히
// 사진이 깨지는데, 이 스크립트를 실행하면 어떤 주소가 문제인지 바로 알 수 있다.
//
// 실행: npm run check-images
import { getNotices } from "../lib/notices";
import { getAcademicEvents, getEventImages, getWorkshopImages } from "../lib/events";

type ImageRef = {
  source: string;
  label: string;
  url: string;
};

async function collectImageRefs(): Promise<ImageRef[]> {
  const [notices, events, eventImages, workshopImages] = await Promise.all([
    getNotices(),
    getAcademicEvents(),
    getEventImages(),
    getWorkshopImages(),
  ]);

  const refs: ImageRef[] = [];

  for (const notice of notices) {
    if (notice.imageUrl) {
      refs.push({ source: "공지사항", label: notice.title, url: notice.imageUrl });
    }
  }

  for (const event of events) {
    if (event.imageUrl) {
      refs.push({ source: "학술대회", label: event.title, url: event.imageUrl });
    }
  }

  for (const image of eventImages) {
    refs.push({ source: "학술대회 갤러리", label: `${image.detailSource} #${image.order}`, url: image.imageUrl });
  }

  for (const image of workshopImages) {
    refs.push({ source: "워크숍 갤러리", label: `${image.workshopSlug} #${image.order}`, url: image.imageUrl });
  }

  return refs;
}

async function checkUrl(url: string): Promise<{ ok: boolean; status?: number; error?: string }> {
  try {
    const response = await fetch(url, { redirect: "follow" });
    return { ok: response.ok, status: response.status };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

async function main() {
  const refs = await collectImageRefs();
  console.log(`총 ${refs.length}개의 이미지 링크를 확인합니다...\n`);

  const broken: Array<ImageRef & { reason: string }> = [];

  for (const ref of refs) {
    const result = await checkUrl(ref.url);
    if (!result.ok) {
      const reason = result.error || `HTTP ${result.status}`;
      broken.push({ ...ref, reason });
      console.log(`✗ [${ref.source}] ${ref.label} — ${reason}`);
      console.log(`  ${ref.url}`);
    }
  }

  console.log("");
  if (broken.length === 0) {
    console.log("모든 이미지 링크가 정상입니다.");
  } else {
    console.log(`${broken.length}개의 깨진 이미지 링크를 찾았습니다. 위 목록을 확인해주세요.`);
    process.exitCode = 1;
  }
}

main();

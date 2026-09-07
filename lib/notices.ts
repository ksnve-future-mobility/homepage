// NoticeRecord는 구글시트에서 파싱한 전체 데이터(첨부파일 실제 주소 포함)이고,
// 그중 공개해도 되는 필드만 골라 Notice로 노출합니다. attachmentUrl은 클라이언트로
// 전달되지 않고, 비밀번호 확인 후 서버 액션(actions.ts)을 통해서만 내려줍니다.
type NoticeRecord = {
  id: string;
  title: string;
  date: string;
  tag: string;
  content?: string;
  imageUrl?: string;
  attachmentUrl?: string;
};

export type Notice = Omit<NoticeRecord, "attachmentUrl"> & {
  hasAttachment: boolean;
};

function toPublicNotice({ attachmentUrl, ...record }: NoticeRecord): Notice {
  return { ...record, hasAttachment: Boolean(attachmentUrl) };
}

const fallbackNotices: NoticeRecord[] = [
  {
    id: "1",
    title: "미래모빌리티 부문위원회 홈페이지를 준비 중입니다.",
    date: "2026.07.15",
    tag: "공지",
    content: "미래모빌리티 부문위원회 홈페이지를 준비 중입니다.",
  },
  {
    id: "2",
    title: "2026년도 부문위원회 활동 계획 안내",
    date: "2026.07.10",
    tag: "안내",
    content: "2026년도 부문위원회 활동 계획을 안내드립니다.",
  },
  {
    id: "3",
    title: "미래모빌리티 기술 교류회 개최 예정",
    date: "2026.07.03",
    tag: "행사",
    content: "미래모빌리티 기술 교류회 개최를 준비하고 있습니다.",
  },
];

const defaultNoticesCsvUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSrpUZWja8XWeFeSOKDvwClTm_8OCVaENKPUnb9fWWajUNfotJCVHo_0gx7R47bNxYwRxOOe88yTpTA/pub?output=csv";

function parseCsv(csv: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const next = csv[index + 1];

    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      row.push(current.trim());
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }

      row.push(current.trim());
      if (row.some(Boolean)) {
        rows.push(row);
      }
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  row.push(current.trim());
  if (row.some(Boolean)) {
    rows.push(row);
  }

  return rows;
}

function normalizeHeader(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

function getCell(row: string[], headers: string[], names: string[], fallbackIndex: number) {
  const index = headers.findIndex((header) => names.includes(header));
  return row[index >= 0 ? index : fallbackIndex]?.trim() || "";
}

function parseNoticesCsv(csv: string): NoticeRecord[] {
  const rows = parseCsv(csv);

  const [rawHeaders = [], ...items] = rows;
  const headers = rawHeaders.map(normalizeHeader);

  return items
    .map((row, index) => {
      const visible = getCell(row, headers, ["visible", "show", "display", "노출"], 3).toLowerCase();
      const date = getCell(row, headers, ["date", "날짜"], 0);
      const tag = getCell(row, headers, ["tag", "category", "분류"], 1);
      const title = getCell(row, headers, ["title", "subject", "제목"], 2);
      const content = getCell(row, headers, ["content", "body", "본문", "내용"], 4);
      const imageUrl = getCell(
        row,
        headers,
        ["imageurl", "image", "photo", "picture", "이미지", "사진", "이미지주소", "사진주소"],
        5,
      );
      const attachmentUrl = getCell(
        row,
        headers,
        ["attachmenturl", "attachment", "file", "fileurl", "첨부파일", "첨부", "첨부파일주소", "파일첨부", "파일주소"],
        6,
      );
      const id = getCell(row, headers, ["id", "idx", "번호"], -1) || String(index + 1);

      return { id, date, tag, title, content, imageUrl, attachmentUrl, visible };
    })
    .filter((notice) => notice.title && notice.visible !== "false" && notice.visible !== "no")
    .map(({ visible: _visible, ...notice }) => notice);
}

function getDateValue(date: string) {
  const [year, month, day] = date.split(".").map(Number);
  return new Date(year, (month || 1) - 1, day || 1).getTime();
}

function sortByNewest<T extends { date: string }>(notices: T[]): T[] {
  return [...notices].sort((a, b) => getDateValue(b.date) - getDateValue(a.date));
}

export function isRecentNotice(date: string, days = 7) {
  const noticeTime = getDateValue(date);
  if (!Number.isFinite(noticeTime)) {
    return false;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const diffDays = (today - noticeTime) / (1000 * 60 * 60 * 24);

  return diffDays >= 0 && diffDays < days;
}

async function fetchNoticeRecords(limit?: number): Promise<NoticeRecord[]> {
  const csvUrl = process.env.NOTICES_CSV_URL || defaultNoticesCsvUrl;

  try {
    const response = await fetch(csvUrl, { next: { revalidate: 300 } });

    if (!response.ok) {
      console.error(`[notices] CSV fetch failed with status ${response.status}; showing fallback notices.`);
      const sortedFallbackNotices = sortByNewest(fallbackNotices);
      return limit ? sortedFallbackNotices.slice(0, limit) : sortedFallbackNotices;
    }

    const notices = parseNoticesCsv(await response.text());
    if (notices.length === 0) {
      console.error("[notices] CSV returned no visible rows; showing fallback notices. Check the sheet's column headers and 'visible' values.");
    }
    const resolvedNotices = sortByNewest(notices.length > 0 ? notices : fallbackNotices);
    return limit ? resolvedNotices.slice(0, limit) : resolvedNotices;
  } catch (error) {
    console.error("[notices] Failed to load or parse notices CSV; showing fallback notices.", error);
    const sortedFallbackNotices = sortByNewest(fallbackNotices);
    return limit ? sortedFallbackNotices.slice(0, limit) : sortedFallbackNotices;
  }
}

export async function getNotices(limit?: number): Promise<Notice[]> {
  const records = await fetchNoticeRecords(limit);
  return records.map(toPublicNotice);
}

export async function getNotice(id: string) {
  const notices = await getNotices();
  return notices.find((notice) => notice.id === id);
}

// 첨부파일의 실제 다운로드 주소. 서버 액션에서 비밀번호 확인 후에만 호출하세요.
export async function getNoticeAttachmentUrl(id: string): Promise<string | null> {
  const records = await fetchNoticeRecords();
  return records.find((record) => record.id === id)?.attachmentUrl || null;
}

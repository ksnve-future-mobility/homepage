export type Notice = {
  id: string;
  title: string;
  date: string;
  tag: string;
  content?: string;
  imageUrl?: string;
};

const fallbackNotices: Notice[] = [
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

function parseNoticesCsv(csv: string): Notice[] {
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
      const id = getCell(row, headers, ["id", "idx", "번호"], -1) || String(index + 1);

      return { id, date, tag, title, content, imageUrl, visible };
    })
    .filter((notice) => notice.title && notice.visible !== "false" && notice.visible !== "no")
    .map(({ visible: _visible, ...notice }) => notice);
}

function getDateValue(date: string) {
  const [year, month, day] = date.split(".").map(Number);
  return new Date(year, (month || 1) - 1, day || 1).getTime();
}

function sortByNewest(notices: Notice[]) {
  return [...notices].sort((a, b) => getDateValue(b.date) - getDateValue(a.date));
}

export async function getNotices(limit?: number) {
  const csvUrl = process.env.NOTICES_CSV_URL || defaultNoticesCsvUrl;

  try {
    const response = await fetch(csvUrl, { next: { revalidate: 300 } });

    if (!response.ok) {
      const sortedFallbackNotices = sortByNewest(fallbackNotices);
      return limit ? sortedFallbackNotices.slice(0, limit) : sortedFallbackNotices;
    }

    const notices = parseNoticesCsv(await response.text());
    const resolvedNotices = sortByNewest(notices.length > 0 ? notices : fallbackNotices);
    return limit ? resolvedNotices.slice(0, limit) : resolvedNotices;
  } catch {
    const sortedFallbackNotices = sortByNewest(fallbackNotices);
    return limit ? sortedFallbackNotices.slice(0, limit) : sortedFallbackNotices;
  }
}

export async function getNotice(id: string) {
  const notices = await getNotices();
  return notices.find((notice) => notice.id === id);
}

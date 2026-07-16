export type AcademicEvent = {
  slug: string;
  category: "domestic" | "international";
  year: string;
  title: string;
  period: string;
  venue: string;
  session: string;
  latest: boolean;
  detailText: string;
  linkText: string;
  linkUrl: string;
  imageUrl: string;
};

const fallbackAcademicEvents: AcademicEvent[] = [
  {
    slug: "2026-spring-conference",
    category: "domestic",
    year: "2026",
    title: "2026년 한국소음진동공학회 춘계 소음진동 학술대회",
    period: "",
    venue: "",
    session: "",
    latest: true,
    detailText: "",
    linkText: "",
    linkUrl: "",
    imageUrl: "",
  },
];

const defaultAcademicEventsCsvUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT4QtJ1hDncUji8a8pr0sUfLmPYZGjeqDGGPutOM7WTfPkuiQlKg_ta6NGVzzBuRRG3Fl-ccrY3AayR/pub?output=csv";

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

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
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function normalizeHeader(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

function getCell(row: string[], headers: string[], names: string[], fallbackIndex: number) {
  const index = headers.findIndex((header) => names.includes(header));
  return row[index >= 0 ? index : fallbackIndex]?.trim() || "";
}

function isTrue(value: string) {
  return ["true", "yes", "y", "1", "latest", "최신", "예", "O", "o"].includes(value.trim());
}

function normalizeCategory(value: string): AcademicEvent["category"] {
  const normalized = value.trim().toLowerCase().replace(/\s+/g, "");

  if (["국제", "국외", "international", "external", "abroad", "overseas"].includes(normalized)) {
    return "international";
  }

  return "domestic";
}

export function createEventSlug(year: string, title: string) {
  const source = `${year}-${title}`
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return source || "event";
}

function normalizeSlug(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function parseAcademicEventsCsv(csv: string): AcademicEvent[] {
  const rows = csv
    .split(/\r?\n/)
    .map((line) => parseCsvLine(line))
    .filter((row) => row.some(Boolean));

  const [rawHeaders = [], ...items] = rows;
  const headers = rawHeaders.map(normalizeHeader);
  const hasCategoryColumn = headers.some((header) =>
    ["category", "type", "division", "구분", "국내국외", "국내국외구분"].includes(header),
  );
  const offset = hasCategoryColumn ? 1 : 0;

  return items
    .map((row, index) => {
      const category = normalizeCategory(
        getCell(row, headers, ["category", "type", "division", "구분", "국내국외", "국내국외구분"], 0),
      );
      const visible = getCell(row, headers, ["visible", "show", "display", "노출", "공개"], 6 + offset).toLowerCase();
      const year = getCell(row, headers, ["year", "연도", "년도"], 0 + offset);
      const title = getCell(row, headers, ["title", "event", "name", "행사명", "제목", "학술대회명"], 1 + offset);
      const period = getCell(row, headers, ["period", "date", "기간", "일정"], 2 + offset);
      const venue = getCell(row, headers, ["venue", "place", "location", "장소"], 3 + offset);
      const session = getCell(row, headers, ["session", "program", "기획세션", "세션", "참여현황"], 4 + offset);
      const latestCell = getCell(row, headers, ["latest", "최신"], 5 + offset);
      const detailText = getCell(row, headers, ["detailtext", "detail", "content", "body", "description", "상세내용", "본문", "내용", "설명"], 7 + offset);
      const linkText = getCell(row, headers, ["linktext", "linklabel", "buttontext", "링크텍스트", "버튼명", "링크명"], 8 + offset);
      const linkUrl = getCell(row, headers, ["linkurl", "url", "link", "href", "링크", "주소", "링크주소"], 9 + offset);
      const imageUrl = getCell(row, headers, ["imageurl", "image", "photo", "picture", "이미지", "사진", "이미지주소", "사진주소"], 10 + offset);

      return {
        slug: createEventSlug(year || String(new Date().getFullYear() - index), title),
        category,
        year: year || String(new Date().getFullYear() - index),
        title,
        period,
        venue,
        session,
        latest: isTrue(latestCell) || index === 0,
        detailText,
        linkText,
        linkUrl,
        imageUrl,
        visible,
      };
    })
    .filter((event) => event.title && event.visible !== "false" && event.visible !== "no" && event.visible !== "비공개")
    .map(({ visible: _visible, ...event }) => event);
}

export async function getAcademicEvents() {
  const csvUrl = process.env.ACADEMIC_EVENTS_CSV_URL || defaultAcademicEventsCsvUrl;

  try {
    const response = await fetch(csvUrl, { next: { revalidate: 300 } });

    if (!response.ok) {
      return fallbackAcademicEvents;
    }

    const events = parseAcademicEventsCsv(await response.text());
    return events.length > 0 ? events : fallbackAcademicEvents;
  } catch {
    return fallbackAcademicEvents;
  }
}

export async function getDomesticAcademicEvents() {
  const events = await getAcademicEvents();
  return events.filter((event) => event.category === "domestic");
}

export async function getInternationalAcademicEvents() {
  const events = await getAcademicEvents();
  return events.filter((event) => event.category === "international");
}

export async function getAcademicEvent(slug: string) {
  const events = await getAcademicEvents();
  const normalizedSlug = normalizeSlug(slug);

  return events.find((event) => event.slug === normalizedSlug || encodeURIComponent(event.slug) === slug);
}

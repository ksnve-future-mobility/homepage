export type AcademicEvent = {
  slug: string;
  category: "domestic" | "international";
  year: string;
  title: string;
  period: string;
  venue: string;
  session: string;
  latest: boolean;
  detailSource: string;
  detailText: string;
  linkText: string;
  linkUrl: string;
  imageUrl: string;
};

export type EventDetailBlock = {
  detailSource: string;
  type: string;
  title: string;
  content: string;
  order: number;
};

export type EventProgram = {
  detailSource: string;
  sessionNo: number;
  sessionTitle: string;
  date: string;
  time: string;
  room: string;
  chair: string;
  order: number;
};

export type EventProgramItem = {
  detailSource: string;
  sessionNo: number;
  time: string;
  label: string;
  title: string;
  speakers: string;
  order: number;
};

export type EventImage = {
  detailSource: string;
  imageUrl: string;
  caption: string;
  role: string;
  order: number;
};

export type AcademicEventDetail = {
  event: AcademicEvent;
  details: EventDetailBlock[];
  programs: Array<EventProgram & { items: EventProgramItem[] }>;
  images: EventImage[];
};

const fallbackAcademicEvents: AcademicEvent[] = [
  {
    slug: "2026-추계-소음진동-학술대회",
    category: "domestic",
    year: "2026",
    title: "추계 소음진동 학술대회",
    period: "2026.11.25(수) -11.28(토)",
    venue: "여수 엑스포컨벤션",
    session: "미래 모빌리티",
    latest: true,
    detailSource: "fall-2026",
    detailText: "",
    linkText: "",
    linkUrl: "",
    imageUrl: "",
  },
  {
    slug: "2026-춘계-소음진동-학술대회",
    category: "domestic",
    year: "2026",
    title: "춘계 소음진동 학술대회",
    period: "2026.05.27(수) -05.30(토)",
    venue: "삼척 쏠비치",
    session: "미래 모빌리티",
    latest: false,
    detailSource: "spring-2026",
    detailText: "",
    linkText: "",
    linkUrl: "",
    imageUrl: "",
  },
];

const defaultAcademicEventsCsvUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT4QtJ1hDncUji8a8pr0sUfLmPYZGjeqDGGPutOM7WTfPkuiQlKg_ta6NGVzzBuRRG3Fl-ccrY3AayR/pub?output=csv";
const defaultEventDetailsCsvUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT4QtJ1hDncUji8a8pr0sUfLmPYZGjeqDGGPutOM7WTfPkuiQlKg_ta6NGVzzBuRRG3Fl-ccrY3AayR/pub?gid=158691937&single=true&output=csv";
const defaultEventImagesCsvUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT4QtJ1hDncUji8a8pr0sUfLmPYZGjeqDGGPutOM7WTfPkuiQlKg_ta6NGVzzBuRRG3Fl-ccrY3AayR/pub?gid=900042325&single=true&output=csv";
const defaultEventProgramsCsvUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT4QtJ1hDncUji8a8pr0sUfLmPYZGjeqDGGPutOM7WTfPkuiQlKg_ta6NGVzzBuRRG3Fl-ccrY3AayR/pub?gid=1990383026&single=true&output=csv";
const defaultEventProgramItemsCsvUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT4QtJ1hDncUji8a8pr0sUfLmPYZGjeqDGGPutOM7WTfPkuiQlKg_ta6NGVzzBuRRG3Fl-ccrY3AayR/pub?gid=683714820&single=true&output=csv";

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

function getNumberCell(row: string[], headers: string[], names: string[], fallbackIndex: number) {
  const value = getCell(row, headers, names, fallbackIndex);
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
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

function getEventTimestamps(event: AcademicEvent) {
  const year = Number(event.year.replace(/\D/g, ""));
  const fallbackYear = Number.isFinite(year) && year > 0 ? year : new Date().getFullYear();
  const timestamps: number[] = [];

  for (const match of event.period.matchAll(/(\d{4})[.\-/년\s]+(\d{1,2})[.\-/월\s]+(\d{1,2})/g)) {
    const [, dateYear, month, day] = match;
    timestamps.push(Date.UTC(Number(dateYear), Number(month) - 1, Number(day)));
  }

  for (const match of event.period.matchAll(/(?:^|[\s~-])(\d{1,2})[.\-/월\s]+(\d{1,2})/g)) {
    const [, month, day] = match;
    timestamps.push(Date.UTC(fallbackYear, Number(month) - 1, Number(day)));
  }

  return timestamps.length > 0 ? timestamps : [Date.UTC(fallbackYear, 0, 1)];
}

function getEventDateTime(event: AcademicEvent) {
  return Math.max(...getEventTimestamps(event));
}

function getEventStartDateTime(event: AcademicEvent) {
  return Math.min(...getEventTimestamps(event));
}

export function getAcademicEventBadge(event: AcademicEvent) {
  const today = new Date();
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

  if (getEventStartDateTime(event) > todayUtc) {
    return "UPCOMING";
  }

  return "Archive";
}

function sortAcademicEvents(events: AcademicEvent[]) {
  return [...events].sort((a, b) => {
    if (a.latest !== b.latest) {
      return a.latest ? -1 : 1;
    }

    const dateDifference = getEventDateTime(b) - getEventDateTime(a);

    if (dateDifference !== 0) {
      return dateDifference;
    }

    return a.title.localeCompare(b.title, "ko");
  });
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
      const detailSource = getCell(row, headers, ["detailsource", "detailid", "source", "상세소스", "상세id"], 7 + offset);
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
        detailSource,
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

function getCsvRows(csv: string) {
  const rows = csv
    .split(/\r?\n/)
    .map((line) => parseCsvLine(line))
    .filter((row) => row.some(Boolean));
  const [rawHeaders = [], ...items] = rows;
  return { headers: rawHeaders.map(normalizeHeader), items };
}

function parseEventDetailsCsv(csv: string): EventDetailBlock[] {
  const { headers, items } = getCsvRows(csv);

  return items
    .map((row) => ({
      detailSource: getCell(row, headers, ["detailsource", "detailid", "source", "상세소스", "상세id"], 0),
      type: getCell(row, headers, ["type", "종류", "유형"], 1),
      title: getCell(row, headers, ["title", "제목"], 2),
      content: getCell(row, headers, ["content", "body", "본문", "내용"], 3),
      order: getNumberCell(row, headers, ["order", "sort", "순서"], 4),
    }))
    .filter((detail) => detail.detailSource && detail.content)
    .sort((a, b) => a.order - b.order);
}

function parseEventProgramsCsv(csv: string): EventProgram[] {
  const { headers, items } = getCsvRows(csv);

  return items
    .map((row) => ({
      detailSource: getCell(row, headers, ["detailsource", "detailid", "source", "상세소스", "상세id"], 0),
      sessionNo: getNumberCell(row, headers, ["sessionno", "sessionnumber", "세션번호"], 1),
      sessionTitle: getCell(row, headers, ["sessiontitle", "session", "세션명", "세션제목"], 2),
      date: getCell(row, headers, ["date", "날짜", "일자"], 3),
      time: getCell(row, headers, ["time", "시간"], 4),
      room: getCell(row, headers, ["room", "venue", "place", "장소", "룸"], 5),
      chair: getCell(row, headers, ["chair", "moderator", "좌장"], 6),
      order: getNumberCell(row, headers, ["order", "sort", "순서"], 7),
    }))
    .filter((program) => program.detailSource && program.sessionNo > 0)
    .sort((a, b) => a.order - b.order);
}

function parseEventProgramItemsCsv(csv: string): EventProgramItem[] {
  const { headers, items } = getCsvRows(csv);

  return items
    .map((row) => ({
      detailSource: getCell(row, headers, ["detailsource", "detailid", "source", "상세소스", "상세id"], 0),
      sessionNo: getNumberCell(row, headers, ["sessionno", "sessionnumber", "세션번호"], 1),
      time: getCell(row, headers, ["time", "시간"], 2),
      label: getCell(row, headers, ["label", "tag", "구분", "라벨"], 3),
      title: getCell(row, headers, ["title", "subject", "제목", "발표제목"], 4),
      speakers: getCell(row, headers, ["speakers", "authors", "presenter", "발표자", "저자"], 5),
      order: getNumberCell(row, headers, ["order", "sort", "순서"], 6),
    }))
    .filter((item) => item.detailSource && item.sessionNo > 0 && item.title)
    .sort((a, b) => a.order - b.order);
}

function parseEventImagesCsv(csv: string): EventImage[] {
  const { headers, items } = getCsvRows(csv);

  return items
    .map((row) => ({
      detailSource: getCell(row, headers, ["detailsource", "detailid", "source", "상세소스", "상세id"], 0),
      imageUrl: getCell(row, headers, ["imageurl", "image", "photo", "picture", "이미지", "사진", "이미지주소", "사진주소"], 1),
      caption: getCell(row, headers, ["caption", "description", "설명", "캡션"], 2),
      role: getCell(row, headers, ["role", "type", "구분", "역할"], 3),
      order: getNumberCell(row, headers, ["order", "sort", "순서"], 4),
    }))
    .filter((image) => image.detailSource && image.imageUrl)
    .sort((a, b) => a.order - b.order);
}

async function fetchCsv<T>(url: string, parser: (csv: string) => T): Promise<T | null> {
  try {
    const response = await fetch(url, { next: { revalidate: 300 } });

    if (!response.ok) {
      return null;
    }

    return parser(await response.text());
  } catch {
    return null;
  }
}

export async function getAcademicEvents() {
  const csvUrl = process.env.ACADEMIC_EVENTS_CSV_URL || defaultAcademicEventsCsvUrl;

  try {
    const response = await fetch(csvUrl, { next: { revalidate: 300 } });

    if (!response.ok) {
      return sortAcademicEvents(fallbackAcademicEvents);
    }

    const events = parseAcademicEventsCsv(await response.text());
    return sortAcademicEvents(events.length > 0 ? events : fallbackAcademicEvents);
  } catch {
    return sortAcademicEvents(fallbackAcademicEvents);
  }
}

export async function getEventDetails() {
  const csvUrl = process.env.EVENT_DETAILS_CSV_URL || defaultEventDetailsCsvUrl;
  return (await fetchCsv(csvUrl, parseEventDetailsCsv)) || [];
}

export async function getEventPrograms() {
  const csvUrl = process.env.EVENT_PROGRAMS_CSV_URL || defaultEventProgramsCsvUrl;
  return (await fetchCsv(csvUrl, parseEventProgramsCsv)) || [];
}

export async function getEventProgramItems() {
  const csvUrl = process.env.EVENT_PROGRAM_ITEMS_CSV_URL || defaultEventProgramItemsCsvUrl;
  return (await fetchCsv(csvUrl, parseEventProgramItemsCsv)) || [];
}

export async function getEventImages() {
  const csvUrl = process.env.EVENT_IMAGES_CSV_URL || defaultEventImagesCsvUrl;
  return (await fetchCsv(csvUrl, parseEventImagesCsv)) || [];
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

export async function getAcademicEventDetail(slug: string): Promise<AcademicEventDetail | null> {
  const event = await getAcademicEvent(slug);

  if (!event) {
    return null;
  }

  const detailSource = event.detailSource || event.slug;
  const [details, programs, programItems, images] = await Promise.all([
    getEventDetails(),
    getEventPrograms(),
    getEventProgramItems(),
    getEventImages(),
  ]);

  const eventItems = programItems.filter((item) => item.detailSource === detailSource);

  return {
    event,
    details: details.filter((detail) => detail.detailSource === detailSource),
    programs: programs
      .filter((program) => program.detailSource === detailSource)
      .map((program) => ({
        ...program,
        items: eventItems.filter((item) => item.sessionNo === program.sessionNo),
      })),
    images: images.filter((image) => image.detailSource === detailSource),
  };
}

export type AcademicEvent = {
  year: string;
  title: string;
  period: string;
  venue: string;
  session: string;
  latest: boolean;
};

const fallbackAcademicEvents: AcademicEvent[] = [
  {
    year: "2026",
    title: "2026년 한국소음진동공학회 춘계소음진동학술대회",
    period: "",
    venue: "",
    session: "",
    latest: true,
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

function parseAcademicEventsCsv(csv: string): AcademicEvent[] {
  const rows = csv
    .split(/\r?\n/)
    .map((line) => parseCsvLine(line))
    .filter((row) => row.some(Boolean));

  const [rawHeaders = [], ...items] = rows;
  const headers = rawHeaders.map(normalizeHeader);

  return items
    .map((row, index) => {
      const visible = getCell(row, headers, ["visible", "show", "display", "노출", "공개"], 6).toLowerCase();
      const year = getCell(row, headers, ["year", "연도", "년도"], 0);
      const title = getCell(row, headers, ["title", "event", "name", "행사명", "제목", "학술대회명"], 1);
      const period = getCell(row, headers, ["period", "date", "기간", "일정"], 2);
      const venue = getCell(row, headers, ["venue", "place", "location", "장소"], 3);
      const session = getCell(row, headers, ["session", "program", "기획세션", "세션"], 4);
      const latestCell = getCell(row, headers, ["latest", "최신"], 5);

      return {
        year: year || String(new Date().getFullYear() - index),
        title,
        period,
        venue,
        session,
        latest: isTrue(latestCell) || index === 0,
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

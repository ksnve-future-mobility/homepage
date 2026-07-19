import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "/Users/seonghyeonkim/Documents/Codex/2026-07-15/sites-plugin-sites-openai-bundled-create/outputs/Conference_with_spring2025_fall2024.xlsx";
const outputDir = "/Users/seonghyeonkim/Documents/Codex/2026-07-15/sites-plugin-sites-openai-bundled-create/outputs";
const outputPath = path.join(outputDir, "Conference_with_spring2025_fall2024_spring2024.xlsx");

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

function sheet(name) {
  return workbook.worksheets.getItem(name);
}

function usedRowCount(ws) {
  return ws.getUsedRange(true).values.length;
}

function appendRows(ws, rows) {
  ws.getRangeByIndexes(usedRowCount(ws), 0, rows.length, rows[0].length).values = rows;
}

function getHeader(ws) {
  return ws.getRangeByIndexes(0, 0, 1, ws.getUsedRange(true).values[0].length).values[0];
}

function rowForHeader(header, data) {
  return header.map((name) => data[name] ?? "");
}

const events = sheet("events");
const details = sheet("eventDetails");
const programs = sheet("eventPrograms");
const items = sheet("eventProgramItems");

const eventsHeader = getHeader(events);
const detailsHeader = getHeader(details);
const programsHeader = getHeader(programs);
const itemsHeader = getHeader(items);

appendRows(events, [
  rowForHeader(eventsHeader, {
    category: "국내",
    year: "2024",
    title: "춘계 소음진동 학술대회",
    period: "2024.05.23(목)",
    venue: "라마다볼룸3(2F)",
    session: "미래 모빌리티 기획세션 운영",
    latest: "FALSE",
    visible: "TRUE",
    detailSource: "spring-2024",
    eventSlug: "spring-2024",
    before2026: "TRUE",
  }),
]);

appendRows(details, [
  rowForHeader(detailsHeader, {
    detailSource: "spring-2024",
    type: "intro",
    title: "행사 소개",
    content: "2024년 춘계 소음진동 학술대회에서 미래 모빌리티 기획세션을 운영하였습니다.",
    order: 1,
  }),
  rowForHeader(detailsHeader, {
    detailSource: "spring-2024",
    type: "paragraph",
    title: "참여 내용",
    content: "5월 23일 미래모빌리티 [1]~[4] 세션이 진행되었습니다.",
    order: 2,
  }),
]);

appendRows(programs, [
  rowForHeader(programsHeader, {
    detailSource: "spring-2024",
    sessionNo: 1,
    sessionTitle: "미래모빌리티[1]",
    date: "5월 23일(목)",
    time: "08:40~10:00",
    room: "라마다볼룸3(2F)",
    chair: "김용대(현대자동차)",
    order: 1,
  }),
  rowForHeader(programsHeader, {
    detailSource: "spring-2024",
    sessionNo: 2,
    sessionTitle: "미래모빌리티[2]",
    date: "5월 23일(목)",
    time: "10:20~12:00",
    room: "라마다볼룸3(2F)",
    chair: "김성현(현대자동차)",
    order: 2,
  }),
  rowForHeader(programsHeader, {
    detailSource: "spring-2024",
    sessionNo: 3,
    sessionTitle: "미래모빌리티[3]",
    date: "5월 23일(목)",
    time: "13:40~15:00",
    room: "라마다볼룸3(2F)",
    chair: "김성현(현대자동차)",
    order: 3,
  }),
  rowForHeader(programsHeader, {
    detailSource: "spring-2024",
    sessionNo: 4,
    sessionTitle: "미래모빌리티[4]",
    date: "5월 23일(목)",
    time: "15:20~16:40",
    room: "라마다볼룸3(2F)",
    chair: "정은주(이화여대)",
    order: 4,
  }),
]);

appendRows(items, [
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 1,
    time: "08:40~08:55",
    label: "+",
    title: "스마트모빌리티를 위한 레이더 센서 커버의 초음파 제빙 기술 적용 연구",
    speakers: "노은식, 신금재(생기연), 문원규(포항공대)",
    order: 1,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 1,
    time: "08:55~09:10",
    label: "+",
    title: "인체진동을 고려한 센터콘솔 진동평가법 개발",
    speakers: "한소운, 김호영(고려대), 최성욱(현대자동차), 윤성호, 나성수(고려대)",
    order: 2,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 1,
    time: "09:10~09:25",
    label: "",
    title: "AI 기술을 활용한 미래 모빌리티의 주행 컴포트 개발 사례",
    speakers: "김용대(현대자동차)",
    order: 3,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 2,
    time: "10:20~10:35",
    label: "",
    title: "전기차 실도로 주행 패턴 분석을 통한 멀미 실험 모드 개발",
    speakers: "양재식, 김성현(현대자동차)",
    order: 1,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 2,
    time: "10:35~10:50",
    label: "+",
    title: "환경 소음 스트레스에 대한 다차원 연구: 생체 신호와 자가보고 설문 응답의 상관성 분석",
    speakers: "신혜진(이화여자대), 홍유정(이화뮤직웰니스연구센터), 천지현(이화여자대), 정은주(이화여자대)",
    order: 2,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 2,
    time: "10:50~11:05",
    label: "",
    title: "제2경로 모델링 오차를 고려한 차량 능동소음제어 시스템의 소음 저감 성능 평가",
    speakers: "김성현(현대자동차)",
    order: 3,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 2,
    time: "11:05~11:20",
    label: "*+",
    title: "Managing Traffic Noise Through Sound: A Scoping Review",
    speakers: "김예성, 박지현(이화여자대), 홍유정(이화뮤직웰니스연구센터), 정은주(이화여자대)",
    order: 4,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 3,
    time: "13:40~13:55",
    label: "+",
    title: "심전도를 활용한 멀미 영상 예측 모델 개발",
    speakers: "신지연, 윤명환, 송예인, 배재휴(서울대), 양재식(현대자동차)",
    order: 1,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 3,
    time: "13:55~14:10",
    label: "+",
    title: "자동차 멀미 저감 기술 평가를 위한 멀미 지표 개발",
    speakers: "이윤진, 박우진, 김성민(서울대), 양재식, 김성현(현대자동차)",
    order: 2,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 3,
    time: "14:10~14:25",
    label: "+",
    title: "다중 생체 신호 측정에 의한 차량 멀미 평가 연구",
    speakers: "김호영, 한소운, 함석현, 김민지(고려대), 최성욱(현대자동차), 나성수, 윤성호(고려대)",
    order: 3,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 3,
    time: "14:25~14:40",
    label: "",
    title: "자율주행차 멀미 완화를 위한 사운드 디자인 연구",
    speakers: "정은주(이화여대), 김성현(현대자동차)",
    order: 4,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 3,
    time: "14:40~14:55",
    label: "",
    title: "미래 모빌리티 멀미 연구에서 소음진동 분야의 역할 및 학제간 융합",
    speakers: "김성현, 양재식(현대자동차), 정승빈, 박현종(컨슈머인사이트), 윤명환, 박우진(서울대), 임창환(한양대), 홍성광(한림대), 정은주(이화여대)",
    order: 5,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 4,
    time: "15:20~15:35",
    label: "",
    title: "미래 모빌리티 멀티모달 경험에 대한 사용자 기대의 개념적 모델 연구",
    speakers: "조정현, 남신, 한재선(현대자동차)",
    order: 1,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 4,
    time: "15:35~15:50",
    label: "+",
    title: "음악 기반 다중감각 중재를 통한 수면 유도 : 주제범위 문헌고찰",
    speakers: "김나현, 윤소정, 정은주(이화여대)",
    order: 2,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 4,
    time: "15:50~16:05",
    label: "",
    title: "미래 모빌리티를 위한 통합 인터랙팅 시스템",
    speakers: "박당희(현대자동차)",
    order: 3,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 4,
    time: "16:05~16:20",
    label: "",
    title: "딥러닝 기술을 활용한 자동차 운전자의 심전도 기반 스트레스 감지",
    speakers: "신기원(고려대), 김성현(현대자동차)",
    order: 4,
  }),
  rowForHeader(itemsHeader, {
    detailSource: "spring-2024",
    sessionNo: 4,
    time: "16:20~16:35",
    label: "",
    title: "음악 기반 가상 엔진음 생성 방법",
    speakers: "이재영, 최두일, 정종인(현대모비스)",
    order: 5,
  }),
]);

for (const ws of [events, details, programs, items]) {
  const range = ws.getUsedRange(true);
  range.format.autofitColumns();
  range.format.autofitRows();
}

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

console.log(outputPath);

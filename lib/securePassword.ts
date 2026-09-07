// 회의록/공지사항 첨부파일 다운로드에 공통으로 쓰이는 비밀번호.
// Vercel 환경변수 MINUTES_PASSWORD로 설정하세요. 값을 넣지 않으면 로컬 개발용 기본값이 쓰입니다.
export const SECURE_DOWNLOAD_PASSWORD = process.env.MINUTES_PASSWORD || "ksnve2026";

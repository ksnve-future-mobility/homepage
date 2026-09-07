// 임원진 회의록 원본 데이터. 서버에서만 사용되고 클라이언트로는 절대 전달되지 않습니다.
// (실제 다운로드 링크는 비밀번호 확인 후 서버 액션(actions.ts)을 통해서만 내려줍니다.)
//
// 회의록이 등록되면 아래 형식으로 항목을 추가하세요. (연 2~3건 정도라 시트 연동 없이 직접 관리)
// url은 구글드라이브 공유 링크를 넣으면 됩니다.
type MeetingMinute = {
  id: string;
  title: string;
  date: string;
  url: string;
};

const meetingMinutes: MeetingMinute[] = [
  {
    id: "2026-1",
    title: "2026년 1차 운영회의",
    date: "2026.09.03",
    url: "https://drive.google.com/file/d/16ImvPfeLQyl43Z6YJ-BVowewYD2YaSkA/view?usp=sharing",
  },
];

export type MeetingMinuteSummary = Omit<MeetingMinute, "url">;

export function getMeetingMinutesList(): MeetingMinuteSummary[] {
  return meetingMinutes.map(({ url: _url, ...rest }) => rest);
}

export function getMeetingMinuteUrl(id: string): string | null {
  return meetingMinutes.find((minute) => minute.id === id)?.url ?? null;
}

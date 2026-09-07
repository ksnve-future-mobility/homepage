"use server";

import { getMeetingMinuteUrl } from "./minutes-data";

// Vercel 환경변수 MINUTES_PASSWORD로 설정하세요. 값을 넣지 않으면 로컬 개발용 기본값이 쓰입니다.
const MINUTES_PASSWORD = process.env.MINUTES_PASSWORD || "ksnve2026";

type UnlockResult = { ok: true; url: string } | { ok: false; error: string };

export async function unlockMeetingMinute(id: string, password: string): Promise<UnlockResult> {
  if (password !== MINUTES_PASSWORD) {
    return { ok: false, error: "비밀번호가 올바르지 않습니다." };
  }

  const url = getMeetingMinuteUrl(id);
  if (!url) {
    return { ok: false, error: "파일을 찾을 수 없습니다." };
  }

  return { ok: true, url };
}

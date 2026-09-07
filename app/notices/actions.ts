"use server";

import { getNoticeAttachmentUrl } from "@/lib/notices";
import { SECURE_DOWNLOAD_PASSWORD } from "@/lib/securePassword";

type UnlockResult = { ok: true; url: string } | { ok: false; error: string };

export async function unlockNoticeAttachment(id: string, password: string): Promise<UnlockResult> {
  if (password !== SECURE_DOWNLOAD_PASSWORD) {
    return { ok: false, error: "비밀번호가 올바르지 않습니다." };
  }

  const url = await getNoticeAttachmentUrl(id);
  if (!url) {
    return { ok: false, error: "파일을 찾을 수 없습니다." };
  }

  return { ok: true, url };
}

"use client";

import { useState, type FormEvent } from "react";
import { unlockMeetingMinute } from "@/app/about/actions";

export default function MinutesDownloadButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await unlockMeetingMinute(id, password);

    setLoading(false);

    if (result.ok) {
      window.open(result.url, "_blank", "noopener,noreferrer");
      setOpen(false);
      setPassword("");
    } else {
      setError(result.error);
    }
  }

  if (!open) {
    return (
      <button type="button" className="minutes-download" onClick={() => setOpen(true)}>
        다운로드
      </button>
    );
  }

  return (
    <form className="minutes-password-form" onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="비밀번호"
        aria-label="회의록 다운로드 비밀번호"
        autoFocus
      />
      <button type="submit" disabled={loading}>
        {loading ? "확인 중" : "확인"}
      </button>
      {error ? <span className="minutes-password-error">{error}</span> : null}
    </form>
  );
}

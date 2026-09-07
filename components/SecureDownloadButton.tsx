"use client";

import { useState, type FormEvent } from "react";

type UnlockResult = { ok: true; url: string } | { ok: false; error: string };

type SecureDownloadButtonProps = {
  id: string;
  unlock: (id: string, password: string) => Promise<UnlockResult>;
  label?: string;
};

export default function SecureDownloadButton({ id, unlock, label = "다운로드" }: SecureDownloadButtonProps) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await unlock(id, password);

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
      <button type="button" className="secure-download" onClick={() => setOpen(true)}>
        {label}
      </button>
    );
  }

  return (
    <form className="secure-password-form" onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="비밀번호"
        aria-label="다운로드 비밀번호"
        autoFocus
      />
      <button type="submit" disabled={loading}>
        {loading ? "확인 중" : "확인"}
      </button>
      {error ? <span className="secure-password-error">{error}</span> : null}
    </form>
  );
}

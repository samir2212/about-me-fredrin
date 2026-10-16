"use client";

import { useEffect, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const t = window.setTimeout(() => setStatus("idle"), 1800);
    return () => clearTimeout(t);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <span className="copy">
      <button type="button" className="btn btn--ghost" onClick={copy}>
        Copy email
      </button>
      <span className={`toast ${status !== "idle" ? "toast--show" : ""}`} role="status" aria-live="polite">
        {status === "copied" ? "Copied!" : status === "failed" ? "Couldn't copy" : ""}
      </span>
    </span>
  );
}

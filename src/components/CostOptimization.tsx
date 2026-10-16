"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/hooks/motion";

export const COST_EVENT = "cost-optimize";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const FROM = 10_000;
const TO = 2_200;
const DURATION_MS = 1600;

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/** Easter egg: a fake AWS bill drops from $10,000 to $2,200 with a burst of clouds. */
export function CostOptimization() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(FROM);
  const [reduced, setReduced] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<Element | null>(null);

  const trigger = useCallback(() => {
    returnFocus.current = document.activeElement;
    setReduced(prefersReducedMotion());
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    if (returnFocus.current instanceof HTMLElement) returnFocus.current.focus();
  }, []);

  // Konami code + custom event from the wordmark.
  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === KONAMI[pos] ? pos + 1 : key === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) {
        pos = 0;
        trigger();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(COST_EVENT, trigger);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(COST_EVENT, trigger);
    };
  }, [trigger]);

  // Count the bill down, then auto-close a few seconds later.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    let frame = 0;
    if (reduced) {
      setAmount(TO);
    } else {
      setAmount(FROM);
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / DURATION_MS, 1);
        setAmount(FROM - (FROM - TO) * (1 - Math.pow(1 - p, 3)));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }
    const auto = window.setTimeout(close, 6000);
    return () => {
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
      clearTimeout(auto);
    };
  }, [open, reduced, close]);

  if (!open) return null;

  const done = Math.round(amount) === TO;

  return (
    <div className="egg" onClick={close}>
      {!reduced && (
        <div className="egg__confetti" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <span
              key={i}
              style={
                {
                  "--x": `${(i * 37) % 100}%`,
                  "--d": `${(i % 6) * 0.12}s`,
                  "--s": `${0.6 + ((i * 13) % 7) / 10}`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}
      <div
        className="egg__bill"
        role="dialog"
        aria-modal="true"
        aria-labelledby="egg-title"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="egg__eyebrow">Cost optimization applied</p>
        <h2 id="egg-title">Monthly AWS bill</h2>
        <p className="egg__was">{usd(FROM)}</p>
        <p className="egg__amount" aria-live="polite">
          {usd(amount)}
        </p>
        <p className={`egg__delta ${done ? "egg__delta--show" : ""}`}>−78% · same traffic, fewer servers</p>
        <button ref={closeRef} type="button" className="btn btn--ghost" onClick={close}>
          Nice, close
        </button>
      </div>
    </div>
  );
}

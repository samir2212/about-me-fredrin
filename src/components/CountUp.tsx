"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/content/profile";
import { prefersReducedMotion, useInViewOnce } from "@/hooks/motion";

const DURATION_MS = 1400;

/** Stat value that counts up when scrolled into view. Server-renders the final value. */
export function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInViewOnce(ref, 0.6);
  const [text, setText] = useState(stat.value);
  const started = useRef(false);

  useEffect(() => {
    const c = stat.countTo;
    if (!c || prefersReducedMotion()) return;
    const format = (n: number) => `${c.prefix ?? ""}${n.toFixed(c.decimals ?? 0)}${c.suffix ?? ""}`;
    if (!inView) {
      // Hold at the start value until visible (only when animation will run).
      if (!started.current) setText(format(c.from));
      return;
    }
    started.current = true;
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setText(p === 1 ? stat.value : format(c.from + (c.to - c.from) * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, stat]);

  return (
    <span ref={ref} className="stat__value">
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{stat.value}</span>
    </span>
  );
}

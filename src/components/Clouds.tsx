"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/hooks/motion";

/** Drifting hero clouds with gentle parallax on scroll and pointer move. */
export function Clouds() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let frame = 0;
    let mx = 0;
    let my = 0;
    const apply = () => {
      frame = 0;
      el.style.setProperty("--scroll", String(Math.min(window.scrollY, 1200)));
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onPointer = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      schedule();
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="clouds" aria-hidden="true">
      <span className="cloud cloud--a" style={{ "--depth": 0.6 } as React.CSSProperties} />
      <span className="cloud cloud--b" style={{ "--depth": 1 } as React.CSSProperties} />
      <span className="cloud cloud--c" style={{ "--depth": 1.6 } as React.CSSProperties} />
      <span className="cloud cloud--d" style={{ "--depth": 0.4 } as React.CSSProperties} />
    </div>
  );
}

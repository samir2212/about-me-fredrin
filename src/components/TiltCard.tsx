"use client";

import { useRef } from "react";
import { prefersReducedMotion } from "@/hooks/motion";

/** Card wrapper that tilts slightly toward the pointer and follows it with a glow. */
export function TiltCard({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLElement> & { className?: string }) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((0.5 - y) * 5).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x - 0.5) * 6).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty("--rx");
    el.style.removeProperty("--ry");
  };

  return (
    <article ref={ref} className={`tilt ${className ?? ""}`} onPointerMove={onMove} onPointerLeave={onLeave} {...rest}>
      {children}
    </article>
  );
}

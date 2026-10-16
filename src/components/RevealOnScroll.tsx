"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/hooks/motion";

/**
 * Fades/slides every `[data-reveal]` element in as it scrolls into view.
 * Content stays visible without JS or with reduced motion: the hidden state
 * only applies once `reveal-ready` is set on <html>.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    // Anything already on screen shows immediately, without a flash.
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-visible");
      else io.observe(el);
    }
    root.classList.add("reveal-ready");
    return () => {
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
  return null;
}

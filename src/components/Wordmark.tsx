"use client";

import { useRef } from "react";
import { COST_EVENT } from "./CostOptimization";

/** Nav wordmark; clicking it 5 times in quick succession fires the easter egg. */
export function Wordmark({ name }: { name: string }) {
  const clicks = useRef<number[]>([]);

  const onClick = () => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 2500), now];
    if (clicks.current.length >= 5) {
      clicks.current = [];
      window.dispatchEvent(new Event(COST_EVENT));
    }
  };

  return (
    <a href="#top" className="wordmark" onClick={onClick}>
      {name.toUpperCase()}
    </a>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useInViewOnce } from "@/hooks/motion";

const TYPE_MS = 45;
const LINE_DELAY_MS = 450;

/** Mini terminal that "deploys" the projects when the Shipped section enters view (~2.5s). */
export function DeployTerminal({ command, lines }: { command: string; lines: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref, 0.5);
  const [typed, setTyped] = useState(command.length);
  const [shown, setShown] = useState(lines.length);
  const [armed, setArmed] = useState(false);

  // Before it is seen, reset to an empty prompt (only when animation will run).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    setTyped(0);
    setShown(0);
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!inView || !armed) return;
    const timers: number[] = [];
    for (let i = 1; i <= command.length; i++) {
      timers.push(window.setTimeout(() => setTyped(i), i * TYPE_MS));
    }
    const typedAt = command.length * TYPE_MS;
    lines.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShown(i + 1), typedAt + (i + 1) * LINE_DELAY_MS));
    });
    return () => timers.forEach(clearTimeout);
  }, [inView, armed, command, lines]);

  const done = typed === command.length && shown === lines.length;

  return (
    <div ref={ref} className="terminal" role="img" aria-label={[command, ...lines].join(". ")}>
      <div className="terminal__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>deploy — zsh</span>
      </div>
      <pre className="terminal__body" aria-hidden="true">
        <span className="terminal__cmd">{command.slice(0, typed)}</span>
        {!done && <span className="terminal__caret" />}
        {lines.slice(0, shown).map((l) => (
          <span key={l} className="terminal__ok">
            {"\n"}
            {l}
          </span>
        ))}
        {done && <span className="terminal__caret" />}
      </pre>
    </div>
  );
}

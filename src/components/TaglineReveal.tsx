"use client";

import { useEffect, useRef } from "react";

// Words start muted and turn full colour one by one as they cross the trigger line.
export function TaglineReveal({ text }: { text: string }) {
  const root = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(".word"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-on", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -35% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <p ref={root} className="heading-2 max-w-[680px]">
      {words.map((w, i) => (
        <span key={i} className="word">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

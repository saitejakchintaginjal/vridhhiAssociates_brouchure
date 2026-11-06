"use client";

import { useEffect, useState } from "react";
import { causes } from "@/data/content";

const W = 400;
const H = 340;

// Marker positions, in the same order as the causes list.
const markers = [
  { x: 352, y: 108 }, // 1 hairline cracks (outer wall)
  { x: 108, y: 34 }, // 2 pooling on the terrace
  { x: 46, y: 148 }, // 3 failed joints and pipe entries
  { x: 252, y: 34 }, // 4 worn out coatings
  { x: 44, y: 284 }, // 5 groundwater and rising damp
  { x: 352, y: 204 }, // 6 leaking bathroom floors
];

const drop = "M0 -7 C4 -1 5 2 0 6 C-5 2 -4 -1 0 -7Z";

function Drop({ x, y, fall, delay = 0 }: { x: number; y: number; fall: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d={drop}
        fill="#22c7db"
        className="leak-drip"
        style={{ ["--fall" as string]: `${fall}px`, animationDelay: `${delay}ms` } as React.CSSProperties}
      />
    </g>
  );
}

// A building cut in half. Pick a numbered point to see how water gets in there.
export function LeakMap() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % causes.length), 4500);
    return () => window.clearInterval(id);
  }, [auto]);

  function pick(i: number) {
    setAuto(false);
    setActive(i);
  }

  const on = (i: number) => (active === i ? "leak-on" : "");
  const current = causes[active];

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-navy/10 bg-white p-4">
        <div className="relative">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full"
            role="img"
            aria-label="Cross section of a building with six numbered points where water usually gets in"
          >
            {/* soil and basement */}
            <rect x="0" y="250" width="400" height="90" fill="#cfe9f0" />
            <rect x="98" y="250" width="204" height="62" fill="#ffffff" />
            <rect x="90" y="250" width="8" height="70" fill="#17407a" />
            <rect x="302" y="250" width="8" height="70" fill="#17407a" />
            <rect x="90" y="312" width="220" height="8" fill="#17407a" />

            {/* walls, floors, roof, parapets */}
            <rect x="90" y="80" width="8" height="170" fill="#0f2a52" />
            <rect x="302" y="80" width="8" height="170" fill="#0f2a52" />
            <rect x="84" y="70" width="232" height="10" fill="#0f2a52" />
            <rect x="84" y="58" width="8" height="12" fill="#0f2a52" />
            <rect x="308" y="58" width="8" height="12" fill="#0f2a52" />
            <rect x="98" y="140" width="204" height="6" fill="#17407a" />
            <rect x="98" y="200" width="204" height="6" fill="#17407a" />
            <rect x="98" y="244" width="204" height="6" fill="#17407a" />
            <rect x="0" y="248" width="90" height="3" fill="#0f2a52" />
            <rect x="310" y="248" width="90" height="3" fill="#0f2a52" />

            {/* windows */}
            {[96, 154, 212].map((y) =>
              [118, 170].map((x) => (
                <rect key={`${x}-${y}`} x={x} y={y} width="34" height="26" rx="2" fill="#d9f6fa" stroke="#7fd3e6" />
              )),
            )}

            {/* 1 hairline crack in the outer wall */}
            <g className={on(0)}>
              <path d="M306 92 l-3 14 l4 14 l-3 14 l3 12" fill="none" stroke="#7fd3e6" strokeWidth="2" strokeLinecap="round" />
              <Drop x={306} y={118} fall={44} />
              <Drop x={306} y={118} fall={44} delay={1200} />
            </g>

            {/* 2 water pooling on the terrace */}
            <g className={on(1)}>
              <ellipse cx="150" cy="68" rx="36" ry="4.5" fill="#7fd3e6" />
              <ellipse cx="150" cy="67" rx="22" ry="3.5" fill="none" stroke="#22c7db" strokeWidth="1.5" className="leak-ripple" />
              <ellipse
                cx="150"
                cy="67"
                rx="22"
                ry="3.5"
                fill="none"
                stroke="#22c7db"
                strokeWidth="1.5"
                className="leak-ripple"
                style={{ animationDelay: "1200ms" }}
              />
              <Drop x={138} y={24} fall={38} />
              <Drop x={164} y={24} fall={38} delay={1200} />
            </g>

            {/* 3 failed joint where a pipe enters the wall */}
            <g className={on(2)}>
              <rect x="62" y="166" width="36" height="9" rx="2" fill="#2b6cb0" />
              <rect x="84" y="163" width="6" height="15" fill="#0f2a52" />
              <Drop x={87} y={180} fall={44} />
              <Drop x={87} y={180} fall={44} delay={1200} />
            </g>

            {/* 4 worn out coating on the roof, seeping into the top floor ceiling */}
            <g className={on(3)}>
              <rect x="214" y="65" width="72" height="5" rx="1" fill="#d9f6fa" stroke="#7fd3e6" strokeDasharray="4 3" />
              <ellipse cx="250" cy="90" rx="28" ry="7" fill="#7fd3e6" className="leak-damp" />
              <Drop x={250} y={98} fall={34} />
            </g>

            {/* 5 groundwater and rising damp at the basement wall */}
            <g className={on(4)}>
              <rect x="64" y="262" width="24" height="56" fill="#7fd3e6" opacity="0.55" className="leak-rise" />
              <rect x="98" y="296" width="72" height="16" rx="3" fill="#7fd3e6" className="leak-damp" />
            </g>

            {/* 6 leaking bathroom floor above the ground floor */}
            <g className={on(5)}>
              <rect x="236" y="193" width="64" height="7" fill="#2b6cb0" />
              <ellipse cx="268" cy="212" rx="26" ry="6" fill="#7fd3e6" className="leak-damp" />
              <Drop x={268} y={208} fall={30} />
              <Drop x={268} y={208} fall={30} delay={1200} />
            </g>
          </svg>

          {markers.map((m, i) => (
            <button
              key={causes[i].title}
              type="button"
              aria-pressed={active === i}
              aria-label={`Point ${i + 1}: ${causes[i].title}`}
              onClick={() => pick(i)}
              className={`absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-[transform,background-color] duration-300 ease-brand hover:scale-110 active:scale-95 ${
                active === i ? "border-white bg-navy text-white" : "border-navy bg-white text-navy"
              }`}
              style={{ left: `${(m.x / W) * 100}%`, top: `${(m.y / H) * 100}%` }}
            >
              {active === i ? (
                <span className="leak-pulse absolute inset-0 rounded-full border-2 border-aqua" aria-hidden="true" />
              ) : null}
              <span className="caption-3">{i + 1}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-4" aria-live="polite">
        <p className="caption-3 uppercase tracking-wider text-navy/60">Point {active + 1} of {causes.length}</p>
        <h4 className="title-2 mt-1 text-navy">{current.title}</h4>
        <p className="body-6 mt-1 text-ink/75">{current.body}</p>
      </div>
    </div>
  );
}

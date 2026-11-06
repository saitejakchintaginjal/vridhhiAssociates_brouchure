"use client";

import { useRef } from "react";

const W = 120; // tower width and depth
const H = 260; // tower height
const WINDOW_COLS = 4;
const WINDOW_ROWS = 8;

const faces = [
  { transform: `translateZ(${W / 2}px)`, color: "#17407a" },
  { transform: `rotateY(90deg) translateZ(${W / 2}px)`, color: "#0f2a52" },
  { transform: `rotateY(180deg) translateZ(${W / 2}px)`, color: "#0b1e3d" },
  { transform: `rotateY(-90deg) translateZ(${W / 2}px)`, color: "#12356a" },
];

const drops = [
  { x: -80, z: 40, delay: 0 },
  { x: -30, z: -50, delay: 500 },
  { x: 20, z: 70, delay: 1100 },
  { x: 70, z: -20, delay: 300 },
  { x: -60, z: -70, delay: 1500 },
  { x: 0, z: 0, delay: 800 },
  { x: 90, z: 60, delay: 1800 },
];

// A tower under a waterproof membrane. Rain falls onto it and ripples out. Leans toward the pointer.
export function HeroScene() {
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (stage.current) {
        stage.current.style.transform = `rotateX(${-14 - y * 14}deg) rotateY(${x * 28}deg)`;
      }
    });
  }

  function onLeave() {
    cancelAnimationFrame(frame.current);
    if (stage.current) stage.current.style.transform = "";
  }

  return (
    <div
      className="scene relative mx-auto h-96 w-full max-w-md md:h-128"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      role="img"
      aria-label="A 3D tower shielded by a waterproof layer while rain runs off it"
    >
      <div
        ref={stage}
        className="stage absolute left-1/2 top-1/2 size-0"
        style={{ transform: "rotateX(-14deg)" }}
      >
        {/* ground ripples */}
        {[0, 1000, 2000].map((d) => (
          <div
            key={d}
            className="ripple absolute rounded-full border-2 border-aqua"
            style={{
              width: 300,
              height: 300,
              left: -150,
              top: -150,
              transform: `translateY(${H / 2}px) rotateX(90deg)`,
              animationDelay: `${d}ms`,
            }}
          >
            <div className="size-full rounded-full" />
          </div>
        ))}
        <div
          className="absolute rounded-full bg-navy-deep"
          style={{
            width: 320,
            height: 320,
            left: -160,
            top: -160,
            transform: `translateY(${H / 2 + 2}px) rotateX(90deg)`,
          }}
        />

        {/* tower */}
        <div className="tower-spin preserve absolute left-0 top-0">
          {faces.map((f, i) => (
            <div
              key={i}
              className="face grid gap-2 p-3"
              style={{
                width: W,
                height: H,
                left: -W / 2,
                top: -H / 2,
                background: f.color,
                transform: f.transform,
                gridTemplateColumns: `repeat(${WINDOW_COLS}, 1fr)`,
                gridTemplateRows: `repeat(${WINDOW_ROWS}, 1fr)`,
              }}
            >
              {Array.from({ length: WINDOW_COLS * WINDOW_ROWS }).map((_, k) => (
                <span
                  key={k}
                  className="rounded-sm"
                  style={{ background: k % 7 === 3 ? "#22c7db" : "rgba(34,199,219,0.22)" }}
                />
              ))}
            </div>
          ))}

          {/* membrane slab on the roof */}
          <div
            className="face rounded-lg border-2 border-aqua bg-aqua/40"
            style={{
              width: 190,
              height: 190,
              left: -95,
              top: -95,
              transform: `translateY(${-H / 2 - 4}px) rotateX(90deg)`,
              backfaceVisibility: "visible",
            }}
          />
          <div
            className="face rounded-lg bg-aqua"
            style={{
              width: 190,
              height: 190,
              left: -95,
              top: -95,
              transform: `translateY(${-H / 2 + 6}px) rotateX(90deg)`,
              backfaceVisibility: "visible",
            }}
          />
        </div>

        {/* rain, always facing the viewer */}
        {drops.map((d, i) => (
          <div
            key={i}
            className="absolute"
            style={{ transform: `translate3d(${d.x}px, ${-H / 2 - 12}px, ${d.z}px)` }}
          >
            <span
              className="rain block h-4 w-2 rounded-full bg-aqua"
              style={{ animationDelay: `${d.delay}ms` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

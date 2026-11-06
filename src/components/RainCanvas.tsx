"use client";

import { useEffect, useRef } from "react";

type Drop = {
  x: number;
  y: number;
  len: number;
  speed: number;
  width: number;
  alpha: number;
  layer: number;
  endY: number;
};
type Ripple = { x: number; y: number; r: number; max: number; alpha: number };

const WIND = 0.18; // sideways drift as a fraction of fall speed
const LAYERS = [
  // far, mid, near: slower, shorter and fainter the further away
  { len: [10, 16], speed: [520, 700], width: 0.8, alpha: [0.3, 0.42], share: 0.5 },
  { len: [16, 26], speed: [820, 1000], width: 1.1, alpha: [0.42, 0.56], share: 0.3 },
  { len: [26, 40], speed: [1100, 1400], width: 1.5, alpha: [0.56, 0.7], share: 0.2 },
];

const rand = (a: number, b: number) => a + Math.random() * (b - a);

// Full screen rain: tapered streaks at three depths, slight wind, and ripples where drops land.
export function RainCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let drops: Drop[] = [];
    const ripples: Ripple[] = [];

    function makeDrop(layer: number, initial: boolean): Drop {
      const L = LAYERS[layer];
      const len = rand(L.len[0], L.len[1]);
      // Some drops land on a surface inside the screen and make a ripple.
      const lands = layer > 0 && Math.random() < 0.4;
      return {
        x: rand(-0.2 * w, w),
        y: initial ? rand(-h, h) : -len,
        len,
        speed: rand(L.speed[0], L.speed[1]),
        width: L.width,
        alpha: rand(L.alpha[0], L.alpha[1]),
        layer,
        endY: lands ? rand(h * 0.55, h * 0.98) : h + len,
      };
    }

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const total = Math.min(170, Math.max(55, Math.round((w * h) / 12000)));
      drops = [];
      LAYERS.forEach((L, layer) => {
        const n = Math.round(total * L.share);
        for (let i = 0; i < n; i++) drops.push(makeDrop(layer, true));
      });
    }

    function frame(t: number) {
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
      last = t;
      ctx!.clearRect(0, 0, w, h);
      ctx!.lineCap = "round";

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        d.y += d.speed * dt;
        d.x += d.speed * WIND * dt;

        if (d.y >= d.endY) {
          if (d.endY < h) {
            ripples.push({ x: d.x, y: d.endY, r: 1, max: rand(6, 14) * (d.layer === 2 ? 1.2 : 0.8), alpha: d.alpha });
          }
          drops[i] = makeDrop(d.layer, false);
          continue;
        }

        const tx = d.x - d.len * WIND;
        const ty = d.y - d.len;
        const g = ctx!.createLinearGradient(tx, ty, d.x, d.y);
        g.addColorStop(0, "rgba(90,170,215,0)");
        g.addColorStop(1, `rgba(90,170,215,${d.alpha})`);
        ctx!.strokeStyle = g;
        ctx!.lineWidth = d.width;
        ctx!.beginPath();
        ctx!.moveTo(tx, ty);
        ctx!.lineTo(d.x, d.y);
        ctx!.stroke();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += 22 * dt;
        const life = r.r / r.max;
        if (life >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        ctx!.strokeStyle = `rgba(90,170,215,${r.alpha * (1 - life)})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.ellipse(r.x, r.y, r.r, r.r * 0.35, 0, 0, Math.PI * 2);
        ctx!.stroke();
      }

      raf = requestAnimationFrame(frame);
    }

    function start() {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(raf);
      else start();
    }

    build();
    start();
    window.addEventListener("resize", build);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-30 size-full" aria-hidden="true" />;
}

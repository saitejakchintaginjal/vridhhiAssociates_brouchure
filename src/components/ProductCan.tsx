import type { Product } from "@/data/products";

const R = 56; // radius
const H = 120; // height
const N = 16; // strips around the cylinder
const STRIP = Math.ceil(2 * Math.PI * R / N) + 1;

const tones: Record<Product["tone"], { body: string; band: string }> = {
  navy: { body: "#0f2a52", band: "#22c7db" },
  aqua: { body: "#22c7db", band: "#0f2a52" },
  white: { body: "#f2f9fb", band: "#17407a" },
  deep: { body: "#0b1e3d", band: "#d9f6fa" },
};

// A rotating paint tub drawn in CSS 3D. Replace with a real photo through `image` in products.ts.
export function ProductCan({ tone }: { tone: Product["tone"] }) {
  const t = tones[tone];
  return (
    <div className="scene relative mx-auto h-64 w-full">
      <div className="preserve absolute left-1/2 top-1/2 size-0" style={{ transform: "rotateX(-16deg)" }}>
        <div className="bob preserve absolute left-0 top-0">
          <div className="can-spin preserve absolute left-0 top-0">
          {Array.from({ length: N }).map((_, i) => (
            <div
              key={i}
              className="face"
              style={{
                width: STRIP,
                height: H,
                left: -STRIP / 2,
                top: -H / 2,
                background: t.body,
                transform: `rotateY(${(360 / N) * i}deg) translateZ(${R}px)`,
              }}
            >
              <div
                className="absolute inset-x-0"
                style={{ top: H * 0.3, height: H * 0.4, background: t.band }}
              />
            </div>
          ))}
          <div
            className="face rounded-full border-4"
            style={{
              width: R * 2,
              height: R * 2,
              left: -R,
              top: -R,
              background: t.body,
              borderColor: t.band,
              transform: `translateY(${-H / 2}px) rotateX(90deg)`,
              backfaceVisibility: "visible",
            }}
          />
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-4 left-1/2 h-4 w-32 -translate-x-1/2 rounded-full bg-navy-deep/20"
        aria-hidden="true"
      />
    </div>
  );
}

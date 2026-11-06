// Exploded view of a waterproofed roof: four layers that float apart.
const layers = [
  { name: "Protective screed", color: "#d9f6fa", lift: 150, text: "#0b1e3d" },
  { name: "Waterproofing membrane", color: "#22c7db", lift: 100, text: "#0b1e3d" },
  { name: "Primer coat", color: "#17407a", lift: 50, text: "#ffffff" },
  { name: "Concrete slab", color: "#0f2a52", lift: 0, text: "#ffffff" },
];

export function LayerStack() {
  return (
    <div
      className="scene relative mx-auto h-96 w-full max-w-md md:h-128"
      role="img"
      aria-label="Exploded 3D view of roof layers: concrete slab, primer, waterproofing membrane and protective screed"
    >
      <div
        className="preserve absolute left-1/2 top-1/2 size-0"
        style={{ transform: "rotateX(58deg) rotateZ(-38deg)" }}
      >
        {layers.map((l, i) => (
          <div
            key={l.name}
            className="preserve absolute"
            style={{ left: -130, top: -130, width: 260, height: 260, transform: `translateZ(${i === 3 ? -20 : 0}px)` }}
          >
            <div
              className="layer-float absolute inset-0 flex items-end justify-start rounded-lg border border-white/30 p-3"
              style={
                {
                  background: l.color,
                  color: l.text,
                  ["--lift" as string]: `${l.lift + 20}px`,
                  animationDelay: `${(3 - i) * 150}ms`,
                } as React.CSSProperties
              }
            >
              <span className="caption-3 uppercase tracking-wider">{l.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Exploded 3D view of layers that float apart. Names run from top layer to bottom layer.
const palette = [
  { color: "#d9f6fa", lift: 150, text: "#0b1e3d" },
  { color: "#22c7db", lift: 100, text: "#0b1e3d" },
  { color: "#17407a", lift: 50, text: "#ffffff" },
  { color: "#0f2a52", lift: 0, text: "#ffffff" },
];

export function LayerStack({
  names,
  label,
}: {
  names: [string, string, string, string];
  label: string;
}) {
  return (
    <div className="scene relative mx-auto h-80 w-full max-w-md md:h-96 lg:h-128" role="img" aria-label={label}>
      <div
        className="preserve absolute left-1/2 top-1/2 size-0"
        style={{ transform: "rotateX(58deg) rotateZ(-38deg)" }}
      >
        {names.map((name, i) => {
          const p = palette[i];
          return (
            <div
              key={name}
              className="preserve absolute"
              style={{ left: -130, top: -130, width: 260, height: 260, transform: `translateZ(${i === 3 ? -20 : 0}px)` }}
            >
              <div
                className="layer-float absolute inset-0 flex items-end justify-start rounded-lg border border-white/30 p-3"
                style={
                  {
                    background: p.color,
                    color: p.text,
                    ["--lift" as string]: `${p.lift + 20}px`,
                    animationDelay: `${(3 - i) * 150}ms`,
                  } as React.CSSProperties
                }
              >
                <span className="caption-3 uppercase tracking-wider">{name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

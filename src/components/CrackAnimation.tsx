// Cross section of a roof slab. Rain lands on the slab, runs into hairline cracks, and shows up below as a damp patch.
const cracks = [
  { x: 110, d: "M110 106 l6 20 l-8 18 l7 22 l-5 22 l2 12", dx: 4, delay: 0 },
  { x: 200, d: "M200 106 l-5 24 l9 20 l-6 24 l4 26", dx: 2, delay: 1400 },
  { x: 290, d: "M290 106 l5 22 l-7 22 l6 20 l-3 30", dx: 3, delay: 2800 },
];

const drop = "M0 -8 C5 -1 6 3 0 7 C-6 3 -5 -1 0 -8Z";

export function CrackAnimation() {
  return (
    <svg
      viewBox="0 30 400 240"
      className="h-auto w-full"
      role="img"
      aria-label="Rain landing on a roof slab, running into hairline cracks and appearing as damp patches on the ceiling below"
    >
      {/* slab with a screed layer on top */}
      <rect x="20" y="110" width="360" height="90" rx="4" fill="#17407a" />
      <rect x="20" y="102" width="360" height="10" rx="3" fill="#0f2a52" />

      {cracks.map((c) => (
        <g key={c.x}>
          {/* ripple where the drop lands */}
          <ellipse
            cx={c.x}
            cy="103"
            rx="16"
            ry="4"
            fill="none"
            stroke="#22c7db"
            strokeWidth="1.5"
            className="crack-ripple"
            style={{ animationDelay: `${c.delay}ms` }}
          />
          <path d={c.d} fill="none" stroke="#0b1e3d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* damp patch and drip on the ceiling below */}
          <ellipse
            cx={c.x + c.dx + 8}
            cy="204"
            rx="30"
            ry="9"
            fill="#7fd3e6"
            className="crack-damp"
            style={{ animationDelay: `${c.delay}ms` }}
          />
          <g transform={`translate(${c.x + c.dx + 8} 214)`}>
            <path
              d={drop}
              fill="#2b6cb0"
              className="crack-drip"
              style={{ animationDelay: `${c.delay}ms` }}
            />
          </g>

          {/* the falling drop that enters the crack */}
          <g transform={`translate(${c.x} 102)`}>
            <path
              d={drop}
              fill="#22c7db"
              className="crack-drop"
              style={{ ["--dx" as string]: `${c.dx}px`, animationDelay: `${c.delay}ms` } as React.CSSProperties}
            />
          </g>
        </g>
      ))}
    </svg>
  );
}

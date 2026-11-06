// The same cracked slab, now with a waterproof membrane. Rain beads up, splashes and runs off.
// The cracks and the ceiling below stay dry.
const cracks = [
  { x: 110, d: "M110 106 l6 20 l-8 18 l7 22 l-5 22 l2 12", run: 64, delay: 0 },
  { x: 200, d: "M200 106 l-5 24 l9 20 l-6 24 l4 26", run: -64, delay: 1400 },
  { x: 290, d: "M290 106 l5 22 l-7 22 l6 20 l-3 30", run: 64, delay: 2800 },
];

const drop = "M0 -8 C5 -1 6 3 0 7 C-6 3 -5 -1 0 -8Z";

export function SealedSlab() {
  return (
    <svg
      viewBox="0 30 400 240"
      className="h-auto w-full"
      role="img"
      aria-label="Rain landing on a waterproofed roof slab, beading up and running off while the cracks and the ceiling below stay dry"
    >
      {/* slab, screed and the waterproof membrane on top */}
      <rect x="20" y="110" width="360" height="90" rx="4" fill="#17407a" />
      <rect x="20" y="102" width="360" height="10" rx="3" fill="#0f2a52" />
      <rect x="20" y="94" width="360" height="9" rx="3" fill="#22c7db" />

      {cracks.map((c) => (
        <g key={c.x}>
          <path d={c.d} fill="none" stroke="#0b1e3d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* splash droplets */}
          <g transform={`translate(${c.x} 92)`}>
            <circle r="2.4" fill="#7fd3e6" className="seal-splash-l" style={{ animationDelay: `${c.delay}ms` }} />
            <circle r="2.4" fill="#7fd3e6" className="seal-splash-r" style={{ animationDelay: `${c.delay}ms` }} />
          </g>

          {/* the drop lands, flattens and runs along the surface */}
          <g transform={`translate(${c.x} 90)`}>
            <path
              d={drop}
              fill="#22c7db"
              className="seal-drop"
              style={{ ["--run" as string]: `${c.run}px`, animationDelay: `${c.delay}ms` } as React.CSSProperties}
            />
          </g>
        </g>
      ))}

      {/* dry ceiling badge */}
      <g transform="translate(200 238)">
        <circle r="15" fill="#22c7db" className="seal-badge" />
        <path
          d="M-6 0 l4 4 l8 -8"
          fill="none"
          stroke="#0b1e3d"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

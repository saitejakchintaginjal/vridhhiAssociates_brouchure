"use client";

import { useState } from "react";
import { CrackAnimation } from "@/components/CrackAnimation";
import { SealedSlab } from "@/components/SealedSlab";

const modes = [
  {
    sealed: false,
    label: "Without waterproofing",
    caption: "Rain runs into the cracks, travels through the slab and shows up as damp patches on the ceiling.",
  },
  {
    sealed: true,
    label: "With waterproofing",
    caption:
      "The membrane seals the surface. Rain beads up and runs off, so the cracks and the ceiling below stay dry.",
  },
];

// Switch between a cracked slab with and without a waterproof membrane.
export function SlabProtection() {
  const [sealed, setSealed] = useState(true);
  const current = modes.find((m) => m.sealed === sealed)!;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2 rounded-xl border border-navy/10 bg-white p-2" role="group" aria-label="Compare the slab">
        {modes.map((m) => (
          <button
            key={m.label}
            type="button"
            aria-pressed={sealed === m.sealed}
            onClick={() => setSealed(m.sealed)}
            className={`button-sm min-h-11 rounded-lg px-3 py-2 transition-[background-color,color] duration-300 ease-brand ${
              sealed === m.sealed ? "bg-navy text-white" : "text-navy hover:bg-aqua-soft"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-4">
        {/* key restarts the animation cleanly when the mode changes */}
        {sealed ? <SealedSlab key="sealed" /> : <CrackAnimation key="open" />}
      </div>

      <p className="caption-1 text-ink/70" aria-live="polite">
        {current.caption}
      </p>
    </div>
  );
}

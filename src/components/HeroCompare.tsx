"use client";

import { useState } from "react";
import { Drop, Phone, ShieldCheck } from "@phosphor-icons/react";
import { company } from "@/data/company";

// Drawn walls stand in for photos. Swap <Wall /> for real before and after images when available.
function Wall({ leaking }: { leaking: boolean }) {
  return (
    <div className={`absolute inset-0 ${leaking ? "bg-navy-mid" : "bg-aqua-soft"}`}>
      {leaking ? (
        <>
          <span className="absolute left-8 top-10 size-24 rounded-full bg-navy-deep/60" />
          <span className="absolute left-20 top-20 size-16 rounded-full bg-navy-deep/50" />
          <span className="absolute right-12 top-16 size-20 rounded-full bg-navy-deep/60" />
          {[16, 40, 72].map((left, i) => (
            <span
              key={left}
              className="rain absolute top-32 block h-4 w-2 rounded-full bg-aqua"
              style={{ left: `${left}%`, animationDelay: `${i * 600}ms` }}
            />
          ))}
          <p className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-navy-deep px-3 py-2 text-white">
            <Drop size={20} className="text-aqua" aria-hidden="true" />
            <span className="caption-1">Before: damp patches and seepage</span>
          </p>
        </>
      ) : (
        <p className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-navy px-3 py-2 text-white">
          <ShieldCheck size={20} className="text-aqua" aria-hidden="true" />
          <span className="caption-1">After: sealed and dry</span>
        </p>
      )}
    </div>
  );
}

export function HeroCompare() {
  const [p, setP] = useState(50);

  return (
    <section className="overflow-hidden bg-navy text-white">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-32 md:grid-cols-2 md:px-6 md:pb-24 md:pt-40">
        <div className="flex flex-col items-start gap-6">
          <p className="eyebrow">{company.name}</p>
          <h1 className="heading-1 hero-heading">
            From damp walls
            <br className="hidden md:block" /> to a dry building.
          </h1>
          <p className="body-3 hero-sub text-white/80">
            Drag the slider to compare a leaking wall with one we have sealed. Terrace, wall and bathroom waterproofing
            in Hubballi, for homes and commercial buildings.
          </p>
          <a href={company.tel} className="btn-primary">
            <Phone size={20} weight="bold" aria-hidden="true" />
            Call {company.phone}
          </a>
        </div>

        <div className="relative h-80 overflow-hidden rounded-2xl border border-white/15 focus-within:outline-2 focus-within:outline-aqua md:h-112">
          <Wall leaking={false} />
          <div className="absolute inset-0 overflow-hidden" style={{ transform: `translateX(${p - 100}%)` }}>
            <div className="absolute inset-0" style={{ transform: `translateX(${100 - p}%)` }}>
              <Wall leaking />
            </div>
          </div>
          <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${p}%` }} aria-hidden="true">
            <span className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-aqua" />
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={p}
            onChange={(e) => setP(Number(e.target.value))}
            aria-label="Compare before and after waterproofing"
            className="absolute inset-0 size-full cursor-ew-resize opacity-0"
          />
        </div>
      </div>
    </section>
  );
}

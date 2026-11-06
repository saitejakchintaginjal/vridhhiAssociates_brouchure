"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { ProductCan } from "@/components/ProductCan";
import { Tilt } from "@/components/Tilt";
import type { Product } from "@/data/products";

const details = [
  { key: "how", label: "How it works" },
  { key: "where", label: "Where to use it" },
  { key: "usage", label: "Usage" },
] as const;

// One product per screen. Swipe, drag, use the arrows or the arrow keys to reach the next one.
export function ProductCarousel({ items }: { items: Product[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
      });
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  function go(i: number) {
    const el = scroller.current;
    if (!el) return;
    const next = Math.min(items.length - 1, Math.max(0, i));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: next * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  }

  function down(e: React.PointerEvent<HTMLDivElement>) {
    const el = scroller.current;
    if (e.pointerType !== "mouse" || !el) return;
    drag.current = { x: e.clientX, left: el.scrollLeft };
    el.style.scrollSnapType = "none";
  }
  function move(e: React.PointerEvent<HTMLDivElement>) {
    const el = scroller.current;
    if (!drag.current || !el) return;
    el.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  }
  function up() {
    const el = scroller.current;
    if (!drag.current || !el) return;
    drag.current = null;
    el.style.scrollSnapType = "";
    go(Math.round(el.scrollLeft / el.clientWidth));
  }

  return (
    <div className="relative bg-navy text-white">
      <div
        ref={scroller}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Products and how each one is applied"
        onKeyDown={onKey}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        className="no-scrollbar flex cursor-grab snap-x snap-mandatory overflow-x-auto active:cursor-grabbing"
      >
        {items.map((p, i) => (
          <article
            key={p.id}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className="flex min-h-screen w-full shrink-0 snap-center items-center"
          >
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 pb-32 pt-24 md:px-8 lg:grid-cols-2">
              <div className="rounded-2xl bg-aqua-soft p-6">
                {p.image ? (
                  <Image src={p.image} alt={p.name} width={640} height={480} className="h-72 w-full rounded-lg object-contain md:h-96" />
                ) : (
                  <div className="origin-center md:scale-125 lg:scale-150 lg:py-12">
                    <Tilt max={4}>
                      <ProductCan tone={p.tone} />
                    </Tilt>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-6">
                <header className="flex flex-col gap-2">
                  <p className="eyebrow">
                    Product {i + 1} of {items.length} · {p.brand}
                  </p>
                  <h3 className="heading-2">{p.name}</h3>
                </header>
                <dl className="flex flex-col gap-4">
                  {details.map((d) => (
                    <div key={d.key} className="rounded-2xl border border-white/15 bg-white/10 p-6">
                      <dt className="title-3 text-aqua">{d.label}</dt>
                      <dd className="body-3 mt-2 text-white/85">{p[d.key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Previous product"
          className="flex size-11 items-center justify-center rounded-full border border-white/40 transition-[transform,opacity] duration-300 ease-brand hover:-translate-y-0.5 active:scale-95 disabled:opacity-30"
        >
          <ArrowLeft size={20} weight="bold" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2" role="group" aria-label="Choose a product">
          {items.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Product ${i + 1}`}
              aria-current={index === i}
              className={`h-2 rounded-full transition-[width,background-color] duration-500 ease-brand ${
                index === i ? "w-8 bg-aqua" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === items.length - 1}
          aria-label="Next product"
          className="flex size-11 items-center justify-center rounded-full border border-white/40 transition-[transform,opacity] duration-300 ease-brand hover:-translate-y-0.5 active:scale-95 disabled:opacity-30"
        >
          <ArrowRight size={20} weight="bold" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { company, nav } from "@/data/company";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Mark the menu link whose section sits on the middle line of the screen.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const link = nav.find((n) => n.ids.includes(entry.target.id));
          setActive(link ? link.href : null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.flatMap((n) => n.ids).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="Primary"
          className="flex w-full items-center justify-between gap-6 rounded-2xl border border-white/20 bg-navy-deep/75 px-3 py-2 text-white backdrop-blur-md md:w-auto"
        >
          <Link href="/#top" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Image
              src="/logo.jpg"
              alt="Vridhhi Associates logo"
              width={40}
              height={40}
              className="size-10 rounded-full bg-white object-cover"
              priority
            />
            <span className="title-3">{company.name}</span>
          </Link>

          <ul className="hidden items-center gap-2 md:flex">
            {nav.map((item) => {
              const on = active === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={on ? "location" : undefined}
                    className={`button-sm flex min-h-11 items-center rounded-lg px-3 py-2 transition-[background-color,opacity] duration-300 ease-brand hover:bg-white/10 ${
                      on ? "bg-aqua text-navy-deep hover:bg-aqua" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="relative size-11 rounded-lg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-white transition-transform duration-500 ease-brand ${
                open ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-white transition-transform duration-500 ease-brand ${
                open ? "-rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col justify-center gap-4 bg-navy-deep/95 px-6 backdrop-blur-xl transition-opacity duration-500 ease-brand md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {nav.map((item, i) => {
          const on = active === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              aria-current={on ? "location" : undefined}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${Math.min(i * 60, 400)}ms` : "0ms" }}
              className={`heading-3 transition-[opacity,transform] duration-500 ease-brand ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              } ${on ? "text-aqua" : "text-white"}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </>
  );
}

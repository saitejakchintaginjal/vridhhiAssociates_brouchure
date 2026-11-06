"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone } from "@phosphor-icons/react";
import { company, nav } from "@/data/company";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="Primary"
          className="flex w-full items-center justify-between gap-6 rounded-2xl border border-white/20 bg-navy-deep/75 px-3 py-2 text-white backdrop-blur-md md:w-auto"
        >
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
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
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`button-sm block rounded-lg px-3 py-2 transition-[background-color,opacity] duration-300 ease-brand hover:bg-white/10 ${
                      active ? "bg-aqua text-navy-deep hover:bg-aqua" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a href={company.tel} className="btn button-sm bg-white text-navy-deep">
                <Phone size={16} weight="bold" aria-hidden="true" />
                Call now
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="relative size-10 rounded-lg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute left-2 top-1/2 h-0.5 w-6 bg-white transition-transform duration-500 ease-brand ${
                open ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`absolute left-2 top-1/2 h-0.5 w-6 bg-white transition-transform duration-500 ease-brand ${
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
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              aria-current={active ? "page" : undefined}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${Math.min(i * 60, 400)}ms` : "0ms" }}
              className={`heading-3 transition-[opacity,transform] duration-500 ease-brand ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              } ${active ? "text-aqua" : "text-white"}`}
            >
              {item.label}
            </Link>
          );
        })}
        <a
          href={company.tel}
          tabIndex={open ? 0 : -1}
          style={{ transitionDelay: open ? `${Math.min(nav.length * 60, 400)}ms` : "0ms" }}
          className={`btn-primary mt-4 self-start transition-[opacity,transform] duration-500 ease-brand ${
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Phone size={20} weight="bold" aria-hidden="true" />
          {company.phone}
        </a>
      </div>
    </>
  );
}

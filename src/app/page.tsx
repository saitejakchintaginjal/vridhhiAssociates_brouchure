import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ImageSquare, Phone, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { HeroScene } from "@/components/HeroScene";
import { Reveal } from "@/components/Reveal";
import { TaglineReveal } from "@/components/TaglineReveal";
import { Tilt } from "@/components/Tilt";
import { company, facts } from "@/data/company";
import { gallery } from "@/data/gallery";

export const metadata: Metadata = {
  title: "About Vridhhi Associates | Waterproofing company in Hubballi",
  description:
    "Vridhhi Associates is a construction and waterproofing company in Hubballi, delivering residential and commercial projects with precision, durability and on time execution.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-navy text-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-32 md:grid-cols-2 md:px-6 md:pb-24 md:pt-40">
          <div className="flex flex-col items-start gap-6">
            <p className="eyebrow">{company.name}</p>
            <h1 className="heading-1 hero-heading">
              Waterproofing that keeps
              <br className="hidden md:block" /> Hubballi buildings dry.
            </h1>
            <p className="body-3 hero-sub text-white/80">{company.description}</p>
            <a href={company.tel} className="btn-primary">
              <Phone size={20} weight="bold" aria-hidden="true" />
              Call {company.phone}
            </a>
            <p className="caption-1 flex items-center gap-2 text-white/70">
              <ShieldCheck size={20} className="text-aqua" aria-hidden="true" />
              Residential and commercial projects across Hubballi, Karnataka
            </p>
          </div>
          <HeroScene />
        </div>
      </section>

      {/* Tagline reveal */}
      <section className="bg-mist">
        <div className="section py-24 md:py-24">
          <TaglineReveal text="Water finds every gap. We seal each one before it becomes a leak." />
        </div>
      </section>

      {/* About */}
      <section className="bg-white" aria-labelledby="about-title">
        <div className="section grid gap-12 md:grid-cols-2">
          <Reveal className="flex flex-col gap-6">
            <p className="eyebrow">About us</p>
            <h2 id="about-title" className="heading-3">
              A construction company that treats water as the first problem to solve.
            </h2>
            <p className="body-3 text-ink/80">
              {company.name} works on homes, apartments and commercial buildings in Hubballi. We handle construction
              and waterproofing, and we plan every job around precision, durability and finishing on the date we promise.
            </p>
            <p className="body-3 text-ink/80">
              {"{{Add two lines about the founder, the team and how the company started}}"}
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 100}>
                <Tilt className="card h-full">
                  <p className="caption-3 uppercase tracking-wider text-navy/60">{f.label}</p>
                  <p className="heading-4 mt-2 text-navy">{f.value}</p>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-mist" aria-labelledby="gallery-title">
        <div className="section">
          <Reveal className="mb-12 flex flex-col gap-3">
            <p className="eyebrow">Our work</p>
            <h2 id="gallery-title" className="heading-3 max-w-[680px]">
              Recent jobs from our sites.
            </h2>
            <p className="caption-1 text-ink/60">
              These tiles are dummy photos. Real project photos will replace them.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g, i) => (
              <Reveal key={g.caption} delay={(i % 3) * 100}>
                <Tilt max={6}>
                  <figure className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
                    <div className="relative flex aspect-4/3 items-center justify-center bg-navy text-aqua">
                      {g.src ? (
                        <Image src={g.src} alt={g.caption} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
                      ) : (
                        <ImageSquare size={48} weight="duotone" aria-hidden="true" />
                      )}
                    </div>
                    <figcaption className="flex flex-col gap-1 p-4">
                      <span className="title-3 text-navy">{g.caption}</span>
                      <span className="caption-4 text-ink/60">{g.place}</span>
                    </figcaption>
                  </figure>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Next page */}
      <section className="bg-navy text-white">
        <div className="section flex flex-col items-start gap-6">
          <h2 className="heading-3 max-w-[680px]">Not sure if your building needs waterproofing?</h2>
          <p className="body-3 max-w-[680px] text-white/80">
            Read what waterproofing is, which services we offer and why it matters before the next monsoon.
          </p>
          <Link href="/waterproofing" className="btn-primary">
            See what waterproofing is
            <ArrowRight size={20} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  Bathtub,
  CaretDown,
  Coins,
  Drop,
  FirstAid,
  House,
  ImageSquare,
  Mountains,
  Plant,
  SprayBottle,
  Wall,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import { LayerStack } from "@/components/LayerStack";
import { LeakMap } from "@/components/LeakMap";
import { SlabProtection } from "@/components/SlabProtection";
import { ProductCarousel } from "@/components/ProductCarousel";
import { Reveal } from "@/components/Reveal";
import { TaglineReveal } from "@/components/TaglineReveal";
import { Tilt } from "@/components/Tilt";
import { company, facts } from "@/data/company";
import { benefits, causes, faqs, services, steps } from "@/data/content";
import { gallery } from "@/data/gallery";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Vridhhi Associates | Waterproofing services in Hubballi",
  description:
    "Waterproofing for terraces, walls, bathrooms, tanks and basements in Hubballi. Residential and commercial projects by Vridhhi Associates.",
};

const serviceIcons = [House, Wall, Bathtub, SprayBottle, Mountains, FirstAid];
const benefitIcons = [Drop, Wrench, Plant, Coins];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section id="top" className="overflow-hidden bg-navy-deep text-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <p className="eyebrow">About {company.name}</p>
            <h1 className="heading-1 hero-heading">
              We Build.
              <br /> We Protect.
            </h1>
            <p className="body-2 hero-sub text-white/90">{company.description}</p>
            <dl className="grid w-full max-w-md grid-cols-2 gap-4">
              {facts.map((f) => (
                <div key={f.label} className="card-dark">
                  <dt className="caption-3 uppercase tracking-wider text-white/60">{f.label}</dt>
                  <dd className="heading-5 mt-2 text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
            <a href="#services" className="btn-primary">
              <ArrowDown size={20} weight="bold" aria-hidden="true" />
              Explore our services
            </a>
          </div>
          <LayerStack
            names={["Protective screed", "Waterproofing membrane", "Primer coat", "Concrete slab"]}
            label="Exploded 3D view of roof layers: concrete slab, primer, waterproofing membrane and protective screed"
          />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-mist" aria-labelledby="services-title">
        <div className="section">
          <Reveal className="mb-12 flex flex-col gap-3">
            <p className="eyebrow text-navy">Waterproofing</p>
            <h2 id="services-title" className="heading-3 max-w-[680px]">
              Every part of the building where water can get in.
            </h2>
            <p className="body-3 max-w-[680px] text-ink/80">
              Dry ceilings, sound structures and no more monsoon leaks. We waterproof terraces, walls, bathrooms, tanks and
              basements across Hubballi.
            </p>
          </Reveal>

          <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Reveal className="flex min-w-0 flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="heading-5 text-navy">What is waterproofing?</h3>
                <p className="body-3 text-ink/80">
                  Waterproofing is a protective layer added to roofs, walls, floors and tanks. It seals the surface, so
                  water cannot soak into concrete and brick or travel through cracks.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="title-2 text-navy">Where leaks usually start</h3>
                <ul className="flex flex-col gap-3">
                  {causes.map((c, i) => (
                    <li key={c.title} className="flex gap-3">
                      <span className="caption-3 flex size-6 shrink-0 items-center justify-center rounded-full bg-navy text-white" aria-hidden="true">
                        {i + 1}
                      </span>
                      <p className="body-6 text-ink/75">
                        <span className="body-4 text-navy">{c.title}.</span> {c.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100} className="min-w-0">
              <LeakMap />
            </Reveal>
          </div>

          <Reveal className="mb-6">
            <h3 className="title-1 text-navy">What we waterproof</h3>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <Reveal key={s.title} delay={(i % 3) * 100}>
                  <Tilt className="flex h-full items-start gap-3 rounded-xl border border-navy/10 bg-white p-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-aqua-soft text-navy">
                      <Icon size={20} weight="duotone" aria-hidden="true" />
                    </span>
                    <div>
                      <h4 className="title-3 text-navy">{s.title}</h4>
                      <p className="body-6 mt-1 text-ink/70">{s.body}</p>
                    </div>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section id="why" className="bg-white" aria-labelledby="why-title">
        <div className="section grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex min-w-0 flex-col gap-6">
            <p className="eyebrow text-navy">Why waterproof</p>
            <h2 id="why-title" className="heading-3">
              Water damage starts small and gets expensive.
            </h2>
            <p className="body-3 text-ink/80">
              Left alone, a small leak spreads through slabs and walls. Waterproofing stops it early, so repairs stay small
              and the building stays sound.
            </p>
            <ul className="flex flex-col gap-4">
              {benefits.map((b, i) => {
                const Icon = benefitIcons[i];
                return (
                  <li key={b.title} className="flex gap-3">
                    <Icon size={24} weight="duotone" className="mt-0.5 shrink-0 text-navy" aria-hidden="true" />
                    <div>
                      <h3 className="title-3 text-navy">{b.title}</h3>
                      <p className="body-6 text-ink/70">{b.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Reveal delay={100} className="min-w-0">
            <SlabProtection />
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section id="how" className="bg-mist" aria-labelledby="how-title">
        <div className="section">
          <Reveal className="mb-12 flex flex-col gap-3">
            <p className="eyebrow text-navy">How we work</p>
            <h2 id="how-title" className="heading-3 max-w-[680px]">
              Three steps from leak to dry.
            </h2>
          </Reveal>
          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.n}>
                <Reveal delay={i * 100} className="h-full">
                  <Tilt className="card h-full">
                    <span className="heading-4 text-aqua">{s.n}</span>
                    <h3 className="title-2 mt-2 text-navy">{s.title}</h3>
                    <p className="body-6 mt-2 text-ink/70">{s.body}</p>
                  </Tilt>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Products: one per screen, scroll sideways */}
      <section id="products" aria-labelledby="products-title">
        <h2 id="products-title" className="sr-only">
          Products and methods
        </h2>
        <ProductCarousel items={products} />
      </section>

      {/* Tagline reveal */}
      <section id="promise" className="bg-mist">
        <div className="section py-24 md:py-24">
          <TaglineReveal text="Water finds every gap. We seal each one before it becomes a leak." />
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-white" aria-labelledby="gallery-title">
        <div className="section">
          <Reveal className="mb-12 flex flex-col gap-3">
            <p className="eyebrow text-navy">Our work</p>
            <h2 id="gallery-title" className="heading-3 max-w-[680px]">
              Recent jobs from our sites.
            </h2>
            <p className="caption-1 text-ink/60">These tiles are dummy photos. Real project photos will replace them.</p>
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

      {/* FAQ */}
      <section id="faq" className="bg-mist" aria-labelledby="faq-title">
        <div className="section">
          <Reveal className="mb-12 flex flex-col gap-3">
            <p className="eyebrow text-navy">Questions</p>
            <h2 id="faq-title" className="heading-3 max-w-[680px]">
              Common questions about waterproofing.
            </h2>
          </Reveal>
          <div className="flex max-w-3xl flex-col gap-4">
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <details className="group rounded-2xl border border-navy/10 bg-white p-6">
                  <summary className="title-2 flex cursor-pointer list-none items-center justify-between gap-4 text-navy">
                    {f.q}
                    <CaretDown
                      size={20}
                      weight="bold"
                      className="shrink-0 transition-transform duration-500 ease-brand group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="body-3 mt-4 text-ink/75">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bathtub,
  Buildings,
  Drop,
  FirstAid,
  House,
  Mountains,
  Phone,
  Plant,
  Wall,
  Wrench,
  Coins,
  SprayBottle,
} from "@phosphor-icons/react/dist/ssr";
import { LayerStack } from "@/components/LayerStack";
import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/Tilt";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "What is waterproofing and our services | Vridhhi Associates",
  description:
    "Learn what waterproofing is, why buildings need it, and the terrace, wall, bathroom and tank waterproofing services Vridhhi Associates offers in Hubballi.",
};

const benefits = [
  {
    icon: Drop,
    title: "Stops leaks and damp patches",
    body: "A sealed surface blocks water before it reaches ceilings, walls and wiring.",
  },
  {
    icon: Wrench,
    title: "Protects the steel inside concrete",
    body: "Water that reaches reinforcement rusts it and cracks the slab. A barrier keeps the structure sound.",
  },
  {
    icon: Plant,
    title: "Keeps mould and peeling paint away",
    body: "Dry walls stay clean, and the air inside the home stays healthier.",
  },
  {
    icon: Coins,
    title: "Saves repair costs later",
    body: "Treating a surface once costs less than repeated patch repairs and repainting after every monsoon.",
  },
];

const services = [
  { icon: House, title: "Terrace and roof", body: "Membrane and coating systems for slabs that face sun and monsoon rain." },
  { icon: Wall, title: "External wall leakage", body: "Crack sealing and protective coats for walls that seep after heavy rain." },
  { icon: Bathtub, title: "Bathrooms and wet areas", body: "Floor and wall treatment that stops water travelling to the room below." },
  { icon: SprayBottle, title: "Water tanks and sumps", body: "Safe lining for overhead and underground tanks." },
  { icon: Mountains, title: "Basement and foundation", body: "Barriers against groundwater and rising damp." },
  { icon: FirstAid, title: "Leak finding and repair", body: "We trace the source first, then treat it, so the fix lasts." },
];

const steps = [
  { n: "01", title: "Inspect", body: "We visit the site and find where the water enters, not just where it shows." },
  { n: "02", title: "Prepare and treat", body: "We repair cracks, clean the surface and apply the chosen system in the right coats." },
  { n: "03", title: "Test and hand over", body: "We check the finished area and explain how to look after it." },
];

export default function WaterproofingPage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-mist">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-32 md:grid-cols-2 md:px-6 md:pb-24 md:pt-40">
          <div className="flex flex-col items-start gap-6">
            <p className="eyebrow text-navy">Waterproofing explained</p>
            <h1 className="heading-1 max-w-[680px] text-navy-deep">What is waterproofing, and why does your building need it?</h1>
            <p className="body-3 max-w-[680px] text-ink/80">
              Waterproofing is a protective barrier added to roofs, walls, floors and tanks. Concrete and brick look solid
              but soak up water. The barrier stops that water from passing through.
            </p>
            <a href={company.tel} className="btn-primary">
              <Phone size={20} weight="bold" aria-hidden="true" />
              Call {company.phone}
            </a>
          </div>
          <LayerStack />
        </div>
      </section>

      {/* Why it is useful */}
      <section className="bg-white" aria-labelledby="why-title">
        <div className="section">
          <Reveal className="mb-12 flex flex-col gap-3">
            <p className="eyebrow">Why it is useful</p>
            <h2 id="why-title" className="heading-3 max-w-[680px]">
              Water damage starts small and gets expensive.
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 100}>
                <Tilt className="card flex h-full gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-aqua-soft text-navy">
                    <b.icon size={24} weight="duotone" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="title-2 text-navy">{b.title}</h3>
                    <p className="body-6 text-ink/70">{b.body}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-navy text-white" aria-labelledby="services-title">
        <div className="section">
          <Reveal className="mb-12 flex flex-col gap-3">
            <p className="eyebrow">Our services</p>
            <h2 id="services-title" className="heading-3 max-w-[680px]">
              Waterproofing for every part of the building.
            </h2>
            <p className="body-3 max-w-[680px] text-white/80">
              For homes, apartments and commercial buildings in Hubballi.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 100}>
                <Tilt className="card-dark h-full">
                  <s.icon size={32} weight="duotone" className="text-aqua" aria-hidden="true" />
                  <h3 className="title-2 mt-4">{s.title}</h3>
                  <p className="body-6 mt-2 text-white/70">{s.body}</p>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-mist" aria-labelledby="how-title">
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

      {/* Next page */}
      <section className="bg-navy-deep text-white">
        <div className="section flex flex-col items-start gap-6">
          <Buildings size={40} className="text-aqua" aria-hidden="true" />
          <h2 className="heading-3 max-w-[680px]">See the products and methods behind the work.</h2>
          <Link href="/methods" className="btn-primary">
            View our methods
            <ArrowRight size={20} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

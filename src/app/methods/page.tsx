import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone } from "@phosphor-icons/react/dist/ssr";
import { ProductCan } from "@/components/ProductCan";
import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/Tilt";
import { company } from "@/data/company";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Waterproofing methods and products | Vridhhi Associates",
  description:
    "The waterproofing products Vridhhi Associates uses in Hubballi, how each one works, where to use it and how it is applied.",
};

const details = [
  { key: "how", label: "How it works" },
  { key: "where", label: "Where to use it" },
  { key: "usage", label: "Usage" },
] as const;

export default function MethodsPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-40">
          <p className="eyebrow">Methods and products</p>
          <h1 className="heading-1 hero-heading">The products we use, and how each one is applied.</h1>
          <p className="body-3 hero-sub text-white/80">
            Each product suits a different surface. Here is how it works, where it fits and how we use it on site.
          </p>
        </div>
      </section>

      <section className="bg-mist" aria-label="Products">
        <div className="section flex flex-col gap-16">
          {products.map((p, i) => (
            <Reveal key={p.id}>
              <article className="card grid items-center gap-8 md:grid-cols-5">
                <div className={`md:col-span-2 ${i % 2 === 1 ? "md:order-last" : ""}`}>
                  <div className="rounded-xl bg-aqua-soft p-4">
                    {p.image ? (
                      <Image src={p.image} alt={p.name} width={480} height={360} className="h-64 w-full rounded-lg object-contain" />
                    ) : (
                      <Tilt max={4}>
                        <ProductCan tone={p.tone} />
                      </Tilt>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-6 md:col-span-3">
                  <header className="flex flex-col gap-1">
                    <p className="caption-3 uppercase tracking-wider text-navy/60">
                      Product {i + 1} · {p.brand}
                    </p>
                    <h2 className="heading-4 text-navy">{p.name}</h2>
                  </header>
                  <dl className="flex flex-col gap-4">
                    {details.map((d) => (
                      <div key={d.key} className="flex flex-col gap-1">
                        <dt className="title-4 text-navy">{d.label}</dt>
                        <dd className="body-6 text-ink/70">{p[d.key]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-navy-deep text-white">
        <div className="section flex flex-col items-start gap-6">
          <h2 className="heading-3 max-w-[680px]">Tell us where the water is getting in.</h2>
          <p className="body-3 max-w-[680px] text-white/80">
            We will visit, inspect and recommend the right product for the surface.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={company.tel} className="btn-primary">
              <Phone size={20} weight="bold" aria-hidden="true" />
              Call {company.phone}
            </a>
            <Link href="/waterproofing" className="btn-ghost-light">
              <ArrowLeft size={20} weight="bold" aria-hidden="true" />
              Back to services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

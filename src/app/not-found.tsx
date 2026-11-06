import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center bg-navy text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 md:px-6">
        <p className="eyebrow">Error 404</p>
        <h1 className="heading-1 hero-heading">This page has a leak. We could not find it.</h1>
        <p className="body-3 max-w-[680px] text-white/80">The page you asked for does not exist or has moved.</p>
        <Link href="/" className="btn-primary">
          <ArrowLeft size={20} weight="bold" aria-hidden="true" />
          Back to About us
        </Link>
      </div>
    </section>
  );
}

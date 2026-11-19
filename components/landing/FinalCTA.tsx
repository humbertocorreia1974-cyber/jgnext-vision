import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { landing } from "@/content/landing";

export function FinalCTA() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/70 p-10 text-center backdrop-blur-md md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.18),transparent_65%)]"
          />
          <div className="relative">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
              {landing.finalCta.headline}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-fg-muted">{landing.finalCta.sub}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-medium text-brand-fg transition-all duration-150 hover:opacity-90"
              >
                {landing.finalCta.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-6 py-3 text-sm font-medium text-fg backdrop-blur-sm transition-all duration-150 hover:bg-white/5"
              >
                Já tenho conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

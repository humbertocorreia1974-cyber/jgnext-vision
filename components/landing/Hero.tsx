import Link from "next/link";
import { ArrowRight, ShieldCheck, Cpu, Camera } from "lucide-react";
import { landing } from "@/content/landing";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.18),transparent_60%)]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-fg-muted backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {landing.hero.badge}
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-fg md:text-5xl lg:text-6xl">
            {landing.hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
            {landing.hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-medium text-brand-fg transition-all duration-150 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {landing.hero.cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/70 px-5 py-3 text-sm font-medium text-fg backdrop-blur-sm transition-all duration-150 hover:bg-white/5"
            >
              Entrar na central
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-fg-muted">
            <li className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden /> LGPD por arquitetura
            </li>
            <li className="inline-flex items-center gap-2">
              <Cpu className="h-4 w-4 text-accent" aria-hidden /> IA self-hosted
            </li>
            <li className="inline-flex items-center gap-2">
              <Camera className="h-4 w-4 text-accent" aria-hidden /> RTSP/ONVIF
            </li>
          </ul>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-lg border border-border bg-surface/70 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <div className="flex items-center gap-2 text-xs text-fg-muted">
                <span className="h-2 w-2 rounded-full bg-red-500/70" />
                <span className="h-2 w-2 rounded-full bg-amber-500/70" />
                <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
                <span className="ml-2 font-mono">gateway-01 · portaria</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                online
              </span>
            </div>

            <div className="relative aspect-video bg-bg">
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),transparent_50%),radial-gradient(circle_at_30%_40%,rgba(34,211,238,0.15),transparent_60%)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="absolute left-[18%] top-[28%] h-[42%] w-[26%] rounded-sm border-2 border-accent bg-accent/10 shadow-[0_0_24px_rgba(34,211,238,0.35)]">
                <span className="absolute -top-6 left-0 rounded-sm bg-accent px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent-fg">
                  person · 0.94
                </span>
              </div>

              <div className="absolute bottom-3 left-3 rounded-md border border-border bg-bg/80 px-2.5 py-1.5 font-mono text-[10px] text-fg-muted backdrop-blur-sm">
                <div>SSD MobileNet v2 · cv2.dnn</div>
                <div className="text-accent">inferência local · 42ms</div>
              </div>

              <div className="absolute right-3 top-3 rounded-md border border-border bg-bg/80 px-2.5 py-1.5 font-mono text-[10px] text-fg-muted backdrop-blur-sm">
                <div>22:14:07</div>
                <div className="text-emerald-400">zona: área_restrita</div>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-border border-t border-border text-center">
              <div className="px-3 py-3">
                <div className="font-display text-lg font-semibold text-fg">4</div>
                <div className="text-[10px] uppercase tracking-wide text-fg-muted">câmeras</div>
              </div>
              <div className="px-3 py-3">
                <div className="font-display text-lg font-semibold text-accent">1</div>
                <div className="text-[10px] uppercase tracking-wide text-fg-muted">evento</div>
              </div>
              <div className="px-3 py-3">
                <div className="font-display text-lg font-semibold text-fg">0</div>
                <div className="text-[10px] uppercase tracking-wide text-fg-muted">incidentes</div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-full bg-accent/20 blur-3xl md:block" />
        </div>
      </div>
    </section>
  );
}

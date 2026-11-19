import {
  Cpu,
  Camera,
  ShieldCheck,
  Wrench,
  Bell,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { landing } from "@/content/landing";

const ICONS: Record<string, LucideIcon> = {
  Cpu,
  Camera,
  ShieldCheck,
  Wrench,
  Bell,
  Building2,
};

export function BentoFeatures() {
  const [a, b, c, d, e, f] = landing.features;

  const Cell = ({
    icon,
    title,
    body,
    className = "",
  }: {
    icon: string;
    title: string;
    body: string;
    className?: string;
  }) => {
    const Icon = ICONS[icon] ?? Cpu;
    return (
      <div
        className={`group relative overflow-hidden rounded-lg border border-border bg-surface/60 p-6 backdrop-blur-sm transition-all duration-200 hover:border-accent/40 hover:bg-surface/80 ${className}`}
      >
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg/60 text-accent">
          <Icon className="h-4 w-4" aria-hidden />
        </div>
        <h3 className="mt-4 font-display text-base font-semibold text-fg">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{body}</p>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
    );
  };

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">
            Plataforma
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            Tudo que uma operação de segurança precisa — em um só lugar
          </h2>
          <p className="mt-4 text-fg-muted">
            Da ingestão da câmera ao contrato assinado. Sem colar cinco ferramentas
            com fita adesiva.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          <Cell {...a} className="md:col-span-4" />
          <Cell {...b} className="md:col-span-2" />
          <Cell {...c} className="md:col-span-2" />
          <Cell {...d} className="md:col-span-2" />
          <Cell {...e} className="md:col-span-2" />
          <Cell {...f} className="md:col-span-6" />
        </div>
      </div>
    </section>
  );
}

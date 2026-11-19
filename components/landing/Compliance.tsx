import { ShieldCheck, Lock, FileCheck2, Building2 } from "lucide-react";

export function Compliance() {
  const items = [
    {
      icon: ShieldCheck,
      title: "LGPD por arquitetura",
      body: "Vídeo contínuo nunca sai do site. Só o frame do evento é enviado — minimização de dados na prática.",
    },
    {
      icon: Lock,
      title: "Isolamento por cliente/site",
      body: "Toda query é filtrada por posse. Um cliente nunca vê dado de outro, nem por engano de código.",
    },
    {
      icon: FileCheck2,
      title: "Auditoria imutável",
      body: "Quem viu, quem classificou, quem descartou, quando. Hash encadeado em cada ação sobre alarme.",
    },
    {
      icon: Building2,
      title: "Alarme físico via parceiro",
      body: "Contact ID/SIA exige central licenciada (Lei 14.967/2024). Integramos com central homologada — não operamos como central.",
    },
  ];

  return (
    <section className="border-b border-border bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">
            Compliance
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            Feito pra passar no jurídico do cliente
          </h2>
          <p className="mt-4 text-fg-muted">
            Segurança eletrônica com IA só vende se o DPO assinar embaixo. Por isso
            a conformidade está na arquitetura, não no contrato.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {items.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex gap-4 rounded-lg border border-border bg-surface/60 p-6 backdrop-blur-sm"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-bg/60 text-accent">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-fg">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 text-xs text-fg-muted">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg/60 px-3 py-1">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden /> LGPD
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg/60 px-3 py-1">
            <Lock className="h-3.5 w-3.5 text-accent" aria-hidden /> RBAC por papel
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg/60 px-3 py-1">
            <FileCheck2 className="h-3.5 w-3.5 text-accent" aria-hidden /> Trilha imutável
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg/60 px-3 py-1">
            <Building2 className="h-3.5 w-3.5 text-accent" aria-hidden /> Multi-tenant
          </span>
        </div>
      </div>
    </section>
  );
}

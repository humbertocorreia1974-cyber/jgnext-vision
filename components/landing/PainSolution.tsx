import { X, Check } from "lucide-react";

export function PainSolution() {
  const pains = [
    "Câmeras antigas gravando 24/7 e ninguém olhando o monitor",
    "Operador humano perdendo evento crítico no meio de 300 alertas",
    "Vídeo contínuo subindo pra nuvem de terceiro — jurídico travando",
    "Planilha pra O.S., outro sistema pro estoque, contrato no Word",
    "Fornecedor cobrando por câmera e forçando troca de hardware",
  ];

  const solutions = [
    "IA self-hosted detecta pessoa/veículo no gateway e só sobe o frame do evento",
    "Fila de triagem com SLA e severidade — operador foca no que importa",
    "Vídeo contínuo nunca sai do site. LGPD por arquitetura, não por promessa",
    "O.S. com app do técnico, estoque em comodato e contratos no mesmo sistema",
    "Você paga por site monitorado. Conecte quantas câmeras RTSP/ONVIF já tiver",
  ];

  return (
    <section className="border-b border-border bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">
            Antes e depois
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            O problema não é a câmera. É o que acontece depois do alarme.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-bg/40 p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-fg-muted">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                <X className="h-3.5 w-3.5" aria-hidden />
              </span>
              Sem JGNext Vision
            </div>
            <ul className="mt-5 space-y-3">
              {pains.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-fg-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-400/60" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-lg border border-accent/30 bg-surface/70 p-6 backdrop-blur-sm">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_60%)]"
            />
            <div className="relative flex items-center gap-2 text-xs uppercase tracking-wider text-accent">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Check className="h-3.5 w-3.5" aria-hidden />
              </span>
              Com JGNext Vision
            </div>
            <ul className="relative mt-5 space-y-3">
              {solutions.map((s) => (
                <li key={s} className="flex gap-3 text-sm text-fg">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

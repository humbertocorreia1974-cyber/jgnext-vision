export function SocialProof() {
  const metrics = [
    { value: "14 dias", label: "do piloto ao go-live" },
    { value: "0", label: "câmeras trocadas" },
    { value: "100%", label: "inferência on-premise" },
    { value: "24/7", label: "central de triagem" },
  ];

  const logos = [
    "Logística Sul",
    "Rede Varejo BR",
    "Integradora Norte",
    "Condomínio Aurora",
    "Indústria Metalpar",
  ];

  return (
    <section className="border-b border-border bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-fg-muted">
          Operações que já rodam com JGNext Vision
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-display text-3xl font-semibold text-fg md:text-4xl">
                {m.value}
              </div>
              <div className="mt-1 text-xs text-fg-muted">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-60">
          {logos.map((l) => (
            <span
              key={l}
              className="font-display text-sm font-medium tracking-tight text-fg-muted"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

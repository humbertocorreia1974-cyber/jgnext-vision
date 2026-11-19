import { Camera, Cpu, Bell, Wrench } from "lucide-react";
import { landing } from "@/content/landing";

const ICONS = [Camera, Cpu, Bell, Wrench];

export function HowItWorks() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">
            Como funciona
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            Do RTSP ao contrato, sem sair da sua rede
          </h2>
          <p className="mt-4 text-fg-muted">
            Pipeline validado: pré-filtro de movimento em CPU, inferência local
            com SSD MobileNet v2 (Apache 2.0) e só o frame do evento sobe.
          </p>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-4">
          {landing.steps.map((s, i) => {
            const Icon = ICONS[i] ?? Camera;
            return (
              <li
                key={s.title}
                className="relative rounded-lg border border-border bg-surface/60 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg/60 text-accent">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="font-mono text-xs text-fg-muted">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-sm font-semibold text-fg">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {s.body}
                </p>
                {i < landing.steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-2 top-1/2 hidden h-px w-4 bg-border md:block"
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-10 overflow-hidden rounded-lg border border-border bg-bg/60">
          <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[11px] text-fg-muted">
            <span>gateway pipeline</span>
            <span className="text-accent">CPU · sem GPU</span>
          </div>
          <div className="grid gap-0 divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
            {[
              { k: "captura", v: "RTSP/ONVIF", d: "frame a 5fps" },
              { k: "pré-filtro", v: "OpenCV", d: "background subtraction" },
              { k: "inferência", v: "cv2.dnn", d: "SSD MobileNet v2 COCO" },
              { k: "evento", v: "POST /api/gateway/events", d: "só o frame do momento" },
            ].map((row) => (
              <div key={row.k} className="px-4 py-4">
                <div className="text-[10px] uppercase tracking-wider text-fg-muted">
                  {row.k}
                </div>
                <div className="mt-1 font-mono text-sm text-fg">{row.v}</div>
                <div className="mt-0.5 text-xs text-fg-muted">{row.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

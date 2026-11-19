import Link from "next/link";
import { landing } from "@/content/landing";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="font-display text-lg font-semibold text-fg">{landing.name}</p>
            <p className="mt-3 text-sm text-fg-muted">{landing.footer.tagline}</p>
          </div>
          {landing.footer.columns.map((col) => (
            <div key={col.title}>
              <p className="font-display text-sm font-medium text-fg">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-fg-muted md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {landing.name}. Todos os direitos reservados.</p>
          <p>Feito no Brasil · IA self-hosted · LGPD by design</p>
        </div>
      </div>
    </footer>
  );
}

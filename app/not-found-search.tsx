"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SUGGESTIONS = [
  { label: "Central de eventos", href: "/events" },
  { label: "Câmeras e sensores", href: "/cameras" },
  { label: "Ordens de serviço", href: "/service-orders" },
  { label: "Contratos e mensalidades", href: "/contracts" },
  { label: "Estoque de equipamentos", href: "/inventory" },
  { label: "Painel administrativo", href: "/admin" },
];

export function NotFoundSearch() {
  const router = useRouter();
  const [term, setTerm] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = term.trim();
    if (!value) return;
    const match = SUGGESTIONS.find((s) =>
      s.label.toLowerCase().includes(value.toLowerCase()),
    );
    router.push(match ? match.href : `/events?q=${encodeURIComponent(value)}`);
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-2"
        role="search"
        aria-label="Buscar rota ou recurso"
      >
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted"
            aria-hidden
          />
          <Input
            name="q"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar por evento, câmera, O.S., contrato…"
            className="pl-9"
            aria-label="Buscar recurso"
          />
        </div>
        <Button type="submit" variant="primary" size="md">
          Buscar
        </Button>
      </form>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.href}
            type="button"
            onClick={() => router.push(s.href)}
            className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-fg-muted transition-all duration-150 hover:border-brand/40 hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

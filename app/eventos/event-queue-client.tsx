'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Ev = {
  id: string;
  type: string;
  objectClass: string | null;
  confidence: number | null;
  severity: string;
  status: string;
  snapshotUrl: string | null;
  occurredAt: string;
  slaDeadline: string | null;
  siteName: string;
  siteCode: string | null;
  cameraName: string | null;
  cameraZone: string | null;
  ruleName: string | null;
  assignedToName: string | null;
};

const sevColor: Record<string, string> = {
  critica: 'border-red-500/50 bg-red-500/10 text-red-400',
  alta: 'border-orange-500/50 bg-orange-500/10 text-orange-400',
  media: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
  baixa: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
};

export function EventQueueClient({ events }: { events: Ev[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState<string | null>(null);
  const [discardFor, setDiscardFor] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  async function act(id: string, action: string, extra: Record<string, unknown> = {}) {
    setBusy(id);
    try {
      const res = await fetch(`/api/events/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...extra }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setToast(j.error || 'Falha na ação');
      } else {
        setToast(
          action === 'view'
            ? 'Evento marcado como visto'
            : action === 'classify'
            ? 'Evento classificado'
            : action === 'discard'
            ? 'Evento descartado'
            : 'Evento escalado para incidente'
        );
        startTransition(() => router.refresh());
      }
    } catch {
      setToast('Erro de rede');
    } finally {
      setBusy(null);
      setDiscardFor(null);
      setReason('');
      setTimeout(() => setToast(null), 3000);
    }
  }

  return (
    <div className="space-y-3">
      {toast && (
        <div className="rounded-md border border-brand/40 bg-brand/10 px-3 py-2 text-sm text-brand">
          {toast}
        </div>
      )}
      {events.map((e) => {
        const overdue =
          e.slaDeadline &&
          new Date(e.slaDeadline).getTime() < Date.now() &&
          ['novo', 'em_triagem'].includes(e.status);
        return (
          <Card key={e.id}>
            <CardBody>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="h-32 w-full shrink-0 overflow-hidden rounded-md border border-border bg-bg md:w-48">
                  {e.snapshotUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={e.snapshotUrl}
                      alt={`Snapshot do evento em ${e.siteName}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-fg-muted">
                      Sem snapshot
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                        sevColor[e.severity] || sevColor.media
                      }`}
                    >
                      {e.severity.toUpperCase()}
                    </span>
                    <span className="rounded-full border border-border bg-surface/70 px-2 py-0.5 text-xs text-fg-muted">
                      {e.status}
                    </span>
                    {overdue && (
                      <span className="rounded-full border border-red-500/50 bg-red-500/10 px-2 py-0.5 text-xs text-red-400">
                        SLA estourado
                      </span>
                    )}
                    {e.objectClass && (
                      <span className="text-xs text-fg-muted">
                        {e.objectClass}
                        {e.confidence ? ` · ${(e.confidence * 100).toFixed(0)}%` : ''}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-fg">
                    <strong>{e.siteName}</strong>
                    {e.siteCode ? ` · ${e.siteCode}` : ''}
                    {e.cameraName ? ` · ${e.cameraName}` : ''}
                    {e.cameraZone ? ` (${e.cameraZone})` : ''}
                  </div>
                  <div className="text-xs text-fg-muted">
                    {new Date(e.occurredAt).toLocaleString('pt-BR')}
                    {e.ruleName ? ` · Regra: ${e.ruleName}` : ''}
                    {e.assignedToName ? ` · Atribuído a ${e.assignedToName}` : ''}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={busy === e.id}
                      onClick={() => act(e.id, 'view')}
                    >
                      Ver
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={busy === e.id}
                      onClick={() => act(e.id, 'classify', { classification: 'verdadeiro' })}
                    >
                      Classificar
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={busy === e.id}
                      onClick={() => setDiscardFor(discardFor === e.id ? null : e.id)}
                    >
                      Descartar
                    </Button>
                    <Button
                      size="sm"
                      disabled={busy === e.id}
                      onClick={() => act(e.id, 'escalate')}
                    >
                      Escalar
                    </Button>
                  </div>

                  {discardFor === e.id && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <input
                        value={reason}
                        onChange={(ev) => setReason(ev.target.value)}
                        placeholder="Motivo do descarte (falso positivo, animal, etc.)"
                        className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg"
                      />
                      <Button
                        size="sm"
                        disabled={busy === e.id || !reason.trim()}
                        onClick={() => act(e.id, 'discard', { reason })}
                      >
                        Confirmar descarte
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        );
      })}
      {pending && <p className="text-xs text-fg-muted">Atualizando fila…</p>}
    </div>
  );
}

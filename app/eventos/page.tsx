import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardTitle, CardBody } from '@/components/ui/card';
import { EventQueueClient } from './event-queue-client';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Central de Eventos e Alarmes | JGNext Vision',
  description:
    'Fila de triagem com priorização por severidade e SLA. Ver, classificar, descartar ou escalar eventos de IA em tempo real.',
  openGraph: {
    title: 'Central de Eventos e Alarmes | JGNext Vision',
    description:
      'Fila de triagem com priorização por severidade e SLA para eventos de detecção por IA.',
    type: 'website',
  },
};

export default async function EventosPage({
  searchParams,
}: {
  searchParams: { status?: string; severity?: string; siteId?: string; sla?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/login');
  if (!['admin', 'operador'].includes(session.user.role)) redirect('/portal');

  const where: any = {};
  if (searchParams.status) where.status = searchParams.status;
  if (searchParams.severity) where.severity = searchParams.severity;
  if (searchParams.siteId) where.siteId = searchParams.siteId;
  if (searchParams.sla === '1') {
    where.slaDeadline = { lt: new Date() };
    where.status = { in: ['novo', 'em_triagem'] };
  }

  const [events, sites, counts] = await Promise.all([
    prisma.event.findMany({
      where,
      orderBy: [{ severity: 'desc' }, { occurredAt: 'desc' }],
      take: 100,
      include: {
        site: { select: { id: true, name: true, code: true } },
        camera: { select: { id: true, name: true, zone: true } },
        detectionRule: { select: { id: true, name: true } },
        assignedTo: { select: { id: true, name: true } },
      },
    }),
    prisma.site.findMany({
      select: { id: true, name: true, code: true },
      orderBy: { name: 'asc' },
    }),
    prisma.event.groupBy({
      by: ['status'],
      _count: { _all: true },
    }),
  ]);

  const statusCounts: Record<string, number> = {};
  for (const c of counts) statusCounts[c.status] = c._count._all;

  const overdue = await prisma.event.count({
    where: {
      slaDeadline: { lt: new Date() },
      status: { in: ['novo', 'em_triagem'] },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-fg">
            Central de Eventos e Alarmes
          </h1>
          <p className="mt-1 text-sm text-fg-muted">
            Triagem em tempo real com priorização por severidade e SLA.
          </p>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="rounded-full border border-border bg-surface/70 px-3 py-1 text-fg-muted">
            Novos: <strong className="text-fg">{statusCounts['novo'] || 0}</strong>
          </span>
          <span className="rounded-full border border-border bg-surface/70 px-3 py-1 text-fg-muted">
            Em triagem: <strong className="text-fg">{statusCounts['em_triagem'] || 0}</strong>
          </span>
          <span
            className={`rounded-full border px-3 py-1 ${
              overdue > 0
                ? 'border-red-500/40 bg-red-500/10 text-red-400'
                : 'border-border bg-surface/70 text-fg-muted'
            }`}
          >
            SLA estourado: <strong>{overdue}</strong>
          </span>
        </div>
      </div>

      <Card>
        <CardTitle>Filtros</CardTitle>
        <CardBody>
          <form className="grid gap-3 md:grid-cols-5" method="get">
            <select
              name="status"
              defaultValue={searchParams.status || ''}
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg"
            >
              <option value="">Todos os status</option>
              <option value="novo">Novo</option>
              <option value="em_triagem">Em triagem</option>
              <option value="classificado">Classificado</option>
              <option value="descartado">Descartado</option>
              <option value="escalado">Escalado</option>
            </select>
            <select
              name="severity"
              defaultValue={searchParams.severity || ''}
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg"
            >
              <option value="">Todas as severidades</option>
              <option value="critica">Crítica</option>
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
            <select
              name="siteId"
              defaultValue={searchParams.siteId || ''}
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg"
            >
              <option value="">Todos os sites</option>
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} {s.code ? `(${s.code})` : ''}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg-muted">
              <input
                type="checkbox"
                name="sla"
                value="1"
                defaultChecked={searchParams.sla === '1'}
                className="accent-brand"
              />
              Só SLA estourado
            </label>
            <button
              type="submit"
              className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-fg transition-all duration-150 hover:opacity-90"
            >
              Aplicar filtros
            </button>
          </form>
        </CardBody>
      </Card>

      {events.length === 0 ? (
        <Card>
          <CardBody>
            <div className="py-10 text-center">
              <p className="text-fg-muted">
                Nenhum evento encontrado com os filtros atuais.
              </p>
              <a
                href="/eventos"
                className="mt-3 inline-block text-sm text-brand hover:underline"
              >
                Limpar filtros
              </a>
            </div>
          </CardBody>
        </Card>
      ) : (
        <EventQueueClient
          events={events.map((e) => ({
            id: e.id,
            type: e.type,
            objectClass: e.objectClass,
            confidence: e.confidence,
            severity: e.severity,
            status: e.status,
            snapshotUrl: e.snapshotUrl,
            occurredAt: e.occurredAt.toISOString(),
            slaDeadline: e.slaDeadline ? e.slaDeadline.toISOString() : null,
            siteName: e.site.name,
            siteCode: e.site.code,
            cameraName: e.camera?.name || null,
            cameraZone: e.camera?.zone || null,
            ruleName: e.detectionRule?.name || null,
            assignedToName: e.assignedTo?.name || null,
          }))}
        />
      )}
    </div>
  );
}

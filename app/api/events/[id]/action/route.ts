import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createHash } from 'crypto';

export const dynamic = 'force-dynamic';

type Action = 'view' | 'classify' | 'discard' | 'escalate';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  const role = session.user.role;
  if (!['admin', 'operador'].includes(role)) {
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const action = body.action as Action;
  const reason = (body.reason as string) || null;
  const classification = (body.classification as string) || null;

  if (!['view', 'classify', 'discard', 'escalate'].includes(action)) {
    return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
  }

  const event = await prisma.event.findUnique({ where: { id: params.id } });
  if (!event) {
    return NextResponse.json({ error: 'Evento não encontrado' }, { status: 404 });
  }

  const now = new Date();
  const before = {
    status: event.status,
    viewedAt: event.viewedAt,
    classifiedAt: event.classifiedAt,
    discardedAt: event.discardedAt,
    escalatedAt: event.escalatedAt,
  };

  const data: any = {};
  if (action === 'view') {
    data.viewedAt = now;
    data.viewedById = session.user.id;
    if (event.status === 'novo') data.status = 'em_triagem';
  } else if (action === 'classify') {
    data.classifiedAt = now;
    data.status = 'classificado';
    data.metadata = { ...(event.metadata as any || {}), classification };
  } else if (action === 'discard') {
    data.discardedAt = now;
    data.discardReason = reason;
    data.status = 'descartado';
  } else if (action === 'escalate') {
    data.escalatedAt = now;
    data.status = 'escalado';
    data.assignedToId = session.user.id;
  }

  const updated = await prisma.event.update({
    where: { id: params.id },
    data,
  });

  // Incidente automático ao escalar
  if (action === 'escalate') {
    await prisma.incident.create({
      data: {
        siteId: event.siteId,
        eventId: event.id,
        reportedById: session.user.id,
        assignedToId: session.user.id,
        title: `Incidente escalado: ${event.objectClass || event.type}`,
        description: reason || 'Evento escalado pela central de triagem.',
        severity: event.severity,
        status: 'aberto',
      },
    });
  }

  // Trilha de auditoria imutável (hash encadeado)
  const lastLog = await prisma.auditLog.findFirst({
    orderBy: { createdAt: 'desc' },
    select: { hash: true },
  });
  const payload = JSON.stringify({
    userId: session.user.id,
    eventId: event.id,
    action,
    before,
    after: data,
    at: now.toISOString(),
    prev: lastLog?.hash || 'genesis',
  });
  const hash = createHash('sha256').update(payload).digest('hex');

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      eventId: event.id,
      action,
      entity: 'Event',
      entityId: event.id,
      before,
      after: data,
      hash,
      ipAddress: request.headers.get('x-forwarded-for') || null,
      userAgent: request.headers.get('user-agent') || null,
    },
  });

  return NextResponse.json({ ok: true, event: updated });
}

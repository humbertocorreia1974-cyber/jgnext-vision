import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  if (!['admin', 'operador'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const before = await prisma.detectionRule.findUnique({ where: { id: params.id } });
  if (!before) {
    return NextResponse.json({ error: 'Regra não encontrada' }, { status: 404 });
  }

  const data: any = {};
  for (const k of [
    'name',
    'description',
    'objectClass',
    'zone',
    'scheduleStart',
    'scheduleEnd',
    'daysOfWeek',
    'minConfidence',
    'severity',
    'slaMinutes',
    'active',
  ]) {
    if (k in body) data[k] = body[k];
  }

  const rule = await prisma.detectionRule.update({
    where: { id: params.id },
    data,
  });

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: 'update',
      entity: 'DetectionRule',
      entityId: rule.id,
      before: { active: before.active, severity: before.severity },
      after: { active: rule.active, severity: rule.severity },
    },
  });

  return NextResponse.json({ rule });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  if (session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Apenas admin' }, { status: 403 });
  }

  const before = await prisma.detectionRule.findUnique({ where: { id: params.id } });
  if (!before) {
    return NextResponse.json({ error: 'Regra não encontrada' }, { status: 404 });
  }

  await prisma.detectionRule.delete({ where: { id: params.id } });
  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: 'delete',
      entity: 'DetectionRule',
      entityId: params.id,
      before: { name: before.name, siteId: before.siteId },
    },
  });

  return NextResponse.json({ ok: true });
}

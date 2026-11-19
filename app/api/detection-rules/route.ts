import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const siteId = searchParams.get('siteId') || undefined;

  const where: any = {};
  if (siteId) where.siteId = siteId;
  if (session.user.role === 'cliente') {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { clientId: true },
    });
    if (!user?.clientId) return NextResponse.json({ rules: [] });
    where.site = { clientId: user.clientId };
  }

  const rules = await prisma.detectionRule.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      site: { select: { id: true, name: true, code: true } },
      createdBy: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json({ rules });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  if (!['admin', 'operador'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const {
    siteId,
    name,
    description,
    objectClass,
    zone,
    scheduleStart,
    scheduleEnd,
    daysOfWeek,
    minConfidence,
    severity,
    slaMinutes,
  } = body;

  if (!siteId || !name || !objectClass) {
    return NextResponse.json(
      { error: 'siteId, name e objectClass são obrigatórios' },
      { status: 400 }
    );
  }

  const rule = await prisma.detectionRule.create({
    data: {
      siteId,
      createdById: session.user.id,
      name,
      description: description || null,
      objectClass,
      zone: zone || null,
      scheduleStart: scheduleStart || null,
      scheduleEnd: scheduleEnd || null,
      daysOfWeek: daysOfWeek || null,
      minConfidence: typeof minConfidence === 'number' ? minConfidence : 0.5,
      severity: severity || 'media',
      slaMinutes: typeof slaMinutes === 'number' ? slaMinutes : 30,
      active: true,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: 'create',
      entity: 'DetectionRule',
      entityId: rule.id,
      after: { name: rule.name, siteId: rule.siteId, severity: rule.severity },
    },
  });

  return NextResponse.json({ rule }, { status: 201 });
}

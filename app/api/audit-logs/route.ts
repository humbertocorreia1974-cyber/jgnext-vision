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
  if (session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Apenas admin' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const entity = searchParams.get('entity') || undefined;
  const action = searchParams.get('action') || undefined;
  const userId = searchParams.get('userId') || undefined;
  const entityId = searchParams.get('entityId') || undefined;

  const where: any = {};
  if (entity) where.entity = entity;
  if (action) where.action = action;
  if (userId) where.userId = userId;
  if (entityId) where.entityId = entityId;

  const logs = await prisma.auditLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 200,
    include: {
      user: { select: { id: true, name: true, email: true, role: true } },
      event: { select: { id: true, type: true, severity: true, status: true } },
      incident: { select: { id: true, title: true, status: true } },
    },
  });

  return NextResponse.json({ logs });
}

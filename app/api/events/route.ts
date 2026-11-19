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
  const status = searchParams.get('status') || undefined;
  const severity = searchParams.get('severity') || undefined;
  const siteId = searchParams.get('siteId') || undefined;
  const slaOnly = searchParams.get('sla') === '1';

  const where: any = {};
  if (status) where.status = status;
  if (severity) where.severity = severity;
  if (siteId) where.siteId = siteId;
  if (slaOnly) {
    where.slaDeadline = { lt: new Date() };
    where.status = { in: ['novo', 'em_triagem'] };
  }

  // Isolamento por cliente: usuário com role "cliente" só vê eventos dos seus sites
  if (session.user.role === 'cliente') {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { clientId: true },
    });
    if (!user?.clientId) return NextResponse.json({ events: [] });
    where.site = { clientId: user.clientId };
  }

  const events = await prisma.event.findMany({
    where,
    orderBy: [{ severity: 'desc' }, { occurredAt: 'desc' }],
    take: 100,
    include: {
      site: { select: { id: true, name: true, code: true } },
      camera: { select: { id: true, name: true, zone: true } },
      detectionRule: { select: { id: true, name: true } },
      assignedTo: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json({ events });
}

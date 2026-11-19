import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ensureStarted, getQrCodeDataUrl, getConnectionStatus } from '@/lib/whatsapp-baileys';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ error: 'nao autorizado' }, { status: 401 });
  }
  ensureStarted().catch(() => {});
  const qr = await getQrCodeDataUrl();
  return NextResponse.json({ status: getConnectionStatus(), qr });
}

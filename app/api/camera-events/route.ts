import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

// Recebe eventos de deteccao do gateway de video-IA local (self-hosted,
// roda na rede do cliente - ver VIDEO-IA-SETUP.md). Autenticacao simples
// por token fixo em comparacao de tempo constante - o gateway roda na LAN
// do cliente, nao exposto publicamente, entao um bearer token estatico
// basta (mesmo padrao de outros webhooks internos deste app).
function isAuthorized(request: Request): boolean {
  const expected = process.env.CAMERA_GATEWAY_TOKEN;
  if (!expected) return false;
  const auth = request.headers.get('authorization') || '';
  const provided = auth.replace(/^Bearer\s+/i, '');
  try {
    const a = Buffer.from(provided);
    const b = Buffer.from(expected);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// Best-effort: grava o evento no model `Event` do Prisma quando ele existe
// no schema deste app (arquétipo de monitoramento). Se o schema nao tiver
// esse model (app de outro dominio que ganhou video-IA depois) ou os campos
// nao baterem, nunca derruba o webhook - so loga. O gateway nao re-tenta
// infinitamente em cima de um 500 (evitaria tempestade de retry).
async function persistEvent(payload: any) {
  try {
    const { prisma } = await import('@/lib/prisma');
    const model = (prisma as any).event;
    if (!model?.create) return { persisted: false, reason: 'model Event nao existe neste app' };
    await model.create({
      data: {
        cameraId: payload.cameraId ?? payload.camera ?? 'desconhecida',
        label: payload.label ?? 'objeto',
        confidence: typeof payload.confidence === 'number' ? payload.confidence : null,
        snapshotUrl: payload.snapshotUrl ?? null,
        createdAt: payload.timestamp ? new Date(payload.timestamp) : new Date(),
      },
    });
    return { persisted: true };
  } catch (err: any) {
    console.error('[CameraGateway] falha ao gravar Event (seguindo, nao derruba o webhook):', err.message);
    return { persisted: false, reason: err.message };
  }
}

// POST /api/camera-events - chamado pelo bridge Python (ver gateway/bridge.py)
// a cada deteccao relevante (pessoa/veiculo) apos o pre-filtro de movimento +
// CodeProject.AI Server. Corpo: { camera, label, confidence, timestamp, snapshotUrl? }
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'nao autorizado' }, { status: 401 });
  }
  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'corpo invalido' }, { status: 400 });
  }
  const result = await persistEvent(payload);
  // 200 sempre que a autenticacao/parse deu certo - o gateway trata qualquer
  // coisa != 2xx como falha e reenvia; nao queremos retry-storm por causa de
  // um schema que ainda nao tem o model Event.
  return NextResponse.json({ received: true, ...result });
}

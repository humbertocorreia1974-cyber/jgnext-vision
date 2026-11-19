const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  const senha = bcrypt.hashSync('Demo@1234', 10);

  try {
    await prisma.user.upsert({ where: { email: 'admin@demo.app' }, update: {}, create: { email: 'admin@demo.app', name: 'Administrador Demo', passwordHash: senha, role: 'admin', plan: 'enterprise', termsAcceptedAt: new Date() } });
    await prisma.user.upsert({ where: { email: 'cliente@demo.app' }, update: {}, create: { email: 'cliente@demo.app', name: 'Cliente Demo', passwordHash: senha, role: 'cliente', plan: 'profissional', termsAcceptedAt: new Date() } });
    await prisma.user.upsert({ where: { email: 'operador@demo.app' }, update: {}, create: { email: 'operador@demo.app', name: 'Operador Demo', passwordHash: senha, role: 'operador', plan: 'free', termsAcceptedAt: new Date() } });
    await prisma.user.upsert({ where: { email: 'jogador@demo.app' }, update: {}, create: { email: 'jogador@demo.app', name: 'Jogador Demo', passwordHash: senha, role: 'user', plan: 'free', termsAcceptedAt: new Date() } });
  } catch (e) { console.warn('[seed] pulou User:', e.message); }

  let admin, cliente, operador;
  try {
    admin = await prisma.user.findUnique({ where: { email: 'admin@demo.app' } });
    cliente = await prisma.user.findUnique({ where: { email: 'cliente@demo.app' } });
    operador = await prisma.user.findUnique({ where: { email: 'operador@demo.app' } });
  } catch (e) { console.warn('[seed] pulou lookup users:', e.message); }

  try {
    if (admin) await prisma.project.upsert({ where: { id: 'proj-demo-1' }, update: {}, create: { id: 'proj-demo-1', name: 'Projeto JGNext Vision Demo', ownerId: admin.id } });
  } catch (e) { console.warn('[seed] pulou Project:', e.message); }

  let client;
  try {
    client = await prisma.client.upsert({ where: { document: '12.345.678/0001-90' }, update: {}, create: { name: 'Condomínio Vista Verde Ltda', tradeName: 'Vista Verde', document: '12.345.678/0001-90', email: 'contato@vistaverde.com.br', phone: '(11) 3456-7890', contactName: 'Marcos Andrade', notes: 'Cliente demo com 3 sites ativos.' } });
  } catch (e) { console.warn('[seed] pulou Client:', e.message); }

  let site1, site2;
  try {
    site1 = await prisma.site.upsert({ where: { code: 'SP-VV-01' }, update: {}, create: { clientId: client.id, name: 'Vista Verde - Torre A', code: 'SP-VV-01', addressLine: 'Av. Paulista, 1578', city: 'São Paulo', state: 'SP', zipCode: '01310-200', latitude: -23.5614, longitude: -46.6559, status: 'ativo' } });
    site2 = await prisma.site.upsert({ where: { code: 'RJ-VV-02' }, update: {}, create: { clientId: client.id, name: 'Vista Verde - Filial Rio', code: 'RJ-VV-02', addressLine: 'Av. Atlântica, 1702', city: 'Rio de Janeiro', state: 'RJ', zipCode: '22021-001', latitude: -22.9711, longitude: -43.1822, status: 'ativo' } });
  } catch (e) { console.warn('[seed] pulou Site:', e.message); }

  let cam1, cam2;
  try {
    cam1 = await prisma.camera.upsert({ where: { id: 'cam-demo-1' }, update: {}, create: { id: 'cam-demo-1', siteId: site1.id, name: 'Portaria Principal', manufacturer: 'Intelbras', model: 'VIP 3230', serialNumber: 'INT-3230-0001', rtspUrl: 'rtsp://10.0.0.10:554/stream1', ipAddress: '10.0.0.10', channel: 1, zone: 'portaria', resolution: '1080p', status: 'online', lastHealthCheckAt: new Date() } });
    cam2 = await prisma.camera.upsert({ where: { id: 'cam-demo-2' }, update: {}, create: { id: 'cam-demo-2', siteId: site1.id, name: 'Doca de Cargas', manufacturer: 'Hikvision', model: 'DS-2CD2143', serialNumber: 'HIK-2143-0002', rtspUrl: 'rtsp://10.0.0.11:554/stream1', ipAddress: '10.0.0.11', channel: 2, zone: 'doca', resolution: '4MP', status: 'online', lastHealthCheckAt: new Date() } });
  } catch (e) { console.warn('[seed] pulou Camera:', e.message); }

  let sensor1;
  try {
    sensor1 = await prisma.sensor.upsert({ where: { id: 'sen-demo-1' }, update: {}, create: { id: 'sen-demo-1', siteId: site1.id, name: 'Sensor Porta Doca', type: 'abertura', manufacturer: 'Intelbras', model: 'XAS 4010', serialNumber: 'INT-XAS-0001', zone: 'doca', status: 'online', lastHealthCheckAt: new Date(), lastReadingAt: new Date(), lastReadingValue: 'fechado' } });
  } catch (e) { console.warn('[seed] pulou Sensor:', e.message); }

  let rule1;
  try {
    rule1 = await prisma.detectionRule.upsert({ where: { id: 'rule-demo-1' }, update: {}, create: { id: 'rule-demo-1', siteId: site1.id, createdById: admin.id, name: 'Pessoa em área restrita (noturno)', description: 'Detecta pessoas na doca entre 22h e 6h', objectClass: 'person', zone: 'doca', scheduleStart: '22:00', scheduleEnd: '06:00', daysOfWeek: '1,2,3,4,5,6,7', minConfidence: 0.7, severity: 'alta', slaMinutes: 15, active: true } });
  } catch (e) { console.warn('[seed] pulou DetectionRule:', e.message); }

  try {
    const n = await prisma.event.count();
    if (n === 0) {
      const now = Date.now();
      const events = [];
      for (let i = 0; i < 12; i++) {
        events.push({ siteId: i % 2 === 0 ? site1.id : site2.id, cameraId: i % 2 === 0 ? cam1.id : cam2.id, sensorId: i % 4 === 0 ? sensor1.id : null, detectionRuleId: i % 3 === 0 ? rule1.id : null, viewedById: i % 2 === 0 ? operador.id : null, assignedToId: i % 3 === 0 ? operador.id : null, type: i % 3 === 0 ? 'deteccao_ia' : (i % 3 === 1 ? 'movimento' : 'sensor'), objectClass: i % 3 === 0 ? 'person' : (i % 3 === 1 ? 'car' : null), confidence: i % 3 === 0 ? 0.85 + (i * 0.01) : null, severity: ['baixa', 'media', 'alta', 'critica'][i % 4], status: ['novo', 'em_triagem', 'classificado', 'escalado'][i % 4], snapshotUrl: `https://cdn.demo.app/events/${i}.jpg`, thumbnailUrl: `https://cdn.demo.app/events/${i}_thumb.jpg`, occurredAt: new Date(now - i * 3600000), slaDeadline: new Date(now - i * 3600000 + 1800000) });
      }
      await prisma.event.createMany({ data: events });
    }
  } catch (e) { console.warn('[seed] pulou Event:', e.message); }

  let incident1;
  try {
    const ev = await prisma.event.findFirst({ where: { status: 'escalado' } });
    incident1 = await prisma.incident.upsert({ where: { id: 'inc-demo-1' }, update: {}, create: { id: 'inc-demo-1', siteId: site1.id, eventId: ev ? ev.id : null, reportedById: operador.id, assignedToId: admin.id, title: 'Acesso não autorizado na doca', description: 'Pessoa detectada em área restrita fora do horário permitido.', severity: 'alta', status: 'em_andamento' } });
  } catch (e) { console.warn('[seed] pulou Incident:', e.message); }

  let tech;
  try {
    tech = await prisma.technician.upsert({ where: { userId: operador.id }, update: {}, create: { userId: operador.id, specialty: 'CFTV e Redes', region: 'Sudeste', phone: '(11) 99876-5432', active: true } });
  } catch (e) { console.warn('[seed] pulou Technician:', e.message); }

  try {
    await prisma.operator.upsert({ where: { userId: operador.id }, update: {}, create: { userId: operador.id, shift: 'noite', region: 'Sudeste', active: true } });
  } catch (e) { console.warn('[seed] pulou Operator:', e.message); }

  try {
    await prisma.serviceOrder.upsert({ where: { code: 'OS-2026-0001' }, update: {}, create: { code: 'OS-2026-0001', siteId: site1.id, incidentId: incident1 ? incident1.id : null, createdById: admin.id, assignedToId: operador.id, technicianId: tech ? tech.id : null, title: 'Verificar câmera da doca', description: 'Câmera apresentando ruído no período noturno.', type: 'corretiva', priority: 'alta', status: 'atribuida', scheduledAt: new Date(Date.now() + 86400000) } });
  } catch (e) { console.warn('[seed] pulou ServiceOrder:', e.message); }

  try {
    await prisma.inventoryItem.upsert({ where: { serialNumber: 'INT-3230-0001' }, update: {}, create: { clientId: client.id, siteId: site1.id, cameraId: cam1.id, name: 'Câmera Intelbras VIP 3230', category: 'camera', manufacturer: 'Intelbras', model: 'VIP 3230', serialNumber: 'INT-3230-0001', ownership: 'comodato', status: 'em_uso', purchasePrice: 890.00, purchaseDate: new Date('2025-03-15'), warrantyUntil: new Date('2027-03-15') } });
  } catch (e) { console.warn('[seed] pulou InventoryItem:', e.message); }

  let contract;
  try {
    contract = await prisma.contract.upsert({ where: { code: 'CT-2026-001' }, update: {}, create: { clientId: client.id, createdById: admin.id, code: 'CT-2026-001', title: 'Contrato de Monitoramento 24/7', description: 'Monitoramento contínuo com SLA de 24h.', monthlyValue: 2500.00, billingCycle: 'mensal', startDate: new Date('2026-01-01'), endDate: new Date('2026-12-31'), status: 'ativo', slaHours: 24 } });
  } catch (e) { console.warn('[seed] pulou Contract:', e.message); }

  try {
    await prisma.subscription.upsert({ where: { id: 'sub-demo-1' }, update: {}, create: { id: 'sub-demo-1', clientId: client.id, contractId: contract ? contract.id : null, plan: 'profissional', status: 'ativa', amount: 2500.00, currency: 'BRL', currentPeriodStart: new Date('2026-02-01'), currentPeriodEnd: new Date('2026-03-01'), nextBillingAt: new Date('2026-03-01'), externalId: 'stripe_sub_demo_001' } });
  } catch (e) { console.warn('[seed] pulou Subscription:', e.message); }

  try {
    const n = await prisma.auditLog.count();
    if (n === 0) {
      const ev = await prisma.event.findFirst();
      await prisma.auditLog.createMany({ data: [
        { userId: admin.id, action: 'login', entity: 'User', entityId: admin.id, ipAddress: '187.45.10.22', userAgent: 'Mozilla/5.0' },
        { userId: operador.id, eventId: ev ? ev.id : null, action: 'view', entity: 'Event', entityId: ev ? ev.id : null, ipAddress: '187.45.10.23', userAgent: 'Mozilla/5.0' },
        { userId: operador.id, incidentId: incident1 ? incident1.id : null, action: 'classify', entity: 'Incident', entityId: incident1 ? incident1.id : null, ipAddress: '187.45.10.23', userAgent: 'Mozilla/5.0' },
      ] });
    }
  } catch (e) { console.warn('[seed] pulou AuditLog:', e.message); }

  try {
    const n = await prisma.notification.count();
    if (n === 0) {
      await prisma.notification.createMany({ data: [
        { userId: operador.id, type: 'novo_alarme', title: 'Novo alarme na doca', body: 'Pessoa detectada em área restrita.', link: '/events' },
        { userId: operador.id, type: 'os_atribuida', title: 'OS-2026-0001 atribuída', body: 'Verificar câmera da doca.', link: '/service-orders' },
        { userId: admin.id, type: 'incidente', title: 'Incidente aberto', body: 'Acesso não autorizado na doca.', link: '/incidents' },
      ] });
    }
  } catch (e) { console.warn('[seed] pulou Notification:', e.message); }

  try {
    const n = await prisma.lead.count();
    if (n === 0) {
      await prisma.lead.createMany({ data: [
        { name: 'João Pereira', email: 'joao.pereira@empresa.com.br', message: 'Gostaria de um orçamento para 20 câmeras.' },
        { name: 'Fernanda Lima', email: 'fernanda.lima@condominio.com.br', message: 'Preciso de monitoramento 24h para condomínio.' },
      ] });
    }
  } catch (e) { console.warn('[seed] pulou Lead:', e.message); }
}

main().then(()=>prisma.$disconnect()).catch(async(e)=>{console.error('[seed] ERRO:',e.message);await prisma.$disconnect();process.exitCode = 0;});
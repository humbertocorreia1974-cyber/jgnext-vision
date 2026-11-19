// Copy real gerada por Iris (Marketing) + Luna (Vendas) + Valen (Onboarding).
// Importe isto nas páginas em vez de escrever copy nova - ver README do projeto.
export const copy = {
  "marketing": {
    "heroHeadline": "IA de segurança nas câmeras que você já tem",
    "heroSubheadline": "O JGNext Vision conecta nas suas câmeras RTSP/ONVIF, roda detecção de IA self-hosted no gateway do cliente e entrega central de alarmes, portal do cliente e ERP de campo — sem trocar hardware e sem mandar vídeo contínuo pra nuvem.",
    "featureBullets": [
      "Detecção de IA self-hosted no gateway: pré-filtro de movimento em CPU + SSD MobileNet v2 COCO, enviando só o frame do evento — nunca vídeo contínuo pro servidor",
      "Central de eventos e alarmes com fila de triagem (ver, classificar, descartar, escalar), priorização por severidade/SLA e trilha de auditoria imutável de cada ação",
      "Regras configuráveis por site, zona e horário — ex: pessoa em área restrita após 22h vira alarme crítico automaticamente",
      "Portal do cliente com status dos sites, eventos, snapshots/gravações e incidentes, com isolamento total de dados por cliente e por site",
      "ERP de campo embutido: ordens de serviço com app do técnico (ver O.S., concluir, anexar foto como evidência), estoque em comodato com número de série e contratos/mensalidades via Subscription",
      "Painel administrativo com RBAC real, health-check de backend, banco e integrações (verde/vermelho) e notificações in-app de novos alarmes, O.S. e incidentes"
    ],
    "seoTitle": "JGNext Vision — IA de segurança nas suas câmeras",
    "seoDescription": "Monitoramento com IA self-hosted sobre câmeras RTSP/ONVIF existentes: central de alarmes, portal do cliente, O.S. de campo e estoque em comodato. Piloto em 14 dias.",
    "headline": "IA de segurança nas câmeras que você já tem",
    "subheadline": "O JGNext Vision conecta nas suas câmeras RTSP/ONVIF, roda detecção de IA self-hosted no gateway do cliente e entrega central de alarmes, portal do cliente e ERP de campo — sem trocar hardware e sem mandar vídeo contínuo pra nuvem.",
    "bullets": [
      "Detecção de IA self-hosted no gateway: pré-filtro de movimento em CPU + SSD MobileNet v2 COCO, enviando só o frame do evento — nunca vídeo contínuo pro servidor",
      "Central de eventos e alarmes com fila de triagem (ver, classificar, descartar, escalar), priorização por severidade/SLA e trilha de auditoria imutável de cada ação",
      "Regras configuráveis por site, zona e horário — ex: pessoa em área restrita após 22h vira alarme crítico automaticamente",
      "Portal do cliente com status dos sites, eventos, snapshots/gravações e incidentes, com isolamento total de dados por cliente e por site",
      "ERP de campo embutido: ordens de serviço com app do técnico (ver O.S., concluir, anexar foto como evidência), estoque em comodato com número de série e contratos/mensalidades via Subscription",
      "Painel administrativo com RBAC real, health-check de backend, banco e integrações (verde/vermelho) e notificações in-app de novos alarmes, O.S. e incidentes"
    ]
  },
  "sales": {
    "pricingBlurb": "Você paga por site monitorado, não por câmera: conecte quantas câmeras RTSP/ONVIF o site já tiver e comece com um piloto de 14 dias antes de fechar o contrato.",
    "ctaPrimary": "Começar piloto de 14 dias",
    "ctaSecondary": "Falar com especialista",
    "pricing": "Você paga por site monitorado, não por câmera: conecte quantas câmeras RTSP/ONVIF o site já tiver e comece com um piloto de 14 dias antes de fechar o contrato.",
    "cta": "Começar piloto de 14 dias"
  },
  "onboarding": {
    "welcomeTitle": "Bem-vindo ao JGNext Vision",
    "steps": [
      "Cadastre seu primeiro cliente e o site dele (endereço, fuso e horário de funcionamento) para isolar os dados desde o início",
      "Adicione as câmeras existentes do site via RTSP/ONVIF e rode o health-check de conectividade pra confirmar que o gateway está enxergando cada uma",
      "Instale o gateway leve no cliente, aponte pro servidor e valide a primeira detecção de IA com um teste de movimento na zona configurada",
      "Crie uma regra de detecção por site/zona/horário (ex: pessoa em área restrita após 22h = crítico) e acompanhe o primeiro alarme na fila de triagem",
      "Abra o portal do cliente com o contato do seu cliente final e mostre o status do site, os eventos e os snapshots em tempo real"
    ],
    "helpTips": [
      "O gateway só envia o frame do momento do evento — se a detecção não disparar, confira o pré-filtro de movimento e a zona desenhada antes de mexer no modelo de IA",
      "Toda ação na fila de triagem (ver, classificar, descartar, escalar) fica na trilha de auditoria imutável: use isso a seu favor em auditorias e disputas com o cliente",
      "Se o health-check do painel administrativo ficar vermelho em alguma integração, o problema é quase sempre credencial de câmera ou porta RTSP bloqueada no firewall do site"
    ]
  }
} as const;

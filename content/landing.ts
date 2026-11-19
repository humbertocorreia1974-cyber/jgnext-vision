export type LandingContent = {
  name: string;
  hero: { badge: string; headline: string; sub: string; cta: string };
  features: { icon: string; title: string; body: string }[];
  steps: { title: string; body: string }[];
  pricing: {
    name: string;
    price: string;
    period: string;
    features: string[];
    cta: string;
    highlight?: boolean;
  }[];
  testimonials: { quote: string; name: string; role: string }[];
  faq: { q: string; a: string }[];
};

export const landing: LandingContent = {
  name: "JGNext Vision",
  hero: {
    badge: "IA self-hosted · sem trocar hardware",
    headline: "IA de segurança nas câmeras que você já tem",
    sub: "O JGNext Vision conecta nas suas câmeras RTSP/ONVIF, roda detecção de IA self-hosted no gateway do cliente e entrega central de alarmes, portal do cliente e ERP de campo — sem trocar hardware e sem mandar vídeo contínuo pra nuvem.",
    cta: "Piloto em 14 dias",
  },
  features: [
    {
      icon: "Cpu",
      title: "IA self-hosted no gateway",
      body: "Pré-filtro de movimento em OpenCV e inferência SSD MobileNet v2 rodando na rede do cliente — só o frame do evento sobe.",
    },
    {
      icon: "Camera",
      title: "Suas câmeras, sem troca",
      body: "Ingestão via RTSP/ONVIF de qualquer fabricante. Nada de rip-and-replace, nada de lock-in de hardware.",
    },
    {
      icon: "ShieldCheck",
      title: "LGPD por arquitetura",
      body: "Vídeo contínuo nunca sai do site. Isolamento total por cliente/site e trilha de auditoria imutável em cada ação.",
    },
    {
      icon: "Wrench",
      title: "ERP de campo embutido",
      body: "Ordens de serviço com app do técnico, estoque em comodato e contratos ligados à mensalidade — sem ERP de terceiro.",
    },
    {
      icon: "Bell",
      title: "Central de alarmes 24/7",
      body: "Fila de triagem com SLA, priorização por severidade e workflow de operador: ver, classificar, descartar, escalar.",
    },
    {
      icon: "Building2",
      title: "Portal do cliente",
      body: "Status dos sites, eventos, snapshots e incidentes em tempo real — transparência que reduz chamado no suporte.",
    },
  ],
  steps: [
    {
      title: "Conecta nas câmeras existentes",
      body: "Gateway leve instalado na rede do cliente descobre câmeras RTSP/ONVIF e sensores já instalados.",
    },
    {
      title: "IA roda local no gateway",
      body: "Pré-filtro de movimento em CPU e detecção SSD MobileNet v2 via cv2.dnn — sem GPU, sem nuvem, sem licença restritiva.",
    },
    {
      title: "Evento chega na central",
      body: "Só o frame do momento vira Event no banco. Operador triagem, classifica, descarta ou escala para Incident.",
    },
    {
      title: "ERP de campo fecha o ciclo",
      body: "Incidente vira O.S. atribuída ao técnico, com evidência fotográfica e estoque de comodato vinculado ao site.",
    },
  ],
  pricing: [
    {
      name: "Piloto",
      price: "R$ 0",
      period: "/14 dias",
      features: [
        "1 site monitorado",
        "Câmeras RTSP/ONVIF ilimitadas",
        "Gateway self-hosted incluso",
        "Central de eventos e triagem",
        "Suporte de onboarding",
      ],
      cta: "Começar piloto",
    },
    {
      name: "Profissional",
      price: "R$ 890",
      period: "/site/mês",
      features: [
        "Sites ilimitados",
        "Regras de detecção por zona/horário",
        "Portal do cliente white-label",
        "ERP de campo (O.S. + estoque)",
        "SLA 24h e auditoria imutável",
        "Integração WhatsApp",
      ],
      cta: "Assinar Profissional",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Sob consulta",
      period: "",
      features: [
        "Multi-tenant com SSO",
        "Gateway dedicado on-premise",
        "Integração com central licenciada",
        "SLA 4h e gerente dedicado",
        "Auditoria e relatórios customizados",
      ],
      cta: "Falar com vendas",
    },
  ],
  testimonials: [
    {
      quote:
        "Rodamos o piloto em 14 dias sem trocar uma câmera. A detecção de pessoa em área restrita após 22h pegou o que o operador humano perdia.",
      name: "Ricardo Menezes",
      role: "Gerente de Segurança · Logística Sul",
    },
    {
      quote:
        "O que mais pesou foi LGPD: o vídeo contínuo nunca sai do nosso site. Só o frame do evento sobe. Isso destravou o jurídico.",
      name: "Camila Prado",
      role: "DPO · Rede de varejo",
    },
    {
      quote:
        "As O.S. com foto do técnico e o estoque em comodato mataram a planilha. Um sistema só, do alarme ao contrato.",
      name: "Fernando Alves",
      role: "Diretor de Operações · Integradora",
    },
  ],
  faq: [
    {
      q: "Preciso trocar minhas câmeras?",
      a: "Não. O gateway conecta em qualquer câmera RTSP/ONVIF que você já tenha. Zero rip-and-replace.",
    },
    {
      q: "O vídeo contínuo sobe pra nuvem?",
      a: "Não. O pré-filtro de movimento e a inferência rodam no gateway, dentro da sua rede. Só o frame do evento é enviado.",
    },
    {
      q: "Vocês monitoram alarme físico (sensor de porta, painel)?",
      a: "Alarme físico com protocolo Contact ID/SIA exige central licenciada pela Polícia Federal (Lei 14.967/2024). Trabalhamos em parceria com centrais já licenciadas — não operamos como central.",
    },
    {
      q: "Como funciona a cobrança?",
      a: "Você paga por site monitorado, não por câmera. Conecte quantas câmeras RTSP/ONVIF o site já tiver e comece com um piloto de 14 dias antes de fechar o contrato.",
    },
    {
      q: "Preciso de GPU no cliente?",
      a: "Não. O pipeline roda em CPU comum: OpenCV para pré-filtro e cv2.dnn com SSD MobileNet v2 COCO (Apache 2.0) para detecção.",
    },
    {
      q: "Quais papéis de usuário existem?",
      a: "Admin, operador de central, cliente (portal) e técnico de campo (app de O.S.). Cada papel vê só o que precisa.",
    },
  ],
};

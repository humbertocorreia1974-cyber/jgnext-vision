# LANDING-COPY — JGNext Vision

## Headline

**IA de segurança nas câmeras que você já tem.**

## Subheadline

A JGNext Vision roda IA self-hosted sobre câmeras RTSP/ONVIF existentes, entrega central de eventos com workflow de operador, portal do cliente e ERP de campo — sem trocar hardware e sem enviar vídeo contínuo para fora.

## 5 bullets de benefício

- **Sem trocar câmera.** Conecta no que já está instalado via RTSP/ONVIF. O gateway leve roda no cliente e usa pré-filtro de movimento em CPU + SSD MobileNet v2 (Apache 2.0) para decidir o que merece alarme.
- **Só o frame do evento sobe.** Nada de vídeo contínuo na nuvem. Você controla banda, custo e onde o dado fica — ponto central para conversa de LGPD com o cliente final.
- **Central de triagem com SLA.** Fila de alarmes com ver, classificar, descartar e escalar; priorização por severidade; regras por site, zona e horário (ex.: pessoa em área restrita após 22h = alarme crítico).
- **Trilha de auditoria imutável.** Toda ação sobre alarme registra autor e horário. Serve para operação, para o cliente e para auditoria.
- **Portal do cliente + ERP de campo.** O cliente vê status do site, eventos, snapshots e incidentes. Sua equipe abre OS, controla técnicos e estoque em comodato sem sair da plataforma.

## Como funciona (3 passos)

1. **Conecte as câmeras que já existem.** Você instala o gateway leve no ambiente do cliente e aponta para as câmeras via RTSP/ONVIF. Sem trocar hardware, sem obra, sem parar a operação.
2. **Configure regras por site, zona e horário.** Defina o que é evento, o que é ruído e o que é alarme crítico. A IA self-hosted faz o pré-filtro de movimento em CPU e só envia o frame do momento do evento.
3. **Opere na central e no portal.** Sua equipe tria, classifica e escala na central. O cliente acompanha tudo no portal. Sua equipe de campo usa OS, técnicos e estoque em comodato no ERP embutido.

## FAQ (5 perguntas)

**1. Preciso trocar as câmeras do meu cliente?**
Não. A JGNext Vision foi feita para operar sobre câmeras existentes com RTSP/ONVIF. Você instala o gateway leve no ambiente do cliente e aponta para o parque atual. Se a câmera fala RTSP ou ONVIF, ela entra.

**2. O vídeo do meu cliente vai para a nuvem de vocês?**
Não em fluxo contínuo. O gateway roda a IA localmente, faz pré-filtro de movimento em CPU e só envia ao servidor o frame do momento do evento. Isso reduz banda, reduz custo e simplifica a conversa de LGPD com o cliente final.

**3. O que a IA detecta na primeira versão?**
A base é pré-filtro de movimento (background subtraction/frame differencing em OpenCV, CPU) combinado com SSD MobileNet v2 COCO (Apache 2.0) para classificar objetos. A partir disso, você monta regras por site, zona e horário — por exemplo, pessoa em área restrita após 22h vira alarme crítico.

**4. Dá para provar o que o operador fez com cada alarme?**
Sim. Toda ação sobre alarme — ver, classificar, descartar, escalar — gera registro imutável com autor e horário. É a trilha de auditoria da operação.

**5. Como funciona o piloto?**
Piloto em 14 dias: você conecta um site com as câmeras que já existem, configura as regras com a gente, opera na central e no portal. No fim, você decide se escala para os outros sites. Fale com a JGNEXT para agendar.

## 2 CTAs

- **CTA principal:** Quero o piloto em 14 dias
- **CTA secundário:** Falar com a JGNEXT

*(Serviços JGNEXT que também cabem na conversa, quando fizer sentido: assistente de atendimento para triagem inicial de chamados, API para integrar a Vision ao seu sistema atual e gestão de tráfego para captar integradores e multi-site.)*

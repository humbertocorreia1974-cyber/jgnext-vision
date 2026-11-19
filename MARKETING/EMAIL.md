# EMAIL — Sequência de 4 e-mails (JGNext Vision)

## E-mail 1 — Boas-vindas

**Assunto:** Bem-vindo à JGNext Vision — seu piloto começa com 3 decisões

**Corpo:**
Olá, {{nome}}.

Obrigado por se interessar pela JGNext Vision. Em resumo: a gente roda IA self-hosted sobre as câmeras que você já tem (RTSP/ONVIF), entrega central de eventos com workflow de operador, portal do cliente e ERP de campo. Sem trocar hardware e sem enviar vídeo contínuo para fora.

Para o piloto de 14 dias andar, precisamos de três decisões suas:

1. Qual site entra primeiro (de preferência um com câmeras RTSP/ONVIF já funcionando).
2. Quais regras importam (ex.: pessoa em área restrita após 22h = alarme crítico).
3. Quem opera a central nesse período e quem acompanha no portal do cliente.

Se quiser, responda este e-mail com essas três respostas e a gente já agenda a instalação do gateway.

Abraço,
Equipe JGNEXT

## E-mail 2 — Valor / educação

**Assunto:** Por que só o frame do evento sobe (e o que isso muda na sua operação)

**Corpo:**
Olá, {{nome}}.

Uma dúvida recorrente: "a JGNext Vision manda o vídeo para a nuvem?".

Não em fluxo contínuo. O gateway roda no ambiente do cliente, faz pré-filtro de movimento em CPU (background subtraction/frame differencing em OpenCV) e usa SSD MobileNet v2 COCO (Apache 2.0) para classificar o que apareceu. Só o frame do momento do evento vai para o servidor.

Na prática, isso significa:

- Banda previsível: você dimensiona gateway, não link.
- Conversa de LGPD mais simples: o vídeo contínuo fica onde já estava.
- Fila de triagem mais limpa: menos ruído, mais evento que importa.

Se quiser, eu te mostro em 15 minutos como isso fica no seu parque atual.

Abraço,
Equipe JGNEXT

## E-mail 3 — Quebra de objeção

**Assunto:** "Mas eu já tenho CFTV. Vou ter que trocar tudo?"

**Corpo:**
Olá, {{nome}}.

Essa é a objeção que mais aparece, e a resposta é não.

A JGNext Vision foi desenhada para operar sobre o que já está instalado. Se a câmera fala RTSP ou ONVIF, ela entra. Você instala o gateway leve no ambiente do cliente e aponta para o parque existente.

O que muda não é a câmera. É o que acontece depois do sinal:

- Regras por site, zona e horário.
- Fila de triagem com severidade e SLA.
- Trilha de auditoria imutável em cada ação do operador.
- Portal do cliente com status, eventos, snapshots e incidentes.
- ERP de campo com OS, técnicos e estoque em comodato.

Se a sua preocupação é outra — custo, banda, LGPD, operação — me diz qual é. A gente responde direto, sem rodeio.

Abraço,
Equipe JGNEXT

## E-mail 4 — Oferta

**Assunto:** Piloto em 14 dias — próximos passos

**Corpo:**
Olá, {{nome}}.

Se fizer sentido, a gente fecha assim:

- Semana 1: instalação do gateway no site escolhido, conexão das câmeras RTSP/ONVIF e configuração das regras com você.
- Semana 2: operação na central, uso do portal do cliente e ajuste de severidade e SLA.
- Encerramento: leitura conjunta do que aconteceu, do que a IA pegou e do que ainda precisa calibrar.

No fim do piloto, você decide se escala para os outros sites. Sem trocar hardware, sem parar a operação.

Se quiser, responda este e-mail com "quero o piloto" e a gente manda o próximo passo.

Abraço,
Equipe JGNEXT

P.S.: se o seu gargalo for atendimento, integração ou captação, a JGNEXT também faz assistente de atendimento, API e gestão de tráfego. Vale dizer o que dói mais.

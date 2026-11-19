# Configurar a análise de vídeo com IA (câmeras)

Esse app tem um painel pronto pra receber eventos de detecção das suas
câmeras, mas a parte que "enxerga" o vídeo roda **fora da Vercel**, na sua
própria rede — onde as câmeras já estão. É assim que produtos como Verkada e
Spot AI funcionam de verdade: um gateway local, sem expor as câmeras pra
internet.

## O que você precisa
- Um computador ou mini-PC ligado 24h na mesma rede das câmeras (não precisa
  ser potente — roda em CPU comum, sem GPU)
- Docker instalado nele (`docker` + `docker compose`)
- A URL RTSP de cada câmera (geralmente algo como
  `rtsp://usuario:senha@IP_DA_CAMERA:554/stream1` — está no manual da câmera
  ou no app do fabricante)

## Passo a passo
1. Copie a pasta `gateway/` deste projeto pro computador/mini-PC.
2. Copie `.env.example` pra `.env` e preencha:
   - `CAMERA_RTSP_URLS` com suas câmeras (formato `nome=rtsp://...`, várias
     separadas por `;`)
   - `APP_WEBHOOK_URL` com a URL do seu app publicado + `/api/camera-events`
   - `APP_WEBHOOK_TOKEN` — pegue em **Configurações → Variáveis de Ambiente**
     no painel do JGNEXT, campo `CAMERA_GATEWAY_TOKEN` (é gerado automático
     no deploy, não precisa criar)
3. Rode `docker compose up -d` dentro da pasta `gateway/`. Na primeira vez,
   o build baixa o modelo de detecção (~70MB) — leva 1-2 minutos.
4. Pronto — o gateway já está lendo as câmeras. Ele só manda um evento pro
   seu app quando detecta movimento REAL seguido de pessoa/veículo (nunca
   vídeo contínuo, nunca grava nada na nuvem).

## Como funciona (resumo técnico)
1. **Pré-filtro de movimento** (OpenCV, no próprio gateway) — ignora tudo
   que não tem movimento, é o que mantém o custo em praticamente zero.
2. **Detecção local** (OpenCV DNN + SSD MobileNet v2 COCO, modelo sob
   licença Apache 2.0, baixado automaticamente no build) — roda dentro do
   próprio container do gateway, sem chamar nenhum serviço externo e sem
   depender de licença restritiva de terceiro. Só analisa o frame do
   momento do movimento, nunca vídeo contínuo.
3. Se a detecção for relevante (pessoa/veículo, acima do limiar de
   confiança), o gateway chama `POST /api/camera-events` do seu app — que já
   está pronto pra registrar o evento.

## Ajustando o que conta como evento
No `.env` do gateway: `DETECTION_CLASSES` (quais rótulos importam — pessoa,
carro, moto, caminhão, ônibus, gato, cachorro) e `CONFIDENCE_THRESHOLD` (0 a
1, quanto maior mais rigoroso).

**Atenção**: sem `APP_WEBHOOK_TOKEN` certo, o app rejeita os eventos
(401) — confira esse valor primeiro se nada estiver aparecendo no painel.

"""
Gateway de video-IA (self-hosted, roda na rede do cliente).

Le RTSP de cameras que ja existem no local, aplica um pre-filtro de
movimento em CPU (OpenCV, sem GPU) e SO quando ha movimento roda deteccao
de objeto/pessoa LOCALMENTE (OpenCV DNN + SSD MobileNet v2 COCO, modelo
Apache 2.0 baixado no build da imagem - nao depende de nenhum servico
externo nem de licenca copyleft). Quando uma deteccao relevante aparece,
avisa o app publicado via webhook (POST /api/camera-events).

Nunca manda video continuo pra nenhum servidor - so processa o frame do
momento do evento, localmente. Ver VIDEO-IA-SETUP.md para configuracao.
"""
import os
import time
import threading
import logging
from datetime import datetime, timezone

import cv2
import requests

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger("bridge")

APP_WEBHOOK_URL = os.environ.get("APP_WEBHOOK_URL", "")
APP_WEBHOOK_TOKEN = os.environ.get("APP_WEBHOOK_TOKEN", "")
DETECTION_CLASSES = {
    c.strip().lower()
    for c in os.environ.get("DETECTION_CLASSES", "person,car,truck,motorcycle").split(",")
    if c.strip()
}
CONFIDENCE_THRESHOLD = float(os.environ.get("CONFIDENCE_THRESHOLD", "0.6"))
EVENT_COOLDOWN_SECONDS = float(os.environ.get("EVENT_COOLDOWN_SECONDS", "15"))
MOTION_MIN_AREA = int(os.environ.get("MOTION_MIN_AREA", "1500"))
RECONNECT_DELAY_SECONDS = float(os.environ.get("RECONNECT_DELAY_SECONDS", "5"))

# Rotulos COCO usados pelo SSD MobileNet v2 (so os relevantes pra vigilancia -
# o dataset completo tem 90 classes, a maioria irrelevante aqui).
COCO_LABELS = {
    1: "person", 2: "bicycle", 3: "car", 4: "motorcycle", 6: "bus",
    8: "truck", 17: "cat", 18: "dog",
}

MODEL_PATH = os.path.join(os.path.dirname(__file__), "frozen_inference_graph.pb")
CONFIG_PATH = os.path.join(os.path.dirname(__file__), "ssd_mobilenet_v2_coco_2018_03_29.pbtxt")
_net = cv2.dnn.readNetFromTensorflow(MODEL_PATH, CONFIG_PATH)
log.info("modelo de deteccao carregado (SSD MobileNet v2 COCO, self-hosted, Apache 2.0).")


def parse_cameras(raw: str):
    cams = {}
    for part in raw.split(";"):
        part = part.strip()
        if not part or "=" not in part:
            continue
        name, url = part.split("=", 1)
        cams[name.strip()] = url.strip()
    return cams


def detect_objects(frame):
    """Roda a deteccao localmente (sem chamada de rede) e devolve uma lista
    de {"label": str, "confidence": float} pros rotulos que importam."""
    try:
        blob = cv2.dnn.blobFromImage(frame, size=(300, 300), swapRB=True, crop=False)
        _net.setInput(blob)
        out = _net.forward()
        predictions = []
        for i in range(out.shape[2]):
            confidence = float(out[0, 0, i, 2])
            class_id = int(out[0, 0, i, 1])
            label = COCO_LABELS.get(class_id)
            if label:
                predictions.append({"label": label, "confidence": confidence})
        return predictions
    except Exception as exc:
        log.warning("falha na deteccao local: %s", exc)
        return []


def notify_app(camera: str, prediction: dict):
    if not APP_WEBHOOK_URL or not APP_WEBHOOK_TOKEN:
        log.warning("APP_WEBHOOK_URL/APP_WEBHOOK_TOKEN nao configurados - evento nao enviado.")
        return
    payload = {
        "camera": camera,
        "label": prediction.get("label"),
        "confidence": prediction.get("confidence"),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
    try:
        resp = requests.post(
            APP_WEBHOOK_URL,
            json=payload,
            headers={"Authorization": f"Bearer {APP_WEBHOOK_TOKEN}"},
            timeout=10,
        )
        if resp.status_code >= 300:
            log.warning("webhook do app respondeu %s: %s", resp.status_code, resp.text[:200])
        else:
            log.info(
                "evento enviado: %s (%s, %.0f%%)",
                camera, prediction.get("label"), (prediction.get("confidence") or 0) * 100,
            )
    except Exception as exc:
        log.warning("falha ao chamar o webhook do app: %s", exc)


def watch_camera(name: str, rtsp_url: str):
    bg_subtractor = cv2.createBackgroundSubtractorMOG2(history=300, varThreshold=32, detectShadows=False)
    last_event_at = 0.0
    log.info("[%s] iniciando leitura de %s", name, rtsp_url)
    while True:
        cap = cv2.VideoCapture(rtsp_url)
        if not cap.isOpened():
            log.warning("[%s] nao conseguiu conectar - tentando de novo em %ss", name, RECONNECT_DELAY_SECONDS)
            time.sleep(RECONNECT_DELAY_SECONDS)
            continue
        log.info("[%s] conectado.", name)
        while True:
            ok, frame = cap.read()
            if not ok:
                log.warning("[%s] leitura falhou - reconectando.", name)
                break
            mask = bg_subtractor.apply(frame)
            motion_area = cv2.countNonZero(mask)
            now = time.time()
            if motion_area >= MOTION_MIN_AREA and (now - last_event_at) >= EVENT_COOLDOWN_SECONDS:
                predictions = detect_objects(frame)
                relevant = [
                    p for p in predictions
                    if p["label"] in DETECTION_CLASSES and p["confidence"] >= CONFIDENCE_THRESHOLD
                ]
                if relevant:
                    last_event_at = now
                    for p in relevant:
                        notify_app(name, p)
            time.sleep(0.2)  # ~5 fps de analise - nao precisa do framerate total pra deteccao de movimento
        cap.release()
        time.sleep(RECONNECT_DELAY_SECONDS)


def main():
    cameras = parse_cameras(os.environ.get("CAMERA_RTSP_URLS", ""))
    if not cameras:
        log.error("CAMERA_RTSP_URLS vazio - configure pelo menos 1 camera no .env (ver .env.example). Encerrando.")
        return
    threads = []
    for name, url in cameras.items():
        t = threading.Thread(target=watch_camera, args=(name, url), daemon=True)
        t.start()
        threads.append(t)
    log.info("gateway rodando com %d camera(s).", len(threads))
    for t in threads:
        t.join()


if __name__ == "__main__":
    main()

FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 libglib2.0-0 wget \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Modelo de deteccao (SSD MobileNet v2 COCO) - Apache License 2.0, baixado
# no build da imagem: sem pesos pra gerenciar manualmente e sem conflito de
# licenca copyleft com o app do cliente (ver VIDEO-IA-SETUP.md).
RUN wget -q "http://download.tensorflow.org/models/object_detection/ssd_mobilenet_v2_coco_2018_03_29.tar.gz" -O /tmp/model.tar.gz \
    && tar -xzf /tmp/model.tar.gz -C /tmp \
    && cp /tmp/ssd_mobilenet_v2_coco_2018_03_29/frozen_inference_graph.pb /app/frozen_inference_graph.pb \
    && rm -rf /tmp/model.tar.gz /tmp/ssd_mobilenet_v2_coco_2018_03_29
RUN wget -q "https://raw.githubusercontent.com/opencv/opencv_extra/master/testdata/dnn/ssd_mobilenet_v2_coco_2018_03_29.pbtxt" -O /app/ssd_mobilenet_v2_coco_2018_03_29.pbtxt

COPY bridge.py .

CMD ["python", "bridge.py"]

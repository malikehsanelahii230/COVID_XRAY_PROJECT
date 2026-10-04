import sys
import os
import joblib
import numpy as np
from PIL import Image

print("Prediction script started...")

if len(sys.argv) < 2:
    print("Usage: python predict.py <image_path>")
    sys.exit()

image_path = sys.argv[1]

print("Image path:", image_path)

if not os.path.exists(image_path):
    print("Image not found!")
    sys.exit()

print("Loading model...")

model = joblib.load("covid_xray_model.pkl")

print("Loading image...")

image = Image.open(image_path)

image = image.convert("L")
image = image.resize((64, 64))

pixels = np.array(image).flatten()
pixels = pixels / 255.0
pixels = pixels.reshape(1, -1)

print("Making prediction...")

prediction = model.predict(pixels)[0]
probabilities = model.predict_proba(pixels)[0]

print("\nPrediction:", prediction)

print("\nConfidence:")

for class_name, probability in zip(model.classes_, probabilities):
    print(f"{class_name}: {probability * 100:.2f}%")
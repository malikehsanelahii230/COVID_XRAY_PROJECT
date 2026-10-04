from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import pandas as pd
from PIL import Image
import io

app = FastAPI(title="COVID X-Ray Classification API")

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
model = joblib.load("covid_xray_model.pkl")


@app.get("/")
def home():
    return {
        "message": "COVID X-Ray Classification API is running"
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Read uploaded image
    image_bytes = await file.read()

    # Open image
    image = Image.open(io.BytesIO(image_bytes))

    # Convert to grayscale
    image = image.convert("L")

    # Resize to training size
    image = image.resize((64, 64))

    # Convert to pixels
    pixels = np.array(image).flatten()

    # Normalize
    pixels = pixels / 255.0

    pixels = pixels.reshape(1, -1)

    pixel_columns = [f"pixel_{i}" for i in range(4096)]

    pixels_df = pd.DataFrame(
        pixels,
        columns=pixel_columns
    )

    prediction = model.predict(pixels_df)[0]
    probabilities = model.predict_proba(pixels_df)[0]

    confidence = {}

    for class_name, probability in zip(model.classes_, probabilities):
        confidence[class_name] = round(float(probability * 100), 2)

    return {
        "prediction": prediction,
        "confidence": confidence
    }
    
from fastapi import FastAPI, UploadFile, File, HTTPException
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
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load models
model = joblib.load("covid_xray_model.pkl")
validator = joblib.load("xray_validator_model.pkl")


@app.get("/")
def home():
    return {
        "message": "COVID X-Ray Classification API is running"
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Read uploaded image
    image_bytes = await file.read()

    try:
        image = Image.open(io.BytesIO(image_bytes))
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid image file."
        )

    # Convert to grayscale
    image = image.convert("L")

    # Resize to training size
    image = image.resize((64, 64))

    # Convert to pixels
    pixels = np.array(image).flatten()

    # Normalize
    pixels = pixels / 255.0

    # -----------------------------
    # STEP 1: X-RAY VALIDATION
    # -----------------------------

    validator_input = pixels.reshape(1, -1)

    validator_prediction = validator.predict(validator_input)[0]
    validator_probabilities = validator.predict_proba(validator_input)[0]

    validator_confidence = {}

    for class_name, probability in zip(
        validator.classes_,
        validator_probabilities
    ):
        validator_confidence[class_name] = round(
            float(probability * 100), 2
        )

    # Reject non-X-ray images
    if validator_prediction == "NOT_X_RAY":
        return {
            "prediction": "NOT_X_RAY",
            "message": "Please upload a chest X-ray image.",
            "validator_confidence": validator_confidence
        }

    # -----------------------------
    # STEP 2: COVID CLASSIFICATION
    # -----------------------------

    pixel_columns = [
        f"pixel_{i}" for i in range(4096)
    ]

    pixels_df = pd.DataFrame(
        validator_input,
        columns=pixel_columns
    )

    prediction = model.predict(pixels_df)[0]
    probabilities = model.predict_proba(pixels_df)[0]

    confidence = {}

    for class_name, probability in zip(
        model.classes_,
        probabilities
    ):
        confidence[class_name] = round(
            float(probability * 100), 2
        )

    return {
        "prediction": prediction,
        "confidence": confidence,
        "validator": "X_RAY",
        "validator_confidence": validator_confidence
    }
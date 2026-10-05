# 🩻 COVID X-Ray Classification System

An AI-powered web application that analyzes chest X-ray images and classifies them into **COVID-19, Normal, or Pneumonia**.

The project also includes an **X-ray validation layer** that checks whether the uploaded image appears to be a chest X-ray before running the disease classifier.

> ⚠️ **Disclaimer:** This project is developed for educational and research purposes. It is not a medical diagnostic system and should not be used to make clinical decisions.

---

## 🌐 Live Demo

**Frontend:**
https://covidxrayproject-frontend.vercel.app/

**Backend API:**
https://covid-xray-project.fastapicloud.dev/

**API Documentation:**
https://covid-xray-project.fastapicloud.dev/docs

---

## ✨ Features

* 🩻 Chest X-ray image upload
* 🔍 X-ray vs. non-X-ray validation
* 🦠 COVID-19 classification
* 🫁 Pneumonia classification
* ✅ Normal X-ray classification
* 📊 Prediction confidence percentages
* 🌐 Live FastAPI backend
* ⚡ Fast frontend interface
* 📱 Responsive web interface
* 🚫 Rejects obvious non-X-ray images
* 🔗 Frontend and backend deployed separately

---

## 🧠 How It Works

The application uses a two-stage prediction pipeline:

```text
User Uploads Image
        ↓
Frontend
        ↓
FastAPI Backend
        ↓
X-Ray Validator
        ↓
 ┌───────────────┐
 │               │
NOT X-RAY      X-RAY
 │               │
Reject       Disease Classifier
                ↓
      ┌─────────┼─────────┐
      ↓         ↓         ↓
    COVID     NORMAL   PNEUMONIA
```

### Stage 1 — X-Ray Validation

The uploaded image is first processed and passed through an X-ray validation model.

If the image is identified as a non-X-ray image:

```json
{
  "prediction": "NOT_X_RAY",
  "message": "Please upload a chest X-ray image."
}
```

The system stops before running the disease classifier.

### Stage 2 — Disease Classification

If the image passes the X-ray validation stage, it is passed to the main classifier.

Possible predictions:

* `COVID`
* `NORMAL`
* `PNEUMONIA`

The API also returns confidence values for each class.

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Python
* FastAPI
* Uvicorn
* Pandas
* NumPy
* Pillow
* Joblib

### Machine Learning

* Scikit-learn
* Logistic Regression
* Image preprocessing
* Pixel-based classification

### Deployment

* **Vercel** — Frontend
* **FastAPI Cloud** — Backend
* **GitHub** — Source code and version control

---

## 📂 Project Structure

```text
COVID_XRAY_PROJECT/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── dataset/
│   ├── COVID/
│   ├── NORMAL/
│   └── PNEUMONIA/
│
├── xray_validator/
│   ├── X_RAY/
│   └── NOT_X_RAY/
│
├── app.py
├── covid_xray_model.pkl
├── xray_validator_model.pkl
├── requirements.txt
└── README.md
```

---

## 🔌 API Endpoint

### `POST /predict`

Upload an image to receive a prediction.

**Request:**

```text
POST /predict
Content-Type: multipart/form-data
```

### Example X-ray Response

```json
{
  "prediction": "COVID",
  "confidence": {
    "COVID": 91,
    "NORMAL": 9,
    "PNEUMONIA": 0
  },
  "validator": "X_RAY",
  "validator_confidence": {
    "NOT_X_RAY": 0,
    "X_RAY": 100
  }
}
```

### Example Non-X-Ray Response

```json
{
  "prediction": "NOT_X_RAY",
  "message": "Please upload a chest X-ray image.",
  "validator_confidence": {
    "NOT_X_RAY": 100,
    "X_RAY": 0
  }
}
```

---

## 🔬 Image Processing

Uploaded images are processed before prediction:

1. Image is opened using Pillow.
2. Image is converted to grayscale.
3. Image is resized to `64 × 64`.
4. Pixel values are extracted.
5. Pixel values are normalized to the `0–1` range.
6. The processed data is passed to the appropriate model.

---

## 🧪 X-Ray Validator

The project includes a separate validation model trained to distinguish between:

```text
X_RAY
NOT_X_RAY
```

The validator was tested on a held-out dataset and achieved high accuracy on that test set.

However, its performance should **not** be interpreted as medical-grade or general-purpose image verification because the negative examples used during development were limited.

---

## 🚀 Deployment

### Frontend

The frontend is deployed using Vercel:

https://covidxrayproject-frontend.vercel.app/

### Backend

The FastAPI backend is deployed using FastAPI Cloud:

https://covid-xray-project.fastapicloud.dev/

The frontend communicates with the backend through the `/predict` API endpoint.

---

## ⚠️ Limitations

This project is an educational machine-learning prototype.

Important limitations include:

* It should not be used for medical diagnosis.
* Model predictions may be incorrect.
* Confidence scores are model probabilities, not clinical certainty.
* The X-ray validator is not a medical image verification system.
* Model performance depends on the training dataset.
* The system may perform poorly on images that differ significantly from the training data.
* Real-world clinical deployment would require extensive validation, testing, and regulatory approval.

---

## 🔮 Future Improvements

Possible future improvements include:

* Improve the X-ray validation dataset.
* Add more diverse non-X-ray images.
* Use CNN/deep-learning architectures.
* Improve image preprocessing.
* Add model evaluation metrics and confusion matrices.
* Add explainable AI techniques such as Grad-CAM.
* Improve model generalization.
* Add authentication and API security.
* Add database logging for predictions.
* Improve frontend accessibility and UX.
* Perform validation on independent datasets.

---

## 👨‍💻 Author

**Malik Ehsan Elahii**

BS Artificial Intelligence
University of Agriculture Faisalabad

Interested in:

* Artificial Intelligence
* Machine Learning
* Data Science
* Python
* Web Development

---

## ⭐ Project Status

**Status: Completed & Deployed**

The project currently has a working frontend, live FastAPI backend, X-ray validation stage, and COVID/Normal/Pneumonia classification pipeline.

---

## 📄 License

This project is intended for educational and research purposes.

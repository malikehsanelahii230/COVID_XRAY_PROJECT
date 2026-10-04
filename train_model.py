import pandas as pd
import joblib
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay
)

print("Loading dataset...")

# Load CSV
df = pd.read_csv("xray_dataset.csv")

# Separate features and labels
X = df.drop("label", axis=1)
y = df["label"]

# Normalize pixel values
X = X / 255.0

print("Dataset loaded!")
print("X shape:", X.shape)
print("Y shape:", y.shape)

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("\nTraining images:", len(X_train))
print("Testing images:", len(X_test))

# Create model
print("\nTraining Random Forest...")

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

# Train model
model.fit(X_train, y_train)

print("Training completed!")

# Predictions
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)

print("\nAccuracy:", accuracy)

# Classification report
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Confusion matrix
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Save model
joblib.dump(model, "covid_xray_model.pkl")

print("\nModel saved successfully!")
print("File: covid_xray_model.pkl")
# Save classification report
report = classification_report(y_test, y_pred)

with open("model_report.txt", "w") as file:
    file.write("COVID X-RAY CLASSIFICATION MODEL REPORT\n")
    file.write("=" * 45 + "\n\n")
    file.write(f"Accuracy: {accuracy:.4f}\n\n")
    file.write("Classification Report:\n")
    file.write(report)

# Create confusion matrix
cm = confusion_matrix(y_test, y_pred)

disp = ConfusionMatrixDisplay(
    confusion_matrix=cm,
    display_labels=model.classes_
)

disp.plot()
plt.title("COVID X-Ray Classification - Confusion Matrix")
plt.tight_layout()

# Save confusion matrix image
plt.savefig("confusion_matrix.png")
plt.close()

print("\nEvaluation files saved!")
print("confusion_matrix.png")
print("model_report.txt")
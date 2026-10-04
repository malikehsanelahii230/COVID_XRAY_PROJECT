# import os

# dataset_path = "dataset"

# classes = ["COVID", "NORMAL", "PNEUMONIA"]

# for class_name in classes:
#     folder_path = os.path.join(dataset_path, class_name)

#     files = os.listdir(folder_path)

#     print(f"{class_name}: {len(files)} images")
import os
import pandas as pd
from PIL import Image

dataset_path = "dataset"

classes = ["COVID", "NORMAL", "PNEUMONIA"]

data = []

# Image size
IMG_SIZE = (64, 64)

for class_name in classes:
    folder_path = os.path.join(dataset_path, class_name)

    print(f"Processing {class_name}...")

    for file_name in os.listdir(folder_path):

        if file_name.lower().endswith(".png"):

            image_path = os.path.join(folder_path, file_name)

            try:
                # Open image
                image = Image.open(image_path)

                # Convert to grayscale
                image = image.convert("L")

                # Resize image
                image = image.resize(IMG_SIZE)

                # Convert image to pixel values
                pixels = list(image.getdata())

                # Add label
                pixels.append(class_name)

                data.append(pixels)

            except Exception as e:
                print(f"Error with {file_name}: {e}")

# Create column names
pixel_columns = [f"pixel_{i}" for i in range(64 * 64)]

columns = pixel_columns + ["label"]

# Create DataFrame
df = pd.DataFrame(data, columns=columns)

# Save CSV
df.to_csv("xray_dataset.csv", index=False)

print("\nDataset created successfully!")
print(f"Total images: {len(df)}")
print(f"CSV shape: {df.shape}")
print("\nClass distribution:")
print(df["label"].value_counts())
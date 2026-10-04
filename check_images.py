import os

dataset_path = "dataset"

classes = ["COVID", "NORMAL", "PNEUMONIA"]

for class_name in classes:
    folder_path = os.path.join(dataset_path, class_name)

    files = os.listdir(folder_path)

    extensions = {}

    for file in files:
        extension = os.path.splitext(file)[1].lower()

        if extension in extensions:
            extensions[extension] += 1
        else:
            extensions[extension] = 1

    print(f"\n{class_name}")
    print(f"Total files: {len(files)}")
    print("File types:", extensions)
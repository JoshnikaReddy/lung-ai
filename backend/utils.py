from PIL import Image
import numpy as np

IMG_SIZE = (224, 224)

def preprocess_image(image_path):
    """
    Load and preprocess an X-ray image for DenseNet.
    """
    image = Image.open(image_path).convert("RGB")
    image = image.resize(IMG_SIZE)

    image = np.array(image, dtype=np.float32)
    image = image / 255.0

    image = np.expand_dims(image, axis=0)

    return image
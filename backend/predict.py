import tensorflow as tf
import numpy as np
from utils import preprocess_image

# Load the trained model
MODEL_PATH = "../models/final_densenet.keras"
model = tf.keras.models.load_model(MODEL_PATH)

# Disease classes (update if your training order was different)
CLASS_NAMES = [
    "COVID",
    "Normal",
    "Pneumonia",
    "Tuberculosis"
]


def predict_xray(image_path):
    """
    Predict disease from an X-ray image.
    """
    image = preprocess_image(image_path)

    predictions = model.predict(image, verbose=0)

    predicted_index = np.argmax(predictions)

    predicted_class = CLASS_NAMES[predicted_index]

    confidence = float(predictions[0][predicted_index] * 100)

    return {
        "prediction": predicted_class,
        "confidence": round(confidence, 2),
        "probabilities": predictions[0].tolist()
    }
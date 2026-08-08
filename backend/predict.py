import tensorflow as tf
import numpy as np
import cv2
import os

from utils import preprocess_image
from gradcam import generate_gradcam
from report_generator import generate_pdf

# Load the trained model
MODEL_PATH = "../models/final_densenet.keras"
model = tf.keras.models.load_model(MODEL_PATH)

# Disease classes
CLASS_NAMES = [
    "COVID",
    "Normal",
    "Pneumonia",
    "Tuberculosis"
]

# Last convolutional layer used for Grad-CAM
LAST_CONV_LAYER_NAME = "conv5_block16_concat"


def predict_xray(image_path):
    """
    Predict disease from an X-ray image.
    """

    # Preprocess image
    image = preprocess_image(image_path)

    # Predict
    predictions = model.predict(image, verbose=0)

    predicted_index = np.argmax(predictions)

    predicted_class = CLASS_NAMES[predicted_index]

    confidence = float(predictions[0][predicted_index] * 100)

    # ==========================
    # Generate Grad-CAM
    # ==========================

    heatmap = generate_gradcam(
        model,
        image,
        LAST_CONV_LAYER_NAME
    )

    # Read original image
    original = cv2.imread(image_path)

    # Resize heatmap
    heatmap = cv2.resize(
        heatmap,
        (original.shape[1], original.shape[0])
    )

    # Convert heatmap to color
    heatmap = np.uint8(255 * heatmap)
    heatmap = cv2.applyColorMap(
        heatmap,
        cv2.COLORMAP_JET
    )

    # Overlay
    overlay = cv2.addWeighted(
        original,
        0.6,
        heatmap,
        0.4,
        0
    )

    # Save heatmap
    heatmap_path = os.path.join(
        "uploads",
        "heatmap.png"
    )

    cv2.imwrite(
        heatmap_path,
        overlay
    )

    # ==========================
    # Generate PDF Report
    # ==========================

    report_path = generate_pdf(
        predicted_class,
        round(confidence, 2),
        image_path,          # Original X-ray
        heatmap_path         # Grad-CAM
    )

    # ==========================
    # Return Response
    # ==========================

    return {
        "prediction": predicted_class,
        "confidence": round(confidence, 2),
        "probabilities": predictions[0].tolist(),
        "heatmap": heatmap_path,
        "report": report_path
    }
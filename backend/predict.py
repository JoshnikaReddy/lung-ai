import tensorflow as tf
import numpy as np
import cv2
import os
import json
import uuid
from datetime import datetime

from utils import preprocess_image
from gradcam import generate_gradcam
from report_generator import generate_pdf


# ==================================================
# Load the trained model
# ==================================================

MODEL_PATH = "../models/final_densenet.keras"

model = tf.keras.models.load_model(MODEL_PATH)


# ==================================================
# Disease classes
# ==================================================

CLASS_NAMES = [
    "COVID",
    "Normal",
    "Pneumonia",
    "Tuberculosis"
]


# ==================================================
# Grad-CAM layer
# ==================================================

LAST_CONV_LAYER_NAME = "conv5_block16_concat"


# ==================================================
# History file
# ==================================================

HISTORY_FILE = "history.json"


# ==================================================
# Prediction
# ==================================================

def predict_xray(image_path):

    # --------------------------------------------------
    # Preprocess image
    # --------------------------------------------------

    image = preprocess_image(image_path)


    # --------------------------------------------------
    # AI prediction
    # --------------------------------------------------

    predictions = model.predict(
        image,
        verbose=0
    )

    predicted_index = np.argmax(predictions)

    predicted_class = CLASS_NAMES[predicted_index]

    confidence = round(
        float(predictions[0][predicted_index] * 100),
        2
    )


    # --------------------------------------------------
    # Generate Grad-CAM
    # --------------------------------------------------

    heatmap = generate_gradcam(
        model,
        image,
        LAST_CONV_LAYER_NAME
    )


    # --------------------------------------------------
    # Read original X-ray
    # --------------------------------------------------

    original = cv2.imread(image_path)

    if original is None:
        raise ValueError(
            "Unable to read the uploaded X-ray image."
        )


    # --------------------------------------------------
    # Resize heatmap
    # --------------------------------------------------

    heatmap = cv2.resize(
        heatmap,
        (
            original.shape[1],
            original.shape[0]
        )
    )


    # --------------------------------------------------
    # Convert heatmap to color
    # --------------------------------------------------

    heatmap = np.uint8(
        255 * heatmap
    )

    heatmap = cv2.applyColorMap(
        heatmap,
        cv2.COLORMAP_JET
    )


    # --------------------------------------------------
    # Overlay heatmap
    # --------------------------------------------------

    overlay = cv2.addWeighted(
        original,
        0.6,
        heatmap,
        0.4,
        0
    )


    # ==================================================
    # Create UNIQUE filenames
    # ==================================================

    timestamp = datetime.now().strftime(
        "%Y%m%d_%H%M%S"
    )

    unique_id = uuid.uuid4().hex[:6]


    heatmap_filename = (
        f"heatmap_{timestamp}_{unique_id}.png"
    )

    report_filename = (
        f"LungAI_Report_{timestamp}_{unique_id}.pdf"
    )


    # ==================================================
    # Save unique Grad-CAM
    # ==================================================

    heatmap_path = os.path.join(
        "uploads",
        heatmap_filename
    )

    cv2.imwrite(
        heatmap_path,
        overlay
    )


    # ==================================================
    # Generate unique PDF
    # ==================================================

    report_path = os.path.join(
        "uploads",
        report_filename
    )

    generate_pdf(
        predicted_class,
        confidence,
        image_path,
        heatmap_path,
        report_path
    )


    # ==================================================
    # Create history entry
    # ==================================================

    history_entry = {
        "prediction": predicted_class,
        "confidence": confidence,
        "probabilities": predictions[0].tolist(),
        "image": image_path,
        "heatmap": heatmap_path,
        "report": report_path,
        "date": datetime.now().strftime(
            "%d-%m-%Y"
        ),
        "time": datetime.now().strftime(
            "%H:%M:%S"
        )
    }


    # ==================================================
    # Read existing history
    # ==================================================

    if os.path.exists(HISTORY_FILE):

        try:

            with open(
                HISTORY_FILE,
                "r"
            ) as file:

                history = json.load(file)

        except (
            json.JSONDecodeError,
            FileNotFoundError
        ):

            history = []

    else:

        history = []


    # ==================================================
    # Add new record
    # ==================================================

    history.append(
        history_entry
    )


    # ==================================================
    # Save history
    # ==================================================

    with open(
        HISTORY_FILE,
        "w"
    ) as file:

        json.dump(
            history,
            file,
            indent=4
        )


    # ==================================================
    # Return result to frontend
    # ==================================================

    return {
        "prediction": predicted_class,
        "confidence": confidence,
        "probabilities": predictions[0].tolist(),

        # Original X-ray
        "image": image_path,

        # Grad-CAM
        "heatmap": heatmap_path,

        # PDF report
        "report": report_path
    }
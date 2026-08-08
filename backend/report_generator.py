from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from datetime import datetime
import os


def generate_pdf(
    prediction,
    confidence,
    image_path,
    heatmap_path,
    pdf_path
):
    """
    Generate a LungAI PDF report with a unique filename.
    """

    output_folder = "uploads"

    os.makedirs(
        output_folder,
        exist_ok=True
    )

    c = canvas.Canvas(
        pdf_path,
        pagesize=A4
    )

    width, height = A4


    # ==================================================
    # Header
    # ==================================================

    c.setFillColor(
        HexColor("#1565C0")
    )

    c.setFont(
        "Helvetica-Bold",
        28
    )

    c.drawCentredString(
        width / 2,
        height - 50,
        "LungAI"
    )


    c.setFillColor(
        HexColor("#333333")
    )

    c.setFont(
        "Helvetica-Bold",
        18
    )

    c.drawCentredString(
        width / 2,
        height - 75,
        "AI Lung Disease Detection Report"
    )


    # ==================================================
    # Line
    # ==================================================

    c.setStrokeColor(
        HexColor("#1565C0")
    )

    c.setLineWidth(2)

    c.line(
        40,
        height - 90,
        width - 40,
        height - 90
    )


    # ==================================================
    # Report Details
    # ==================================================

    c.setFillColor(
        HexColor("#000000")
    )

    c.setFont(
        "Helvetica",
        12
    )

    c.drawString(
        50,
        height - 120,
        f"Generated : {datetime.now().strftime('%d-%m-%Y %H:%M:%S')}"
    )


    # ==================================================
    # Prediction
    # ==================================================

    c.setFont(
        "Helvetica-Bold",
        16
    )

    c.drawString(
        50,
        height - 155,
        f"Prediction : {prediction}"
    )


    # ==================================================
    # Confidence
    # ==================================================

    c.drawString(
        50,
        height - 180,
        f"Confidence : {confidence}%"
    )


    # ==================================================
    # Original X-ray
    # ==================================================

    c.setFont(
        "Helvetica-Bold",
        16
    )

    c.drawString(
        50,
        height - 220,
        "Original X-ray"
    )

    if os.path.exists(image_path):

        c.drawImage(
            image_path,
            50,
            height - 500,
            width=220,
            height=240,
            preserveAspectRatio=True,
            anchor="c"
        )


    # ==================================================
    # Grad-CAM
    # ==================================================

    c.drawString(
        320,
        height - 220,
        "Grad-CAM"
    )

    if os.path.exists(heatmap_path):

        c.drawImage(
            heatmap_path,
            320,
            height - 500,
            width=220,
            height=240,
            preserveAspectRatio=True,
            anchor="c"
        )


    # ==================================================
    # Disclaimer
    # ==================================================

    c.setFont(
        "Helvetica",
        9
    )

    c.setFillColor(
        HexColor("#666666")
    )

    c.drawString(
        50,
        50,
        "Disclaimer: This AI-generated result is for research and"
    )

    c.drawString(
        50,
        38,
        "educational purposes only and should not replace medical advice."
    )


    # ==================================================
    # Save PDF
    # ==================================================

    c.save()

    return pdf_path
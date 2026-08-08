from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

import os
import shutil
import json

from predict import predict_xray


# ==================================================
# Create FastAPI application
# ==================================================

app = FastAPI(title="LungAI API")


# ==================================================
# Allow React frontend to connect
# ==================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================================================
# Upload folder
# ==================================================

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


# ==================================================
# History file
# ==================================================

HISTORY_FILE = "history.json"


# ==================================================
# Serve uploaded files
# ==================================================

app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_FOLDER),
    name="uploads"
)


# ==================================================
# Home
# ==================================================

@app.get("/")
def home():
    return {
        "message": "LungAI Backend Running"
    }


# ==================================================
# Prediction API
# ==================================================

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Save uploaded image
    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    # Run prediction
    result = predict_xray(
        file_path
    )

    # Print prediction in terminal
    print(result)

    return result


# ==================================================
# History API
# ==================================================

@app.get("/history")
def get_history():

    # If history file doesn't exist
    if not os.path.exists(HISTORY_FILE):
        return []


    try:

        with open(
            HISTORY_FILE,
            "r"
        ) as file:

            history = json.load(file)

        return history


    except (json.JSONDecodeError, FileNotFoundError):

        return []
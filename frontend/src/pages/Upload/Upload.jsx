import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FaCloudUploadAlt,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

import { predictXray } from "../../services/api";


function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");


  // ==================================================
  // Select X-ray
  // ==================================================

  const onDrop = (acceptedFiles) => {

    const selectedFile = acceptedFiles[0];

    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);

    setPreview(
      URL.createObjectURL(selectedFile)
    );

    setResult(null);
    setError("");
  };


  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    onDrop,
  });


  // ==================================================
  // Analyze X-ray
  // ==================================================

  const handleAnalyze = async () => {

    if (!file) {
      setError(
        "Please select an X-ray image first."
      );

      return;
    }


    try {

      setLoading(true);
      setError("");
      setResult(null);


      const data = await predictXray(file);


      console.log(
        "Prediction result:",
        data
      );


      setResult(data);

    } catch (err) {

      console.error(err);

      setError(
        "Prediction failed. Please make sure the backend is running."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==================================================
  // Reset
  // ==================================================

  const handleReset = () => {

    setFile(null);
    setPreview(null);
    setResult(null);
    setError("");

  };


  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* ==================================================
          Header
      ================================================== */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Upload X-ray
        </h1>

        <p className="text-gray-500 mt-2">
          Upload a chest X-ray to analyze it using LungAI.
        </p>

      </div>


      <div className="max-w-4xl">

        {/* ==================================================
            Upload Card
        ================================================== */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed
              rounded-2xl
              h-96
              flex
              flex-col
              items-center
              justify-center
              cursor-pointer
              transition
              ${
                isDragActive
                  ? "border-blue-600 bg-blue-50"
                  : "border-blue-400 hover:bg-blue-50"
              }
            `}
          >

            <input {...getInputProps()} />


            {preview ? (

              <img
                src={preview}
                alt="X-ray preview"
                className="h-80 max-w-full object-contain rounded-xl"
              />

            ) : (

              <>

                <FaCloudUploadAlt
                  size={75}
                  className="text-blue-500 mb-5"
                />

                <p className="text-2xl font-semibold">

                  {isDragActive
                    ? "Drop the X-ray here"
                    : "Drag & Drop X-ray Here"}

                </p>

                <p className="text-gray-500 mt-3">
                  or click to browse
                </p>

                <p className="text-sm text-gray-400 mt-2">
                  Supported image files
                </p>

              </>

            )}

          </div>


          {/* Selected file */}

          {file && (

            <div className="mt-5 bg-blue-50 rounded-xl p-4">

              <p className="text-sm text-gray-500">
                Selected file
              </p>

              <p className="font-semibold text-blue-700">
                {file.name}
              </p>

            </div>

          )}


          {/* Error */}

          {error && (

            <div className="mt-5 bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">

              {error}

            </div>

          )}


          {/* Analyze button */}

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-xl text-lg font-semibold transition flex items-center justify-center gap-3"
          >

            {loading ? (

              <>
                <FaSpinner className="animate-spin" />

                Analyzing X-ray...

              </>

            ) : (

              <>
                <FaCheckCircle />

                Analyze X-ray

              </>

            )}

          </button>


          {/* Reset button */}

          {file && !loading && (

            <button
              onClick={handleReset}
              className="mt-3 w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold transition"
            >
              Choose Another X-ray
            </button>

          )}

        </div>


        {/* ==================================================
            Result
        ================================================== */}

        {result && (

          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

            <div className="flex items-center gap-3 mb-6">

              <FaCheckCircle
                className="text-green-500"
                size={28}
              />

              <h2 className="text-2xl font-bold">
                Analysis Complete
              </h2>

            </div>


            <div className="grid md:grid-cols-2 gap-6">

              {/* Prediction */}

              <div className="bg-blue-50 rounded-xl p-6">

                <p className="text-gray-500">
                  Predicted Disease
                </p>

                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {result.prediction}
                </p>

              </div>


              {/* Confidence */}

              <div className="bg-green-50 rounded-xl p-6">

                <p className="text-gray-500">
                  Confidence
                </p>

                <p className="text-3xl font-bold text-green-600 mt-2">
                  {result.confidence}%
                </p>

              </div>

            </div>


            {/* Grad-CAM */}

            {result.heatmap && (

              <div className="mt-8">

                <h3 className="text-xl font-bold mb-4">
                  Grad-CAM Heatmap
                </h3>

                <div className="bg-gray-100 rounded-xl p-4">

                  <img
                    src={`http://127.0.0.1:8000/${result.heatmap}`}
                    alt="Grad-CAM"
                    className="w-full max-h-96 object-contain rounded-xl"
                  />

                </div>

              </div>

            )}


            {/* Report */}

            {result.report && (

              <a
                href={`http://127.0.0.1:8000/${result.report}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block w-full text-center bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
              >
                View PDF Report
              </a>

            )}

          </div>

        )}

      </div>

    </div>
  );
}


export default Upload;
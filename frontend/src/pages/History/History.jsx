import { useEffect, useState } from "react";

import {
  FaHistory,
  FaFilePdf,
  FaImage,
  FaCalendarAlt,
  FaTrash,
  FaDownload,
} from "react-icons/fa";


const BACKEND_URL = "http://127.0.0.1:8000";


function getFileUrl(path) {

  if (!path) {
    return null;
  }

  const normalizedPath = path.replaceAll("\\", "/");

  if (
    normalizedPath.startsWith("http://") ||
    normalizedPath.startsWith("https://")
  ) {
    return normalizedPath;
  }

  return `${BACKEND_URL}/${normalizedPath}`;
}


function History() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clearing, setClearing] = useState(false);


  // ==================================================
  // Load history
  // ==================================================

  const loadHistory = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `${BACKEND_URL}/history`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }

      const data = await response.json();

      setHistory([...data].reverse());

    } catch (err) {

      console.error(err);

      setError(
        "Unable to load prediction history."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadHistory();

  }, []);


  // ==================================================
  // Clear history
  // ==================================================

  const clearHistory = async () => {

    if (history.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to clear all prediction history?"
    );

    if (!confirmed) {
      return;
    }


    try {

      setClearing(true);

      const response = await fetch(
        `${BACKEND_URL}/history`,
        {
          method: "DELETE",
        }
      );


      if (!response.ok) {
        throw new Error("Failed to clear history");
      }


      setHistory([]);

      alert("Prediction history cleared successfully.");

    } catch (err) {

      console.error(err);

      alert(
        "Unable to clear history. Please check the backend."
      );

    } finally {

      setClearing(false);

    }
  };


  return (

    <div>

      {/* ==================================================
          Header
      ================================================== */}

      <div className="mb-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <div className="flex items-center gap-3">

              <FaHistory
                className="text-blue-600"
                size={30}
              />

              <h1 className="text-4xl font-bold">
                Prediction History
              </h1>

            </div>

            <p className="text-gray-500 mt-2">
              View your previous LungAI X-ray analyses.
            </p>

          </div>


          {/* Clear History */}

          {history.length > 0 && (

            <button
              onClick={clearHistory}
              disabled={clearing}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-5 py-3 rounded-xl font-semibold transition"
            >

              <FaTrash />

              {clearing
                ? "Clearing..."
                : "Clear History"}

            </button>

          )}

        </div>

      </div>


      {/* ==================================================
          Loading
      ================================================== */}

      {loading && (

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

          <p className="text-lg text-gray-500">
            Loading prediction history...
          </p>

        </div>

      )}


      {/* ==================================================
          Error
      ================================================== */}

      {!loading && error && (

        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">

          <p className="text-red-600">
            {error}
          </p>

          <button
            onClick={loadHistory}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Try Again
          </button>

        </div>

      )}


      {/* ==================================================
          Empty History
      ================================================== */}

      {!loading &&
        !error &&
        history.length === 0 && (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <FaHistory
              className="mx-auto text-gray-400 mb-4"
              size={50}
            />

            <h2 className="text-2xl font-semibold">
              No Predictions Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Analyze an X-ray to see your prediction history here.
            </p>

          </div>

        )}


      {/* ==================================================
          History Cards
      ================================================== */}

      {!loading &&
        !error &&
        history.length > 0 && (

          <div className="space-y-6">

            {history.map((item, index) => {

              const imageUrl = getFileUrl(
                item.image
              );

              const heatmapUrl = getFileUrl(
                item.heatmap
              );

              const reportUrl = getFileUrl(
                item.report
              );


              return (

                <div
                  key={`${item.date}-${item.time}-${index}`}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >

                  <div className="flex flex-col lg:flex-row gap-6">


                    {/* ==================================================
                        Original X-ray
                    ================================================== */}

                    <div className="lg:w-56">

                      {imageUrl ? (

                        <img
                          src={imageUrl}
                          alt="Chest X-ray"
                          className="w-full h-44 object-contain bg-gray-100 rounded-xl"
                        />

                      ) : (

                        <div className="w-full h-44 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                          Image unavailable
                        </div>

                      )}

                    </div>


                    {/* ==================================================
                        Details
                    ================================================== */}

                    <div className="flex-1">

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">


                        {/* Disease */}

                        <div>

                          <p className="text-sm text-gray-500">
                            Predicted Disease
                          </p>

                          <h2 className="text-2xl font-bold text-blue-600">
                            {item.prediction}
                          </h2>

                        </div>


                        {/* Confidence */}

                        <div className="bg-green-50 px-5 py-3 rounded-xl">

                          <p className="text-sm text-gray-500">
                            Confidence
                          </p>

                          <p className="text-xl font-bold text-green-600">
                            {item.confidence}%
                          </p>

                        </div>

                      </div>


                      {/* Date */}

                      <div className="flex items-center gap-2 text-gray-500 mt-5">

                        <FaCalendarAlt />

                        <span>
                          {item.date} at {item.time}
                        </span>

                      </div>


                      {/* ==================================================
                          Buttons
                      ================================================== */}

                      <div className="flex flex-wrap gap-3 mt-5">


                        {/* PDF */}

                        {reportUrl && (

                          <a
                            href={reportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                          >

                            <FaFilePdf />

                            View PDF Report

                          </a>

                        )}


                        {/* Grad-CAM */}

                        {heatmapUrl && (

                          <a
                            href={heatmapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition"
                          >

                            <FaImage />

                            View Grad-CAM

                          </a>

                        )}


                        {/* Download PDF */}

                        {reportUrl && (

                          <a
                            href={reportUrl}
                            download
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                          >

                            <FaDownload />

                            Download PDF

                          </a>

                        )}

                      </div>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        )}

    </div>

  );
}


export default History;
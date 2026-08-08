import { useEffect, useState } from "react";

import {
  FaFilePdf,
  FaDownload,
  FaImage,
  FaCalendarAlt,
  FaFileMedical,
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


function Reports() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==================================================
  // Load reports
  // ==================================================

  const loadReports = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `${BACKEND_URL}/history`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }

      const data = await response.json();

      setHistory([...data].reverse());

    } catch (err) {

      console.error(err);

      setError(
        "Unable to load reports."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadReports();

  }, []);


  // ==================================================
  // Download file
  // ==================================================

  const downloadFile = (url, filename) => {

    if (!url) {
      return;
    }

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };


  return (

    <div>

      {/* ==================================================
          Header
      ================================================== */}

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <FaFileMedical
            className="text-blue-600"
            size={32}
          />

          <h1 className="text-4xl font-bold">
            Reports
          </h1>

        </div>

        <p className="text-gray-500 mt-2">
          View and download your generated LungAI reports.
        </p>

      </div>


      {/* ==================================================
          Loading
      ================================================== */}

      {loading && (

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

          <p className="text-lg text-gray-500">
            Loading reports...
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
            onClick={loadReports}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Try Again
          </button>

        </div>

      )}


      {/* ==================================================
          No reports
      ================================================== */}

      {!loading &&
        !error &&
        history.length === 0 && (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <FaFilePdf
              className="mx-auto text-gray-400 mb-4"
              size={55}
            />

            <h2 className="text-2xl font-semibold">
              No Reports Available
            </h2>

            <p className="text-gray-500 mt-2">
              Analyze an X-ray to generate your first report.
            </p>

          </div>

        )}


      {/* ==================================================
          Reports
      ================================================== */}

      {!loading &&
        !error &&
        history.length > 0 && (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {history.map((item, index) => {

              const reportUrl = getFileUrl(
                item.report
              );

              const heatmapUrl = getFileUrl(
                item.heatmap
              );


              return (

                <div
                  key={`${item.date}-${item.time}-${index}`}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                >

                  {/* ==================================================
                      Icon
                  ================================================== */}

                  <div className="flex items-center justify-between mb-5">

                    <div className="bg-red-100 p-4 rounded-xl">

                      <FaFilePdf
                        className="text-red-600"
                        size={28}
                      />

                    </div>

                    <span className="text-sm text-gray-400">
                      Report #{history.length - index}
                    </span>

                  </div>


                  {/* ==================================================
                      Disease
                  ================================================== */}

                  <p className="text-sm text-gray-500">
                    AI Diagnosis
                  </p>

                  <h2 className="text-2xl font-bold text-blue-600">
                    {item.prediction}
                  </h2>


                  {/* ==================================================
                      Confidence
                  ================================================== */}

                  <div className="mt-4">

                    <p className="text-sm text-gray-500">
                      Confidence
                    </p>

                    <p className="text-xl font-bold text-green-600">
                      {item.confidence}%
                    </p>

                  </div>


                  {/* ==================================================
                      Date
                  ================================================== */}

                  <div className="flex items-center gap-2 text-gray-500 mt-4">

                    <FaCalendarAlt />

                    <span>
                      {item.date} at {item.time}
                    </span>

                  </div>


                  {/* ==================================================
                      Buttons
                  ================================================== */}

                  <div className="space-y-3 mt-6">


                    {/* View PDF */}

                    {reportUrl && (

                      <a
                        href={reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition"
                      >

                        <FaFilePdf />

                        View PDF Report

                      </a>

                    )}


                    {/* Download PDF */}

                    {reportUrl && (

                      <button
                        onClick={() =>
                          downloadFile(
                            reportUrl,
                            `LungAI_Report_${history.length - index}.pdf`
                          )
                        }
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
                      >

                        <FaDownload />

                        Download PDF

                      </button>

                    )}


                    {/* View Grad-CAM */}

                    {heatmapUrl && (

                      <a
                        href={heatmapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition"
                      >

                        <FaImage />

                        View Grad-CAM

                      </a>

                    )}

                  </div>

                </div>

              );

            })}

          </div>

        )}

    </div>

  );
}


export default Reports;
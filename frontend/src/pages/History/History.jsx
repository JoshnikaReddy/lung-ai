import { useEffect, useState } from "react";
import {
  FaHistory,
  FaFilePdf,
  FaImage,
  FaCalendarAlt,
} from "react-icons/fa";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/history")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        return response.json();
      })
      .then((data) => {
        setHistory(data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load prediction history.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}
      <div className="mb-8">

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


      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

          <p className="text-lg text-gray-500">
            Loading prediction history...
          </p>

        </div>
      )}


      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">

          <p className="text-red-600">
            {error}
          </p>

        </div>
      )}


      {/* Empty */}
      {!loading && !error && history.length === 0 && (
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


      {/* History Cards */}
      {!loading && !error && history.length > 0 && (

        <div className="space-y-6">

          {history.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              <div className="flex flex-col lg:flex-row gap-6">

                {/* Image */}
                <div className="lg:w-48">

                  <img
                    src={`http://127.0.0.1:8000/${item.image}`}
                    alt="Chest X-ray"
                    className="w-full h-40 object-contain bg-gray-100 rounded-xl"
                  />

                </div>


                {/* Details */}
                <div className="flex-1">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div>

                      <p className="text-sm text-gray-500">
                        Predicted Disease
                      </p>

                      <h2 className="text-2xl font-bold text-blue-600">
                        {item.prediction}
                      </h2>

                    </div>


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


                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3 mt-5">

                    <a
                      href={`http://127.0.0.1:8000/${item.report}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                    >

                      <FaFilePdf />

                      View Report

                    </a>


                    <a
                      href={`http://127.0.0.1:8000/${item.heatmap}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
                    >

                      <FaImage />

                      View Grad-CAM

                    </a>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default History;
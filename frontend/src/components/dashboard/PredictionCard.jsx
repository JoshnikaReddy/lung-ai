import { FaHeartbeat } from "react-icons/fa";

function PredictionCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 h-full">
      <h2 className="text-2xl font-bold mb-6">
        AI Prediction
      </h2>

      <div className="space-y-6">

        <div className="bg-blue-50 rounded-xl p-5">
          <p className="text-gray-500 text-sm">
            Predicted Disease
          </p>

          <h3 className="text-3xl font-bold text-blue-600 mt-2">
            Tuberculosis
          </h3>
        </div>

        <div className="bg-green-50 rounded-xl p-5">
          <p className="text-gray-500 text-sm">
            Confidence
          </p>

          <h3 className="text-3xl font-bold text-green-600 mt-2">
            98.42%
          </h3>
        </div>

        <div className="bg-red-50 rounded-xl p-5 flex items-center gap-4">
          <FaHeartbeat
            size={35}
            className="text-red-500"
          />

          <div>
            <p className="text-gray-500 text-sm">
              Risk Level
            </p>

            <h3 className="text-xl font-bold text-red-600">
              High
            </h3>
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition">
          View Detailed Report
        </button>

      </div>
    </div>
  );
}

export default PredictionCard;
import { FaHeartbeat } from "react-icons/fa";

function PredictionCard({ prediction }) {
  const disease = prediction?.prediction || "No Prediction";
  const confidence = prediction?.confidence || "0.00";

  let risk = "Low";
  let riskColor = "text-green-600";
  let riskBg = "bg-green-50";

  if (confidence >= 90) {
    risk = "High";
    riskColor = "text-red-600";
    riskBg = "bg-red-50";
  } else if (confidence >= 70) {
    risk = "Medium";
    riskColor = "text-yellow-600";
    riskBg = "bg-yellow-50";
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 h-full">
      <h2 className="text-2xl font-bold mb-6">
        AI Prediction
      </h2>

      <div className="space-y-6">

        {/* Disease */}
        <div className="bg-blue-50 rounded-xl p-5">
          <p className="text-gray-500 text-sm">
            Predicted Disease
          </p>

          <h3 className="text-3xl font-bold text-blue-600 mt-2">
            {disease}
          </h3>
        </div>

        {/* Confidence */}
        <div className="bg-green-50 rounded-xl p-5">
          <p className="text-gray-500 text-sm">
            Confidence
          </p>

          <h3 className="text-3xl font-bold text-green-600 mt-2">
            {confidence}%
          </h3>
        </div>

        {/* Risk */}
        <div className={`${riskBg} rounded-xl p-5 flex items-center gap-4`}>
          <FaHeartbeat
            size={35}
            className={riskColor}
          />

          <div>
            <p className="text-gray-500 text-sm">
              Risk Level
            </p>

            <h3 className={`text-xl font-bold ${riskColor}`}>
              {risk}
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
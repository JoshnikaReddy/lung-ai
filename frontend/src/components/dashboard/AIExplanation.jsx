import { FaBrain } from "react-icons/fa";

function AIExplanation() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <div className="flex items-center gap-3 mb-6">
        <FaBrain className="text-blue-600 text-3xl" />
        <h2 className="text-2xl font-bold">
          AI Explanation
        </h2>
      </div>

      <div className="bg-blue-50 rounded-xl p-6">

        <p className="text-gray-700 leading-8">

          The AI model focused mainly on the upper-right lung region,
          where abnormal opacity was detected. This region contributed
          significantly to the prediction of <b>Tuberculosis</b> with
          high confidence.

        </p>

      </div>

      <div className="mt-6">

        <h3 className="font-bold text-lg mb-2">
          Explainable AI (Grad-CAM)
        </h3>

        <p className="text-gray-600">

          The highlighted regions on the heatmap indicate the
          most influential areas used by the DenseNet121 model
          to make its prediction.

        </p>

      </div>

    </div>
  );
}

export default AIExplanation;
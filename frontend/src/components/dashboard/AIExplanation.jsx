import { FaBrain, FaInfoCircle } from "react-icons/fa";

function AIExplanation({ prediction }) {
  let explanation =
    "Upload an X-ray image to receive an AI-generated explanation.";

  let recommendation = "";
  let confidenceText = "";

  if (prediction) {
    const confidence = Number(prediction.confidence || 0);

    confidenceText = `The model predicted ${prediction.prediction} with ${confidence.toFixed(
      2
    )}% confidence.`;

    switch (prediction.prediction) {
      case "COVID":
        explanation =
          "The AI model detected imaging patterns that contributed to a COVID-19 prediction. Areas highlighted by Grad-CAM represent regions that had greater influence on the model's decision.";

        recommendation =
          "This is an AI-assisted screening result and should not be considered a final diagnosis. Clinical evaluation and appropriate laboratory testing should be considered by a healthcare professional.";
        break;

      case "Pneumonia":
        explanation =
          "The AI model detected imaging patterns that contributed to a Pneumonia prediction. The Grad-CAM heatmap highlights regions that were most influential in the model's decision.";

        recommendation =
          "This result should be reviewed by a healthcare professional along with the patient's symptoms and other clinical findings.";
        break;

      case "Tuberculosis":
        explanation =
          "The AI model detected imaging patterns that contributed to a Tuberculosis prediction. The Grad-CAM heatmap highlights regions that had greater influence on the model's decision.";

        recommendation =
          "Further clinical evaluation and appropriate diagnostic testing are recommended. Please consult a qualified healthcare professional.";
        break;

      case "Normal":
        explanation =
          "The AI model did not identify significant patterns associated with the diseases represented in its training classes. The Grad-CAM visualization shows the regions that influenced this prediction.";

        recommendation =
          "A Normal prediction does not rule out every possible medical condition. Consult a healthcare professional if symptoms or concerns persist.";
        break;

      default:
        explanation =
          "The AI model produced a prediction, but an explanation is not available for this result.";

        recommendation =
          "Please consult a healthcare professional for clinical interpretation.";
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">

        <FaBrain className="text-blue-600 text-3xl" />

        <h2 className="text-2xl font-bold">
          AI Explanation
        </h2>

      </div>


      {/* Explanation */}
      <div className="bg-blue-50 rounded-xl p-6">

        <p className="text-gray-700 leading-8">
          {explanation}
        </p>

        {confidenceText && (
          <p className="mt-4 font-semibold text-blue-700">
            {confidenceText}
          </p>
        )}

      </div>


      {/* Recommendation */}
      <div className="mt-6">

        <h3 className="font-bold text-lg mb-2">
          Recommendation
        </h3>

        <p className="text-gray-600 leading-7">
          {recommendation}
        </p>

      </div>


      {/* Explainable AI */}
      <div className="mt-6">

        <h3 className="font-bold text-lg mb-2">
          Explainable AI (Grad-CAM)
        </h3>

        <p className="text-gray-600 leading-7">
          The highlighted regions in the Grad-CAM heatmap indicate
          areas that had greater influence on the DenseNet121 model's
          prediction. These visualizations help make the model's
          decision more interpretable.
        </p>

      </div>


      {/* Disclaimer */}
      {prediction && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">

          <div className="flex gap-3">

            <FaInfoCircle className="text-yellow-600 mt-1" />

            <p className="text-sm text-yellow-800 leading-6">
              LungAI provides an AI-assisted analysis for research
              and screening purposes. It is not a substitute for
              professional medical diagnosis or treatment.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}

export default AIExplanation;
import { FaBrain } from "react-icons/fa";

function AIExplanation({ prediction }) {

  let explanation = "";
  let recommendation = "";

  if (!prediction) {
    explanation =
      "Upload an X-ray image to receive an AI-generated explanation.";
  } else {
    switch (prediction.prediction) {

      case "COVID":
        explanation =
          "The AI model detected imaging patterns consistent with COVID-19. Ground-glass opacities and bilateral lung involvement may have contributed to this prediction.";

        recommendation =
          "Clinical evaluation and RT-PCR confirmation are recommended. Please consult a healthcare professional.";
        break;

      case "Pneumonia":
        explanation =
          "The AI model detected lung infiltrates and consolidation patterns commonly associated with Pneumonia.";

        recommendation =
          "Further clinical evaluation is recommended. Treatment may include antibiotics as advised by a physician.";
        break;

      case "Tuberculosis":
        explanation =
          "The AI model identified abnormalities in the upper lung region that are commonly associated with Tuberculosis.";

        recommendation =
          "Immediate consultation with a pulmonologist is recommended for further diagnosis and treatment.";
        break;

      case "Normal":
        explanation =
          "No significant abnormalities were detected in the chest X-ray. The lungs appear normal.";

        recommendation =
          "Continue routine health monitoring and consult a doctor if symptoms persist.";
        break;

      default:
        explanation = "AI explanation is unavailable.";
        recommendation = "";
    }
  }

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
          {explanation}
        </p>

      </div>

      <div className="mt-6">

        <h3 className="font-bold text-lg mb-2">
          Recommendation
        </h3>

        <p className="text-gray-600">
          {recommendation}
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
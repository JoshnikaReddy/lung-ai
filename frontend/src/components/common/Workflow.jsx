import {
  FaUpload,
  FaBrain,
  FaSearch,
  FaFilePdf,
} from "react-icons/fa";

function Workflow() {
  const steps = [
    {
      icon: <FaUpload className="text-5xl text-blue-600" />,
      title: "Upload X-ray",
      description: "Upload a chest X-ray image securely."
    },
    {
      icon: <FaBrain className="text-5xl text-blue-600" />,
      title: "AI Analysis",
      description: "DenseNet121 analyzes the uploaded image."
    },
    {
      icon: <FaSearch className="text-5xl text-blue-600" />,
      title: "Grad-CAM",
      description: "Visualize the affected region with Explainable AI."
    },
    {
      icon: <FaFilePdf className="text-5xl text-blue-600" />,
      title: "Download Report",
      description: "Get the prediction with confidence scores."
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center">
          How It Works
        </h2>

        <p className="text-center text-gray-600 mt-4">
          Just four simple steps to receive an AI-powered diagnosis.
        </p>

        <div className="grid md:grid-cols-4 gap-8 mt-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
            >
              <div className="flex justify-center">
                {step.icon}
              </div>

              <h3 className="text-2xl font-bold mt-6">
                {step.title}
              </h3>

              <p className="text-gray-600 mt-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Workflow;
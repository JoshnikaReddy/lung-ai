import {
  FaBrain,
  FaSearch,
  FaHeartbeat,
  FaBolt,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaBrain className="text-5xl text-blue-600" />,
      title: "DenseNet121",
      description: "Deep learning model for accurate chest X-ray analysis."
    },
    {
      icon: <FaSearch className="text-5xl text-blue-600" />,
      title: "Explainable AI",
      description: "Grad-CAM visualizes the infected region for transparent predictions."
    },
    {
      icon: <FaHeartbeat className="text-5xl text-blue-600" />,
      title: "4 Disease Detection",
      description: "COVID-19, Pneumonia, Tuberculosis and Normal."
    },
    {
      icon: <FaBolt className="text-5xl text-blue-600" />,
      title: "Fast Prediction",
      description: "Receive AI predictions in just a few seconds."
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center">
          Why Choose LungAI?
        </h2>

        <p className="text-center text-gray-600 mt-4">
          Powerful AI technology designed for fast and explainable diagnosis.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition duration-300 text-center"
            >
              <div className="flex justify-center">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mt-6">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-4">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;
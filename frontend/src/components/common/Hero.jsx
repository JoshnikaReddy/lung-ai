import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Left Side */}

          <div>
            <p className="text-blue-600 font-semibold uppercase tracking-wider">
              AI Powered Healthcare
            </p>

            <h1 className="text-6xl font-bold mt-4 leading-tight">
              Detect Lung Diseases with
              <span className="text-blue-600"> Explainable AI</span>
            </h1>

            <p className="text-gray-600 text-lg mt-6 leading-8">
              Upload a chest X-ray and receive an instant AI-powered prediction
              with Grad-CAM visualization for transparent and trustworthy diagnosis.
            </p>

            <div className="flex gap-5 mt-10">
              <Link
                to="/upload"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition"
              >
                Analyze X-ray
              </Link>

              <Link
                to="/about"
                className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Side */}

          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=700"
              alt="Medical AI"
              className="rounded-3xl shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
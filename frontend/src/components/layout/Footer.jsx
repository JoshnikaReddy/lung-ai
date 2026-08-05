function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-3xl font-bold text-blue-400">
            LungAI
          </h2>

          <p className="text-gray-300 mt-4">
            AI-powered lung disease detection using DenseNet121 and
            Explainable AI for transparent medical diagnosis.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Quick Links
          </h3>

          <ul className="mt-4 space-y-2 text-gray-300">
            <li>Home</li>
            <li>About</li>
            <li>Dashboard</li>
            <li>Login</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Supported Diseases
          </h3>

          <ul className="mt-4 space-y-2 text-gray-300">
            <li>COVID-19</li>
            <li>Pneumonia</li>
            <li>Tuberculosis</li>
            <li>Normal</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
       © 2026 LungAI - AI Powered Healthcare.
      </div>
    </footer>
  );
}

export default Footer;
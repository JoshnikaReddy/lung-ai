import {
  FaFilePdf,
  FaDownload,
  FaImage,
  FaRedoAlt,
} from "react-icons/fa";

function ReportCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Reports & Downloads
      </h2>

      <div className="space-y-4">

        <button className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition">
          <FaFilePdf />
          Download PDF Report
        </button>

        <button className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition">
          <FaImage />
          Download Grad-CAM
        </button>

        <button className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition">
          <FaDownload />
          Download Original X-ray
        </button>

        <button className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition">
          <FaRedoAlt />
          Analyze Another X-ray
        </button>

      </div>

    </div>
  );
}

export default ReportCard;
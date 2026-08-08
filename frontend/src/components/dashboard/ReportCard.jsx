import {
  FaFilePdf,
  FaDownload,
  FaImage,
  FaRedoAlt,
} from "react-icons/fa";

function ReportCard({ prediction }) {

  // Build backend URL
  const getFileUrl = (path) => {
    if (!path) {
      return null;
    }

    const normalizedPath = path.replaceAll("\\", "/");

    if (
      normalizedPath.startsWith("http://") ||
      normalizedPath.startsWith("https://")
    ) {
      return normalizedPath;
    }

    return `http://127.0.0.1:8000/${normalizedPath}`;
  };


  // Download PDF
  const downloadPDF = () => {
    if (!prediction?.report) {
      alert("Please analyze an X-ray first.");
      return;
    }

    const url = getFileUrl(prediction.report);

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };


  // Download Grad-CAM
  const downloadHeatmap = () => {
    if (!prediction?.heatmap) {
      alert("Please analyze an X-ray first.");
      return;
    }

    const url = getFileUrl(prediction.heatmap);

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };


  // Download original X-ray
  const downloadOriginal = () => {
    if (!prediction?.image) {
      alert("Please analyze an X-ray first.");
      return;
    }

    const url = getFileUrl(prediction.image);

    const link = document.createElement("a");

    link.href = url;
    link.download = "LungAI_Original_Xray.png";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };


  // Analyze another X-ray
  const analyzeAnother = () => {
    window.location.reload();
  };


  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">

      <h2 className="text-2xl font-bold mb-6">
        Reports & Downloads
      </h2>

      <div className="space-y-4">

        {/* PDF */}
        <button
          onClick={downloadPDF}
          disabled={!prediction?.report}
          className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-xl transition"
        >
          <FaFilePdf />
          Download PDF Report
        </button>


        {/* Grad-CAM */}
        <button
          onClick={downloadHeatmap}
          disabled={!prediction?.heatmap}
          className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-xl transition"
        >
          <FaImage />
          Download Grad-CAM
        </button>


        {/* Original X-ray */}
        <button
          onClick={downloadOriginal}
          disabled={!prediction?.image}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-xl transition"
        >
          <FaDownload />
          Download Original X-ray
        </button>


        {/* Analyze Another */}
        <button
          onClick={analyzeAnother}
          className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
        >
          <FaRedoAlt />
          Analyze Another X-ray
        </button>

      </div>

    </div>
  );
}

export default ReportCard;
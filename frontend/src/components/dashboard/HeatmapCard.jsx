import { FaFire } from "react-icons/fa";

function HeatmapCard({ prediction }) {

  // Build backend URL
  const getHeatmapUrl = (path) => {
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

  const heatmapUrl = prediction?.heatmap
    ? getHeatmapUrl(prediction.heatmap)
    : null;


  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">

      <h2 className="text-2xl font-bold mb-6">
        Grad-CAM Heatmap
      </h2>


      <div className="border-2 border-dashed border-gray-300 rounded-xl h-80 flex items-center justify-center">

        {heatmapUrl ? (

          <img
            src={heatmapUrl}
            alt="Grad-CAM Heatmap"
            className="h-full w-full object-contain rounded-xl"
          />

        ) : (

          <div className="flex flex-col items-center">

            <FaFire
              size={60}
              className="text-orange-500 mb-4"
            />

            <p className="text-xl font-semibold">
              Heatmap will appear here
            </p>

            <p className="text-gray-500 mt-2">
              Generated after AI prediction
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default HeatmapCard;
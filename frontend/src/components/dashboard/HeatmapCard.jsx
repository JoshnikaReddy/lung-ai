import { FaFire } from "react-icons/fa";

function HeatmapCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Grad-CAM Heatmap
      </h2>

      <div className="border-2 border-dashed border-gray-300 rounded-xl h-80 flex flex-col items-center justify-center">

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

    </div>
  );
}

export default HeatmapCard;
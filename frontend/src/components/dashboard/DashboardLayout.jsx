import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import UploadCard from "./UploadCard";
import PredictionCard from "./PredictionCard";
import ProbabilityChart from "./ProbabilityChart";
import HeatmapCard from "./HeatmapCard";
import AIExplanation from "./AIExplanation";
import ReportCard from "./ReportCard";

function DashboardLayout() {
  // Store AI prediction
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Topbar */}
        <Topbar />

        {/* Dashboard Content */}
        <main className="p-8">

          {/* Row 1 */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <UploadCard setPrediction={setPrediction} />
            <PredictionCard prediction={prediction} />
          </div>

          {/* Row 2 */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
           <ProbabilityChart prediction={prediction} />
            <HeatmapCard prediction={prediction} />
          </div>

          {/* Row 3 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <AIExplanation prediction={prediction} />
            <ReportCard />
          </div>

        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
import { CarbonScoreVisualization } from "../../components/CarbonScoreVisualization";
import { RecommendationsPanel } from "../../components/RecommendationsPanel";
import { SimulationResults } from "../../components/SimulationResults";

export default function DashboardPage() {
  return (
    <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pt-4">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-2">Platform Overview</h1>
        <p className="text-zinc-400 text-lg font-light">Your environmental model is successfully synchronized with live IoT feeds.</p>
      </header>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <CarbonScoreVisualization />
          <SimulationResults />
        </div>
        
        <div>
          <RecommendationsPanel />
        </div>
      </div>
    </div>
  );
}

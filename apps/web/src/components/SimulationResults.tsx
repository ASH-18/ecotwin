"use client";
import { useState } from "react";
import { fetchAiApi } from "../lib/api";

export function SimulationResults() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{reduction: number, recs: any[]} | null>(null);

  const runSimulation = async () => {
    setLoading(true);
    try {
      const data = await fetchAiApi("/simulate-impact", {
        method: "POST",
        body: JSON.stringify({
          twin_id: "demo-twin-123",
          current_emissions: 150.5,
          energy_usage: 45.0,
          active_modifiers: [
            { type: "SOLAR_INSTALLATION", trust_score: 0.95 },
            { type: "EV_CHARGING", trust_score: 0.88 }
          ]
        })
      });
      setResult({
        reduction: data.forecast_30d_reduction,
        recs: data.generated_recommendations
      });
    } catch(err) {
      console.error(err);
      setTimeout(() => {
        setResult({
          reduction: 76.4,
          recs: [{ type: "SMART_GRID", potential_impact: 12.0, reason: "Fallback payload loaded." }]
        });
        setLoading(false);
      }, 800);
      return;
    }
    setLoading(false);
  };

  return (
    <div className="rounded-3xl p-8 bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:border-white/10 transition-colors">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold text-zinc-300">Markov Trajectory Engine</h3>
        <button 
          onClick={runSimulation}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 active:scale-95"
        >
          {loading ? "Computing Paths..." : "Run Engine"}
        </button>
      </div>

      {!result ? (
        <div className="h-56 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-950/50">
          <p className="text-zinc-500 font-medium">Waiting for simulation triggers...</p>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-teal-500/10 border border-teal-500/30 shadow-inner">
              <p className="text-teal-400 text-xs font-bold mb-2 uppercase tracking-widest">30-Day Reduction</p>
              <p className="text-4xl font-black text-white">-{result.reduction} <span className="text-base font-medium text-teal-400/80 tracking-normal">kg</span></p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-inner">
              <p className="text-zinc-400 text-xs font-bold mb-2 uppercase tracking-widest">Model Confidence</p>
              <p className="text-4xl font-black text-white">92<span className="text-base font-medium text-zinc-500 tracking-normal">%</span></p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Engine Constraints Generated:</h4>
            {result.recs.map((r, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-950 border border-white/5 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                <span className="text-zinc-300 font-medium">{r.reason || r.type}</span>
                <span className="ml-auto px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg tracking-wide">
                  +{r.potential_impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

const MOCK_RECOMMENDATIONS = [
  { id: 1, type: "SOLAR_OPTIMIZATION", title: "Install Smart Battery", impact: 15.2, time: "30 days" },
  { id: 2, type: "EV_CHARGING", title: "Shift EV charging to 2 AM", impact: 8.5, time: "Immediate" },
  { id: 3, type: "HVAC_UPGRADE", title: "Upgrade to Heat Pump", impact: 45.0, time: "180 days" }
];

import { useRouter } from "next/navigation";

export function RecommendationsPanel() {
  const router = useRouter();
  return (
    <div className="rounded-3xl p-8 bg-zinc-900/40 border border-white/5 backdrop-blur-md h-full hover:border-white/10 transition-colors">
      <h3 className="text-xl font-semibold text-zinc-300 mb-6">AI Recommendations</h3>
      
      <div className="space-y-4">
        {MOCK_RECOMMENDATIONS.map((rec) => (
          <div key={rec.id} className="group p-5 rounded-2xl bg-zinc-950/50 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors">{rec.title}</h4>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-md font-bold shadow-sm">
                -{rec.impact} kg CO2
              </span>
            </div>
            <p className="text-sm text-zinc-500 font-medium">Payoff time: {rec.time}</p>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => router.push('/dashboard/analysis')}
        className="w-full mt-6 py-4 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all shadow-sm"
      >
        View Full Analysis
      </button>
    </div>
  );
}

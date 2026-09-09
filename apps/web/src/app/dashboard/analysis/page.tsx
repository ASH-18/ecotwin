"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AnalysisPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("energy");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pt-4 space-y-8">
      <div className="flex items-center gap-4 mb-10">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-zinc-400 hover:text-emerald-400 transition-all font-bold"
        >
          &larr;
        </button>
        <header>
          <h1 className="text-4xl font-extrabold text-white mb-2">Full AI Analysis</h1>
          <p className="text-zinc-400 text-lg font-light">Comprehensive breakdown of predictive energy trajectories.</p>
        </header>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
        <div className="flex gap-4 border-b border-white/5 pb-4 mb-8">
          <button 
            onClick={() => setActiveTab("energy")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === 'energy' ? 'bg-emerald-500/20 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Energy Utilization
          </button>
          <button 
            onClick={() => setActiveTab("cost")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === 'cost' ? 'bg-emerald-500/20 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Financial Impact
          </button>
          <button 
            onClick={() => setActiveTab("carbon")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === 'carbon' ? 'bg-emerald-500/20 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Carbon Footprint
          </button>
        </div>

        {activeTab === "energy" && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold text-white">Smart Battery Optimization Insights</h3>
            <p className="text-zinc-400">By shifting peak load dependencies using energy buffering, the modeled plant can cut grid reliance by 15.2% during high-tariff periods. The predictive AI identifies the optimal charge window at 2:00 AM to 5:00 AM.</p>
            
            <div className="h-48 border border-white/5 bg-zinc-950/50 rounded-xl flex items-end justify-between p-6 overflow-hidden relative">
                <div className="w-12 bg-emerald-500/80 rounded-t-sm h-[40%]" />
                <div className="w-12 bg-emerald-500/60 rounded-t-sm h-[60%]" />
                <div className="w-12 bg-emerald-500/40 rounded-t-sm h-[80%]" />
                <div className="w-12 bg-emerald-500/20 rounded-t-sm h-[30%]" />
                <div className="w-12 bg-teal-500/60 rounded-t-sm h-[50%]" />
                <div className="w-12 bg-teal-500/80 rounded-t-sm h-[70%]" />
                <div className="absolute inset-x-0 bottom-6 h-px bg-white/10" />
            </div>
          </div>
        )}
        
        {activeTab === "cost" && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold text-white">Financial Impact Forecast</h3>
            <p className="text-zinc-400">Our simulation suggests that peak load management and smart HVAC optimizations will result in a 24% reduction in overall utility costs over the next fiscal quarter.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-400 font-bold mb-1 uppercase text-xs tracking-widest">Projected Savings</p>
                <p className="text-4xl font-black text-white">$45,200</p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-950/50 border border-white/5">
                <p className="text-zinc-400 font-bold mb-1 uppercase text-xs tracking-widest">ROI Estimate</p>
                <p className="text-4xl font-black text-white">8.4<span className="text-lg text-zinc-500">%</span></p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "carbon" && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-xl font-bold text-white">Carbon Footprint Trajectory</h3>
            <p className="text-zinc-400">By shifting dependence to localized solar energy and implementing AI-validated cooling routes, we expect substantial drops in Scope 2 emissions.</p>
            
            <div className="h-48 border border-white/5 bg-zinc-950/50 rounded-xl flex flex-col justify-end p-6 overflow-hidden relative">
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-teal-500" />
                <span className="text-teal-400 text-sm font-semibold">Projected Emissions (Metric Tons)</span>
              </div>
              
              <div className="flex items-end justify-between w-full h-[60%] z-10 relative">
                <div className="w-16 bg-teal-500/80 rounded-t-lg h-full flex items-center justify-center text-xs font-bold text-teal-950">Q1</div>
                <div className="w-16 bg-teal-500/70 rounded-t-lg h-[80%] flex items-center justify-center text-xs font-bold text-teal-950">Q2</div>
                <div className="w-16 bg-teal-500/50 rounded-t-lg h-[50%] flex items-center justify-center text-xs font-bold text-teal-950">Q3</div>
                <div className="w-16 bg-teal-500/30 rounded-t-lg h-[30%] flex items-center justify-center text-xs font-bold text-teal-300">Q4</div>
              </div>
              
              <div className="absolute inset-x-0 bottom-6 h-px bg-white/10" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

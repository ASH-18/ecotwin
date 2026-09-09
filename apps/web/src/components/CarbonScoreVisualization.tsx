"use client";
import { useEffect, useState } from "react";

export function CarbonScoreVisualization() {
  const [score, setScore] = useState(85.5);

  useEffect(() => {
    // Open Server-Sent Events (SSE) connection to NestJS
    const eventSource = new EventSource("http://localhost:3001/events/realtime-score");

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload && payload.scoreDelta !== undefined) {
          setScore((prev) => prev + payload.scoreDelta);
        }
      } catch (error) {
        console.error("Failed parsing SSE payload", error);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE stream error", err);
    };

    return () => eventSource.close();
  }, []);

  const percentage = Math.min(100, Math.max(0, score));

  return (
    <div className="rounded-3xl p-8 bg-zinc-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-white/10 transition-colors">
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] transition-transform duration-1000 group-hover:scale-150" />
      
      <h3 className="text-xl font-semibold text-zinc-300 mb-8 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Live Twin Metric
      </h3>
      
      <div className="flex items-end gap-3 mb-6">
        <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 via-emerald-500 to-teal-600">
          {score.toFixed(1)}
        </span>
        <span className="text-2xl text-zinc-500 mb-2 font-medium tracking-wide">pts</span>
      </div>
      
      <div className="w-full h-4 bg-zinc-950 rounded-full overflow-hidden mt-8 shadow-inner border border-white/5 relative">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%`, backgroundSize: '200% auto', animation: 'gradient 3s linear infinite' }} 
        />
      </div>
      
      <div className="flex justify-between mt-4 text-sm text-zinc-500 font-semibold tracking-wider uppercase">
        <span>Critical</span>
        <span className="text-emerald-500/70">Optimal Zero</span>
      </div>
    </div>
  );
}

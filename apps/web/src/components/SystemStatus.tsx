"use client";
import { useEffect, useState } from "react";
import { checkSystemHealth } from "../lib/api";

export function SystemStatus() {
  const [status, setStatus] = useState("checking");
  
  useEffect(() => {
    checkSystemHealth().then(res => setStatus(res.status));
    const interval = setInterval(() => checkSystemHealth().then(res => setStatus(res.status)), 15000);
    return () => clearInterval(interval);
  }, []);

  const isOk = status === "ok";
  const isErr = status === "error" || status === "degraded";

  return (
    <div className="mb-6 px-4 py-3 rounded-xl bg-zinc-950/50 border border-white/5 flex items-center justify-between">
      <span className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">Services</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isOk ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]' : isErr ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-yellow-500'}`} />
        <span className={`text-xs font-bold ${isOk ? 'text-emerald-400' : isErr ? 'text-red-400' : 'text-yellow-400'}`}>
          {isOk ? 'Connected' : isErr ? 'Degraded' : 'Booting...'}
        </span>
      </div>
    </div>
  );
}

import { ReactNode } from "react";

export default function AILedgerPage() {
  const actions = [
    { id: "ACT-001", action: "Cooling system optimized", ai_confidence: "99.4%", timestamp: "2 mins ago", hash: "0x8f3...1a4" },
    { id: "ACT-002", action: "Power route bypassed", ai_confidence: "95.1%", timestamp: "15 mins ago", hash: "0x3b1...9c2" },
    { id: "ACT-003", action: "HVAC settings adjusted", ai_confidence: "98.2%", timestamp: "1 hour ago", hash: "0x7a6...4f9" },
    { id: "ACT-004", action: "Lighting dimmed in Sector C", ai_confidence: "99.9%", timestamp: "3 hours ago", hash: "0x2d8...8b1" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pt-4 space-y-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-2">AI Action Ledger</h1>
        <p className="text-zinc-400 text-lg font-light">Immutable record of autonomous system interventions.</p>
      </header>

      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
        <div className="space-y-4">
          {actions.map((act, index) => (
            <div key={act.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 transition-colors gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400 font-bold">
                  #{index + 1}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{act.action}</h4>
                  <p className="text-sm text-zinc-500">ID: {act.id} &bull; {act.timestamp}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-zinc-800/50 px-4 py-2 rounded-lg border border-white/5">
                  <span className="text-zinc-500 block text-xs">Confidence</span>
                  <span className="text-emerald-400 font-bold">{act.ai_confidence}</span>
                </div>
                <div className="bg-zinc-800/50 px-4 py-2 rounded-lg border border-white/5">
                  <span className="text-zinc-500 block text-xs">Tx Hash</span>
                  <span className="text-zinc-300 font-mono">{act.hash}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

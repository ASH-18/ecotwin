"use client";

import { useState } from "react";

export default function ConfigurationsPage() {
  const [autoSimulate, setAutoSimulate] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pt-4 space-y-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-2">Configurations</h1>
        <p className="text-zinc-400 text-lg font-light">Fine-tune global platform settings and AI behavior.</p>
      </header>

      <div className="max-w-2xl bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl space-y-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Simulation Settings</h3>
          <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-white/5">
            <div>
              <p className="font-semibold text-white">Continuous Simulation</p>
              <p className="text-sm text-zinc-500">Allow the AI to run background predictions continuously.</p>
            </div>
            <button 
              onClick={() => setAutoSimulate(!autoSimulate)}
              className={`w-14 h-8 rounded-full p-1 transition-colors ${autoSimulate ? 'bg-emerald-500' : 'bg-zinc-700'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${autoSimulate ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">Notifications</h3>
          <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-white/5">
            <div>
              <p className="font-semibold text-white">Critical Alerts Push</p>
              <p className="text-sm text-zinc-500">Send push notifications when anomalous carbon spikes occur.</p>
            </div>
            <button 
              onClick={() => setPushNotifs(!pushNotifs)}
              className={`w-14 h-8 rounded-full p-1 transition-colors ${pushNotifs ? 'bg-emerald-500' : 'bg-zinc-700'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${pushNotifs ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

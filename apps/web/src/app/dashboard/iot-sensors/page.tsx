import { ReactNode } from "react";

export default function IoTSensorsPage() {
  const sensors = [
    { id: "SENS-01", type: "Air Quality", status: "Active", value: "98% Purity", loc: "Sector A" },
    { id: "SENS-02", type: "Temperature", status: "Active", value: "24°C", loc: "Sector B" },
    { id: "SENS-03", type: "Humidity", status: "Warning", value: "65%", loc: "Sector A" },
    { id: "SENS-04", type: "Power Draw", status: "Active", value: "1.2 MW", loc: "Main Plant" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pt-4 space-y-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-2">IoT Sensors</h1>
        <p className="text-zinc-400 text-lg font-light">Real-time telemetry and hardware status monitoring.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sensors.map(sensor => (
          <div key={sensor.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-transform hover:scale-105">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs border border-emerald-500/30">
                {sensor.id.split("-")[1]}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full border ${sensor.status === 'Active' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'}`}>
                {sensor.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{sensor.type}</h3>
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">{sensor.value}</p>
            <p className="text-sm text-zinc-500">Location: {sensor.loc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

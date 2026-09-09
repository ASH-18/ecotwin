import { SystemStatus } from "../../components/SystemStatus";
import { SidebarNav } from "../../components/SidebarNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <aside className="w-64 border-r border-white/5 bg-zinc-900/20 backdrop-blur-xl hidden md:flex flex-col p-6 shadow-2xl z-20">
        <h2 className="text-2xl font-black mb-12 tracking-tight">EcoTwin<span className="text-emerald-500">-X</span></h2>
        
        <SidebarNav />
        
        <div className="mt-auto pt-6 border-t border-white/5">
          <SystemStatus />
          
          <div className="flex items-center gap-3 mb-2 px-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 group-hover:border-emerald-500 transition-colors" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-zinc-200 truncate">Platform Administrator</p>
              <p className="text-xs text-zinc-500 truncate">admin@ecotwinx.com</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-x-hidden overflow-y-auto relative">
        <div className="absolute top-0 right-0 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        {children}
      </main>
    </div>
  );
}

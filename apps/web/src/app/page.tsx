import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      
      <div className="z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-100 to-zinc-500 drop-shadow-sm">
          EcoTwin<span className="text-emerald-500 inline-block hover:scale-110 transition-transform cursor-default">-X</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-400 mb-14 font-light leading-relaxed tracking-wide">
          The next-generation AI-driven Digital Twin Platform for <br className="hidden md:block"/> environmental behavior simulation.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/login" className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 text-lg font-bold rounded-full transition-all transform hover:scale-[1.03] shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]">
            Access Dashboard
          </Link>
          <a href="#" className="px-10 py-5 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 border border-white/10 text-lg font-medium rounded-full transition-all backdrop-blur-md">
            Read Documentation
          </a>
        </div>
      </div>
    </main>
  );
}

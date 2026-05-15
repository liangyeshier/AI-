export default function ActiveModulesPanel() {
  const modules = [
    { name: 'Core Matrix', status: '在线', color: 'text-[#d4af37]' },
    { name: 'Quantum Drive', status: '在线', color: 'text-[#d4af37]' },
    { name: 'Defense Grid', status: '待机', color: 'text-red-400' },
    { name: 'Comms Array', status: '在线', color: 'text-[#d4af37]' }
  ];

  return (
    <div className="border border-[#d4af37]/30 bg-neutral-900/40 rounded-[20px] p-6 relative backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="absolute top-6 right-6 flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37] shadow-[0_0_8px_#d4af37]"></span>
      </div>
      <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#d4af37] mb-6 drop-shadow-[0_0_2px_rgba(212,175,55,0.8)]">活跃模块</h3>
      <div className="space-y-3">
        {modules.map((m, i) => (
          <div key={i} className="flex justify-between items-center bg-black/40 px-4 py-3 border border-neutral-800/60 rounded-xl hover:border-neutral-600 transition-colors">
            <span className="text-xs tracking-wide text-white/80">{m.name}</span>
            <span className={`text-[10px] font-mono tracking-wider ${m.color}`}>
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

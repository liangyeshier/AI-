export default function SectorCard({ label, val, unit, p, col }: any) {
  return (
    <div className="border border-neutral-800/80 bg-neutral-900/50 p-5 rounded-xl flex flex-col gap-3 group hover:border-[#d4af37]/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:-translate-y-1">
      <span className="text-[10px] text-white/50 tracking-[0.2em] group-hover:text-[#d4af37] transition-colors">{label}</span>
      <div className="text-4xl font-mono text-white/90 group-hover:text-white">
        {val}<span className="text-lg text-[#d4af37] ml-1">{unit}</span>
      </div>
      <div className="w-full h-1 bg-neutral-800 mt-2 overflow-hidden rounded-full shadow-inner">
        <div className={`h-full opacity-80 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${col}`} style={{width: p}}></div>
      </div>
    </div>
  );
}

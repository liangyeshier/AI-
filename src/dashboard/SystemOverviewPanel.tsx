import SectorCard from './SectorCard';

export default function SystemOverviewPanel() {
  const sectors = [
    { id: 1, label: '扇区 01', val: '1.04', unit: 'T', p: '65%', col: 'from-[#d4af37] to-yellow-200' },
    { id: 2, label: '扇区 02', val: '0.88', unit: 'P', p: '40%', col: 'from-white to-[#d4af37]' },
    { id: 3, label: '扇区 03', val: '3.14', unit: 'E', p: '82%', col: 'from-green-400 to-[#d4af37]' }
  ];

  return (
    <div className="border border-neutral-800 bg-[#000000]/40 backdrop-blur-md p-8 rounded-[20px] relative overflow-hidden ring-1 ring-white/5 shadow-2xl">
      <div className="flex items-center gap-6 mb-2">
        <h1 className="text-3xl font-light tracking-wide text-white drop-shadow-md shrink-0">
          系统 <span className="font-bold text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">概览</span>
        </h1>
        <div className="flex-1 h-[2px] bg-gradient-to-r from-[#d4af37]/50 via-[#d4af37]/10 to-transparent"></div>
      </div>
      <div className="text-left mb-6">
        <p className="text-neutral-400 text-xs font-mono tracking-tight">主节点运行正常，网络同步率 <span className="text-green-400">99.8%</span>。</p>
      </div>
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {sectors.map(s => <SectorCard key={s.id} {...s} />)}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';

export default function DiagnosticsPanel() {
  const [metrics, setMetrics] = useState([
    { id: 'cpu', lbl: 'CPU 负载', val: 12, c: 'bg-green-400' },
    { id: 'mem', lbl: '内存占用', val: 84, c: 'bg-[#d4af37]' },
    { id: 'net', lbl: '网络上行', val: 45, c: 'bg-white' }
  ]);

  useEffect(() => {
    const int = setInterval(() => {
       setMetrics(prev => prev.map(m => {
         // Add some random jitter
         let change = Math.floor(Math.random() * 7) - 3;
         let newVal = Math.max(0, Math.min(100, m.val + change));
         return { ...m, val: newVal };
       }));
    }, 2000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="border border-neutral-800 bg-neutral-900/40 rounded-[20px] p-6 relative overflow-hidden backdrop-blur-md shadow-xl flex-1 flex flex-col">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#d4af37] opacity-10 blur-[60px] rounded-full pointer-events-none"></div>
      <h3 className="text-[10px] font-bold tracking-[0.2em] text-white mb-6 drop-shadow-md">本地诊断</h3>
      <div className="flex flex-col gap-6">
        {metrics.map((m) => (
          <div key={m.id} className="group">
            <div className="flex justify-between text-[10px] font-mono tracking-widest text-neutral-400 mb-3 group-hover:text-neutral-200 transition-colors">
              <span>{m.lbl}</span>
              <span className={m.c === 'bg-[#d4af37]' ? 'text-[#d4af37]' : (m.c === 'bg-green-400' ? 'text-green-400' : 'text-white')}>{m.val}%</span>
            </div>
            <div className="h-[2px] bg-neutral-800 w-full rounded-full overflow-hidden">
              <div className={`h-full ${m.c} transition-all duration-1000 ease-out`} style={{width: `${m.val}%`}}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

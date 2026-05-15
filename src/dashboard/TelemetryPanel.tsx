import { Terminal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function TelemetryPanel() {
  const [logs, setLogs] = useState([
    { id: 1, type: 'SYS', msg: 'AETHER AGENTIC 核心阵列已就绪。', time: new Date().toLocaleTimeString() },
    { id: 2, type: 'NET', msg: '建立本地安全隧道...', time: new Date().toLocaleTimeString() }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const int = setInterval(() => {
      if (Math.random() > 0.6) {
         setLogs(prev => [...prev.slice(-15), { 
           id: Date.now(), 
           type: Math.random() > 0.5 ? 'SYS' : 'NET', 
           msg: `接收来自 Alpha 节点的校验数据... 节点状态：正常`, 
           time: new Date().toLocaleTimeString() 
         }]);
      }
    }, 2500);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="border border-neutral-800 bg-[#050505]/90 backdrop-blur-sm rounded-[20px] p-6 shadow-inner relative overflow-hidden flex-1 flex flex-col min-h-[250px]">
       <div className="flex items-center justify-between gap-3 mb-4 border-b border-neutral-800/50 pb-4 z-10 relative">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-[#d4af37]" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#d4af37]">实时遥测与日志</span>
          </div>
          <span className="text-[10px] text-neutral-600 font-mono animate-pulse">REC</span>
       </div>
       <div ref={scrollRef} className="font-mono text-[11px] md:text-xs text-neutral-400 relative z-10 flex-1 overflow-y-auto hidden-scrollbar flex flex-col gap-2">
          {logs.map(log => (
            <div key={log.id} className="flex gap-3 hover:bg-white/5 px-2 py-0.5 rounded transition-colors break-all">
              <span className="text-neutral-600 shrink-0">[{log.time}]</span>
              <span className={`font-bold shrink-0 ${log.type === 'SYS' ? 'text-[#d4af37]' : 'text-cyan-400'}`}>[{log.type}]</span>
              <span className="text-neutral-300">{log.msg}</span>
            </div>
          ))}
          <div className="animate-pulse opacity-70 px-2 mt-2 flex items-center">
            <span className="text-neutral-500 font-bold mr-2">[WAIT]</span> 等待系统日志_
          </div>
       </div>
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent)] opacity-40"></div>
    </div>
  );
}

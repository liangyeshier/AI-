import { ShieldAlert, X, Minus, Maximize2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TitleBar() {
  const [sysTime, setSysTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setSysTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMinimize = () => {
    if ((window as any).electronAPI) (window as any).electronAPI.minimize();
  };

  const handleMaximize = () => {
    if ((window as any).electronAPI) (window as any).electronAPI.maximize();
  };

  const handleClose = () => {
    if ((window as any).electronAPI) (window as any).electronAPI.close();
  };

  return (
    <div 
      className="h-10 border-b border-neutral-800 bg-[#121212] flex items-center justify-between px-4 select-none shrink-0"
      style={{ WebkitAppRegion: 'drag' } as any}
    >
      <div className="flex items-center gap-3">
        <ShieldAlert className="w-4 h-4 text-[#d4af37]" />
        <div className="flex items-start gap-1">
          <span className="text-xs font-bold tracking-[0.2em] text-neutral-300 translate-y-0.5">AETHER AGENTIC</span>
          <span className="bg-blue-600/20 border border-blue-500/50 text-[#d4af37] text-[8px] px-1 py-0.5 rounded uppercase tracking-wider font-mono shadow-[0_0_8px_rgba(59,130,246,0.3)]">AI集成平台</span>
        </div>
      </div>
      
      <div className="flex gap-4 items-center" style={{ WebkitAppRegion: 'no-drag' } as any}>
        <span className="font-mono text-xs text-[#d4af37]">{sysTime.toLocaleTimeString()}</span>
        <div className="flex gap-2 ml-2">
          <div 
            onClick={handleClose}
            className="w-3 h-3 rounded-full bg-neutral-700 hover:bg-red-500 transition-colors flex items-center justify-center overflow-hidden group cursor-pointer"
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100 text-neutral-950" />
          </div>
          <div 
            onClick={handleMinimize}
            className="w-3 h-3 rounded-full bg-neutral-700 hover:bg-yellow-500 transition-colors flex items-center justify-center overflow-hidden group cursor-pointer"
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 text-neutral-950" />
          </div>
          <div 
            onClick={handleMaximize}
            className="w-3 h-3 rounded-full bg-[#d4af37] hover:bg-yellow-300 shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center overflow-hidden group cursor-pointer"
          >
            <Maximize2 className="w-2 h-2 opacity-0 group-hover:opacity-100 text-neutral-950" />
          </div>
        </div>
      </div>
    </div>
  );
}

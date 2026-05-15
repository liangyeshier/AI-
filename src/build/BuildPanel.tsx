import { useEffect, useRef } from 'react';
import { Package, Monitor, Apple, Terminal, AlertCircle, Play, FolderOpen } from 'lucide-react';
import { useBuildStore } from './buildStore';
import { startPackaging, openBuildDirectory } from './buildUtils';
import '../styles/build.css';

export default function BuildPanel() {
  const { targetOS, setTargetOS, isBuilding, progress, statusText, logs } = useBuildStore();
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleStart = () => {
    startPackaging();
  };

  const isSuccess = !isBuilding && progress === 100 && statusText === '打包完成';
  const isFailed = !isBuilding && statusText.includes('失败');

  return (
    <div className="absolute inset-0 p-6 md:p-8 flex flex-col gap-6 overflow-hidden">
      <div className="flex flex-col gap-2 shrink-0">
        <h1 className="text-2xl font-light tracking-wide text-white drop-shadow-md">
          系统 <span className="font-bold text-[#d4af37]">打包发布</span>
        </h1>
        <p className="text-neutral-500 font-mono tracking-widest text-xs">V45.0-Quantum-Lock 部署核心模块</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[300px]">
        
        {/* 左侧：控制面板 */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6 bg-[#000000]/40 border border-neutral-800 rounded-[30px] p-6 backdrop-blur-md relative shadow-2xl overflow-y-auto hidden-scrollbar">
          <h2 className="text-[#d4af37] font-mono tracking-widest text-sm flex items-center gap-2">
            <Package className="w-4 h-4" /> 目标系统选择
          </h2>
          
          <div className="flex flex-col gap-4">
            <button 
              disabled={isBuilding}
              onClick={() => setTargetOS('mac')}
              className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${targetOS === 'mac' ? 'bg-[#d4af37]/10 border-[#d4af37] text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'border-neutral-800 bg-[#050505]/50 text-neutral-400 hover:text-white hover:border-neutral-600'} ${isBuilding ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Apple className="w-6 h-6" />
              <div className="text-left">
                <div className="text-sm tracking-wide">macOS (.dmg / .app)</div>
                <div className="text-[10px] font-mono tracking-widest opacity-60">Apple Silicon & Intel</div>
              </div>
            </button>

            <button 
              disabled={isBuilding}
              onClick={() => setTargetOS('win')}
              className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${targetOS === 'win' ? 'bg-[#d4af37]/10 border-[#d4af37] text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'border-neutral-800 bg-[#050505]/50 text-neutral-400 hover:text-white hover:border-neutral-600'} ${isBuilding ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Monitor className="w-6 h-6" />
              <div className="text-left">
                <div className="text-sm tracking-wide">Windows (.exe / .msi)</div>
                <div className="text-[10px] font-mono tracking-widest opacity-60">x64 Architecture</div>
              </div>
            </button>

            <button 
              disabled={isBuilding}
              onClick={() => setTargetOS('both')}
              className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${targetOS === 'both' ? 'bg-[#d4af37]/10 border-[#d4af37] text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'border-neutral-800 bg-[#050505]/50 text-neutral-400 hover:text-white hover:border-neutral-600'} ${isBuilding ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Package className="w-6 h-6" />
              <div className="text-left">
                <div className="text-sm tracking-wide">双系统目标架构</div>
                <div className="text-[10px] font-mono tracking-widest opacity-60">交叉编译 / 并行构建</div>
              </div>
            </button>
          </div>

          <div className="mt-auto pt-6 border-t border-neutral-800/80">
            {isSuccess ? (
              <button onClick={openBuildDirectory} className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/30 transition-all font-mono tracking-widest group shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <FolderOpen className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                打开应用目录
              </button>
            ) : isBuilding ? (
              <div className="w-full relative">
                <div className="flex justify-between text-xs font-mono text-[#d4af37] mb-2 px-1">
                  <span className="animate-pulse">{statusText}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-[#d4af37]/20">
                  <div className="h-full bg-gradient-to-r from-[#d4af37]/50 to-[#d4af37] transition-all duration-300 relative shadow-[0_0_10px_#d4af37]" style={{ width: `${progress}%` }}>
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite_linear]"></div>
                  </div>
                </div>
              </div>
            ) : (
             <button onClick={handleStart} className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-neutral-900 border border-neutral-700 text-white hover:border-[#d4af37] hover:text-[#d4af37] transition-all font-mono tracking-widest shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
               <Play className="w-4 h-4 fill-current" />
               {isFailed ? '重新打包' : '开始打包'}
             </button>
            )}
            
            {isFailed && (
              <div className="text-red-400 text-xs font-mono text-center mt-3 flex items-center justify-center gap-1">
                <AlertCircle className="w-3 h-3" />
                打包失败，请检查配置
              </div>
            )}
          </div>
        </div>

        {/* 右侧：终端日志 */}
        <div className="col-span-1 lg:col-span-8 flex flex-col bg-[#050505]/80 border border-neutral-800 rounded-[30px] overflow-hidden backdrop-blur-md shadow-2xl relative min-h-[300px]">
          <div className="flex items-center justify-between p-4 border-b border-neutral-800/80 bg-black/40">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs font-mono text-neutral-400 tracking-wider">终端日志</span>
            </div>
            <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
            </div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto build-scrollbar font-mono text-xs leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-neutral-600 h-full flex items-center justify-center tracking-widest relative z-10">
                等待构建指令输入...
              </div>
            ) : (
              <div className="flex flex-col gap-2 relative z-10 w-full min-h-full pb-4">
                {logs.map((log) => (
                  <div key={log.id} className="flex gap-4 build-anim-slide-up">
                    <span className="text-neutral-600 shrink-0">[{new Date(log.time).toLocaleTimeString()}]</span>
                    <span className={`break-words ${
                      log.type === 'error' ? 'text-red-400' :
                      log.type === 'success' ? 'text-green-400' :
                      log.type === 'warn' ? 'text-yellow-400' : 'text-neutral-300'
                    }`}>
                      {log.message}
                    </span>
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            )}
            
            {/* Background watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none z-0">
              <Terminal className="w-64 h-64 text-[#d4af37]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

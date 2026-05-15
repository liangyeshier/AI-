import { useModeStore } from '../features/modes/modeStore';
import { useStatusCenterStore } from '../dashboard/statusCenterStore';

export default function StatusBar() {
  const { activeMode } = useModeStore();
  const { nodeConnected } = useStatusCenterStore();

  let modeText = "默认模式";
  switch(activeMode) {
    case 'dashboard': modeText = "节点：Alpha-1 | 主控制台"; break;
    case 'api': modeText = "节点：Alpha-1 | 模型：自动路由"; break;
    case 'webview': modeText = "节点：Alpha-1 | 引擎：统一渲染"; break;
    default: modeText = `节点：Alpha-1 | 模块：${activeMode.toUpperCase()}`; break;
  }

  return (
    <div className="h-8 border-t border-neutral-800 bg-[#0a0a0a] flex items-center justify-between px-6 text-[10px] text-neutral-500 font-mono tracking-[0.2em] uppercase select-none z-10 shrink-0">
      <div className="flex items-center gap-4">
        <span>{modeText}</span>
        <span className="w-[1px] h-3 bg-neutral-700"></span>
        <span className={`${nodeConnected ? 'text-[#d4af37] drop-shadow-[0_0_4px_#d4af37]' : 'text-red-500 drop-shadow-[0_0_4px_rgba(239,68,68,1)]'} flex items-center gap-2`}>
          <span className={`w-1.5 h-1.5 rounded-full ${nodeConnected ? 'bg-[#d4af37] shadow-[0_0_5px_#d4af37]' : 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,1)]'}`}></span>
          {nodeConnected ? '已连接' : '未连接'}
        </span>
      </div>
      <span className="text-neutral-600 font-bold tracking-widest">版本 V45.0-Quantum-Lock</span>
    </div>
  );
}

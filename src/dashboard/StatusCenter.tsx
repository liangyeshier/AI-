import { useEffect } from 'react';
import StatusItem from './StatusItem';
import ActivityLog from './ActivityLog';
import { useStatusCenterStore } from './statusCenterStore';
import { Network, Cpu, Server, Key, Database } from 'lucide-react';
import '../styles/statusCenter.css';
import { useModeStore } from '../features/modes/modeStore';
import { useWebviewStore } from '../webview/webviewStore';
import { useApiChatStore } from '../features/api-chat/apiChatStore';
import { useSessionStore } from '../features/sessions/sessionStore';

export default function StatusCenter() {
  const { nodeConnected, activeModeText, currentService, apiCount, sessionCount, setActiveModeText, setCurrentService, setSessionCount, addActivity } = useStatusCenterStore();
  const { activeMode } = useModeStore();
  const { getActiveProvider } = useWebviewStore();
  const { currentModel } = useApiChatStore();
  const { sessions } = useSessionStore();

  // 监听当前模式并更新到状态中心
  useEffect(() => {
    switch(activeMode) {
      case 'dashboard': setActiveModeText("主控制台"); break;
      case 'api': setActiveModeText("大模型 API"); break;
      case 'webview': setActiveModeText("网页模式"); break;
      case 'build': setActiveModeText("打包发布"); break;
      default: setActiveModeText(activeMode.toUpperCase()); break;
    }
    addActivity(`已切换到模式: ${activeMode.toUpperCase()}`, 'info');
  }, [activeMode, setActiveModeText, addActivity]);

  // 同步外部状态到状态中心
  useEffect(() => {
    setSessionCount(sessions.length);
  }, [sessions, setSessionCount]);

  useEffect(() => {
    if (activeMode === 'webview') {
      const p = getActiveProvider();
      setCurrentService(p ? p.name : '未知网页');
    } else if (activeMode === 'api') {
      setCurrentService(`模型: ${currentModel}`);
    } else {
      setCurrentService('空闲');
    }
  }, [activeMode, getActiveProvider, currentModel, setCurrentService]);

  return (
    <div className="border border-neutral-800 bg-[#000000]/40 backdrop-blur-md p-8 rounded-[30px] relative overflow-hidden ring-1 ring-white/5 shadow-2xl flex flex-col gap-8 shrink-0">
      {/* 顶部线条与标题 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/50 via-transparent to-transparent -translate-y-8"></div>
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-light tracking-wide text-white drop-shadow-md shrink-0">
            状态 <span className="font-bold text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">中心</span>
          </h1>
          <div className="hidden sm:block flex-1 h-[2px] w-32 bg-gradient-to-r from-[#d4af37]/50 via-[#d4af37]/10 to-transparent"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        {/* 左侧：状态项块 */}
        <div className="col-span-1 md:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatusItem 
            label="节点状态" 
            icon={<Network className="w-4 h-4" />}
            value={
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${nodeConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'}`}></span>
                <span className={nodeConnected ? 'text-green-400 font-mono text-base' : 'text-red-400 font-mono text-base'}>
                  {nodeConnected ? '已连接' : '未连接'}
                </span>
              </div>
            }
          />
          <StatusItem 
            label="当前模式" 
            icon={<Cpu className="w-4 h-4" />}
            value={<span className="text-[#d4af37] drop-shadow-[0_0_5px_rgba(212,175,55,0.3)]">{activeModeText}</span>}
          />
          <StatusItem 
            label="当前服务" 
            icon={<Server className="w-4 h-4" />}
            value={<span className="line-clamp-1">{currentService}</span>}
          />
          <StatusItem 
            label="已配置 API" 
            icon={<Key className="w-4 h-4" />}
            value={<span className="font-mono">{apiCount} 个</span>}
          />
          <StatusItem 
            label="会话总数" 
            icon={<Database className="w-4 h-4" />}
            value={<span className="font-mono">{sessionCount} 个</span>}
          />
        </div>

        {/* 右侧：近期活动日志 */}
        <div className="col-span-1 md:col-span-4 h-64 md:h-auto">
          <ActivityLog />
        </div>
      </div>
    </div>
  );
}

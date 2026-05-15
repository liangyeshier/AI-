import { useModeStore } from '../features/modes/modeStore';
import DashboardPage from '../dashboard/DashboardPage';
import ApiModePage from '../features/modes/ApiModePage';
import WebviewModePage from '../features/modes/WebviewModePage';
import BuildPanel from '../build/BuildPanel';
import '../styles/modes.css';

export default function MainContent() {
  const { activeMode } = useModeStore();

  return (
    <div className="flex-1 relative bg-[radial-gradient(ellipse_at_top_right,_#1e1e1e,_#050505)] overflow-hidden">
       {activeMode === 'dashboard' && <div className="absolute inset-0 mode-fade-in"><DashboardPage /></div>}
       {activeMode === 'api' && <div className="absolute inset-0 mode-fade-in"><ApiModePage /></div>}
       {activeMode === 'webview' && <div className="absolute inset-0 mode-fade-in"><WebviewModePage /></div>}
       {activeMode === 'build' && <div className="absolute inset-0 mode-fade-in"><BuildPanel /></div>}
       
       {/* 离线模块占位 */}
       {activeMode !== 'dashboard' && activeMode !== 'api' && activeMode !== 'webview' && activeMode !== 'build' && (
         <div className="flex items-center justify-center h-full text-neutral-600 font-mono tracking-widest text-sm relative z-10 bg-black/40 backdrop-blur-sm mode-fade-in">
           模块 [ {activeMode.toUpperCase()} ] 离线
         </div>
       )}
    </div>
  );
}

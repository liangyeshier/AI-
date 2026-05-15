import { useStatusCenterStore } from './statusCenterStore';
import { Activity, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import '../styles/statusCenter.css';

export default function ActivityLog() {
  const { activities } = useStatusCenterStore();

  const getIcon = (type: string) => {
    switch(type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warn': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/40 border border-neutral-800 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 p-4 border-b border-neutral-800/80 bg-[#050505]/50">
        <Activity className="w-4 h-4 text-[#d4af37]" />
        <h3 className="text-xs font-mono font-bold text-neutral-300 tracking-wider">最近活动</h3>
      </div>
      <div className="flex-1 overflow-y-auto status-center-scrollbar p-4 space-y-3">
        {activities.length === 0 ? (
          <div className="text-neutral-600 text-xs font-mono text-center mt-4">暂无活动记录</div>
        ) : (
          activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-3 items-start activity-item-enter" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="mt-0.5 shrink-0 bg-neutral-900/50 p-1.5 rounded-lg border border-neutral-800">
                {getIcon(activity.type)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm text-neutral-300 break-words">{activity.message}</span>
                <span className="text-[10px] text-neutral-500 font-mono mt-1">
                  {new Date(activity.time).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

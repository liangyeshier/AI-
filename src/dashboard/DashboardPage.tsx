import StatusCenter from './StatusCenter';
import TelemetryPanel from './TelemetryPanel';
import ActiveModulesPanel from './ActiveModulesPanel';
import DiagnosticsPanel from './DiagnosticsPanel';

import PerformancePanel from './PerformancePanel';

export default function DashboardPage() {
  return (
    <div className="absolute inset-0 p-6 md:p-8 overflow-y-auto hidden-scrollbar flex flex-col gap-8">
      
      {/* 顶部：状态中心 */}
      <StatusCenter />

      {/* 底部网格：终端日志与右侧信息监控 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 flex-1 min-h-[350px]">
        
        {/* 主要工作区域：日志 / 终端 */}
        <div className="col-span-1 md:col-span-8 flex flex-col">
           <TelemetryPanel />
        </div>

        {/* 右侧面板监控：模块活跃、性能监控与诊断信息 */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-8">
          <PerformancePanel />
          <ActiveModulesPanel />
          <DiagnosticsPanel />
        </div>

      </div>
    </div>
  );
}

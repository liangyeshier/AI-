import { useState, useEffect } from 'react';
import PerformanceItem from './PerformanceItem';
import { Cpu, MemoryStick, Activity, Network } from 'lucide-react';
import '../styles/performancePanel.css';

export default function PerformancePanel() {
  const [cpuUsage, setCpuUsage] = useState(12);
  const [memUsage, setMemUsage] = useState(45);
  const [netUsage, setNetUsage] = useState(8);
  const [memLabel, setMemLabel] = useState('14.2/32GB');

  useEffect(() => {
    let isMounted = true;
    
    const fetchMetrics = async () => {
      if (window.electronAPI) {
        try {
          const metrics = await window.electronAPI.getSystemMetrics();
          if (isMounted) {
            setCpuUsage(metrics.cpuUsage);
            setMemUsage(metrics.memUsage);
            setMemLabel(`${metrics.usedMemStr}/${metrics.totalMemStr}`);
            setNetUsage(metrics.netUsage);
          }
        } catch (e) {
          console.error('Failed to fetch metrics', e);
        }
      } else {
        // Fallback simulated metrics for web preview
        if (isMounted) {
          setCpuUsage(prev => Math.min(100, Math.max(0, prev + (Math.random() * 10 - 5))));
          setMemUsage(prev => Math.min(100, Math.max(0, prev + (Math.random() * 4 - 2))));
          setNetUsage(prev => Math.min(100, Math.max(0, prev + (Math.random() * 20 - 10))));
        }
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 2000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-[#050505]/80 border border-neutral-800 rounded-[30px] p-6 backdrop-blur-md relative shadow-[0_0_30px_rgba(212,175,55,0.05)] hover:shadow-[0_0_40px_rgba(212,175,55,0.1)] transition-shadow duration-700 overflow-hidden performance-panel-anim animate-pulse-slow">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"></div>
      
      <div className="flex items-center gap-2 mb-6 border-b border-neutral-800/80 pb-4">
        <Activity className="w-5 h-5 text-[#d4af37]" />
        <h2 className="text-sm font-mono tracking-widest text-[#d4af37]">系统性能监控 (Performance)</h2>
      </div>

      <div className="flex flex-col gap-6">
        <PerformanceItem 
          label="CPU 占用" 
          value={`${cpuUsage.toFixed(1)}%`} 
          percent={Math.max(0, Math.min(100, cpuUsage))} 
          icon={<Cpu className="w-4 h-4 text-neutral-400" />} 
          colorClass="bg-blue-500"
        />
        
        <PerformanceItem 
          label="内存分配 (RAM)" 
          value={`${memUsage.toFixed(1)}% (${memLabel})`} 
          percent={Math.max(0, Math.min(100, memUsage))} 
          icon={<MemoryStick className="w-4 h-4 text-neutral-400" />} 
          colorClass="bg-[#d4af37]"
        />

        <PerformanceItem 
          label="I/O 吞吐率" 
          value={`${Math.max(0, netUsage * 1.5).toFixed(1)} MB/s`} 
          percent={Math.max(0, Math.min(100, netUsage))} 
          icon={<Network className="w-4 h-4 text-neutral-400" />} 
          colorClass="bg-green-500"
        />
      </div>
      
      {/* 装饰水印 */}
      <Cpu className="absolute -bottom-8 -right-8 w-40 h-40 text-white/5 pointer-events-none" />
    </div>
  );
}

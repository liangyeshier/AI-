import { ReactNode } from 'react';

interface PerformanceItemProps {
  label: string;
  value: string;
  percent: number;
  icon?: ReactNode;
  colorClass?: string;
}

export default function PerformanceItem({ label, value, percent, icon, colorClass = "bg-[#d4af37]" }: PerformanceItemProps) {
  return (
    <div className="flex flex-col gap-2 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-neutral-400 font-mono text-xs tracking-wider group-hover:text-white transition-colors">
          {icon}
          <span>{label}</span>
        </div>
        <span className="text-white font-mono text-xs">{value}</span>
      </div>
      <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden shadow-inner border border-white/5">
        <div 
          className={`h-full ${colorClass} transition-all duration-1000 ease-out shadow-[0_0_10px_currentColor]`}
          style={{ width: `${percent}%`, color: colorClass.includes('d4af37') ? '#d4af37' : colorClass.includes('blue') ? '#3b82f6' : '#22c55e' }}
        ></div>
      </div>
    </div>
  );
}

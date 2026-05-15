import { ReactNode } from 'react';

interface StatusItemProps {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
}

export default function StatusItem({ label, value, icon }: StatusItemProps) {
  return (
    <div className="flex flex-col gap-1 p-4 bg-black/40 border border-neutral-800 rounded-2xl hover:border-[#d4af37]/30 transition-colors group">
      <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs tracking-wider">
        {icon && <span className="text-neutral-400 group-hover:text-[#d4af37] transition-colors">{icon}</span>}
        <span>{label}</span>
      </div>
      <div className="text-white text-lg font-light tracking-wide mt-1">
        {value}
      </div>
    </div>
  );
}

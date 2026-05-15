import { Cpu, Database, Server, Activity, Settings, MoreHorizontal, MessageSquare, Globe, Package } from 'lucide-react';
import { useModeStore } from '../features/modes/modeStore';
import { useSettingsStore } from '../settings/settingsStore';

export default function Sidebar() {
  const { activeMode, setActiveMode } = useModeStore();
  const { isOpen, setIsOpen } = useSettingsStore();

  const items = [
    { id: 'dashboard', icon: Cpu, label: '系统概览' },
    { id: 'api', icon: MessageSquare, label: 'API模式' },
    { id: 'webview', icon: Globe, label: '网页模式' },
    { id: 'build', icon: Package, label: '打包发布' },
    { id: 'settings', icon: Settings, label: '设置', bottom: true },
    { id: 'extra', icon: MoreHorizontal, label: '更多', bottom: true },
  ];

  return (
    <div className="w-16 border-r border-[#d4af37]/15 bg-[#0a0a0a] flex flex-col items-center py-6 gap-6 z-20 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeMode === item.id;
        const isSettingsActive = item.id === 'settings' && isOpen;
        
        return (
          <div 
            key={item.id}
            onClick={() => {
              if (item.id === 'settings') {
                setIsOpen(true);
              } else {
                setActiveMode(item.id as any);
              }
            }}
            className={`p-3 rounded-xl cursor-pointer transition-all duration-300 relative group ${
              (isActive && item.id !== 'settings') || isSettingsActive
                ? 'bg-neutral-900 border border-[#d4af37]/50 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                : 'text-neutral-500 hover:text-white border border-transparent hover:bg-neutral-800'
            } ${item.bottom ? 'mt-auto' : ''}`}
            title={item.label}
          >
            {((isActive && item.id !== 'settings') || isSettingsActive) && (
              <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#d4af37] animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
            )}
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
        );
      })}
    </div>
  );
}

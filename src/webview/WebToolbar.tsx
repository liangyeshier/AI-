import { RefreshCw, ExternalLink, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { useWebviewStore } from './webviewStore';

export default function WebToolbar() {
  const { isLoading, getActiveProvider, triggerReload } = useWebviewStore();
  const provider = getActiveProvider();

  const handleRefresh = () => {
    triggerReload();
  };

  const handleBack = () => {
    // 模拟返回
    console.log("返回上一页");
  };

  const handleForward = () => {
    // 模拟前进
    console.log("前进下一页");
  };

  const handleOpenExternal = () => {
    if (provider) {
      window.open(provider.url, '_blank');
    }
  };

  return (
    <div className="flex items-center gap-4 bg-black/40 border border-[#d4af37]/20 px-4 py-2 rounded-[16px] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2 border-r border-neutral-800 pr-4">
        <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
        <span className="text-[10px] text-[#d4af37] font-mono tracking-wider">已保存登录状态</span>
      </div>
      <div className="flex items-center gap-3 pl-2">
        <div onClick={handleBack} className="p-1 rounded-md hover:bg-white/10 cursor-pointer text-neutral-400 hover:text-white transition-colors" title="返回">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <div onClick={handleForward} className="p-1 rounded-md hover:bg-white/10 cursor-pointer text-neutral-400 hover:text-white transition-colors" title="前进">
          <ArrowRight className="w-4 h-4" />
        </div>
        <div onClick={handleRefresh} className="p-1 rounded-md hover:bg-[#d4af37]/20 cursor-pointer text-neutral-400 hover:text-[#d4af37] transition-colors" title="刷新">
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#d4af37]' : ''}`} />
        </div>
        <div onClick={handleOpenExternal} className="p-1 rounded-md hover:bg-white/10 cursor-pointer text-neutral-400 hover:text-white transition-colors" title="在浏览器中打开">
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

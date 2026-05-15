import { useEffect, useState } from 'react';
import { Globe, Check } from 'lucide-react';
import WebProviderTabs from './WebProviderTabs';
import WebToolbar from './WebToolbar';
import { useWebviewStore } from './webviewStore';
import '../styles/webview.css';

export default function WebWorkspace() {
  const { getActiveProvider, isLoading, isError, setLoading, setError, reloadTrigger, triggerReload } = useWebviewStore();
  const provider = getActiveProvider();
  
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // 组件挂载或 provider 改变时重置为加载状态，模拟页面加载
    setLoading(true);
    setError(false);
    setShowSuccess(false);
    
    // 模拟网络请求过程
    const timer = setTimeout(() => {
      // 10% 概率模拟加载失败
      if (Math.random() > 0.9) {
        setError(true);
      } else {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [provider?.id, reloadTrigger, setLoading, setError]);

  const handleRefresh = () => {
    triggerReload();
  };

  return (
    <div className="absolute inset-0 p-6 md:p-8 flex flex-col gap-6 overflow-hidden bg-[radial-gradient(ellipse_at_center,_#1a1a1a,_#000000)] z-10 w-full h-full">
      {/* Top control bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0 mt-8 md:mt-4">
        <WebProviderTabs />
        <WebToolbar />
      </div>

      {/* Webview Container */}
      <div className="flex-1 border border-neutral-800 bg-[#0a0a0a] rounded-[20px] relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
         
         {/* Top decorative line */}
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30 z-20"></div>

         {/* Success Toast */}
         {showSuccess && (
           <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded-full flex items-center gap-2 z-40 webview-anim-fade-in shadow-[0_0_15px_rgba(34,197,94,0.1)]">
             <Check className="w-4 h-4" />
             <span className="text-xs font-mono tracking-widest">网页加载完成</span>
           </div>
         )}

         {/* Content Area */}
         {isLoading && (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-md z-30 webview-anim-fade-in">
             <div className="relative w-16 h-16 mb-4">
               <div className="absolute inset-0 rounded-full border-t-2 border-[#d4af37] animate-spin"></div>
               <div className="absolute inset-2 rounded-full border-r-2 border-neutral-600 animate-spin animation-delay-200"></div>
               <Globe className="w-6 h-6 text-[#d4af37] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80" />
             </div>
             <p className="text-[#d4af37] font-mono text-xs tracking-widest animate-pulse">正在加载网页...</p>
             <p className="text-neutral-600 font-mono text-[10px] tracking-wider mt-2 uppercase">正在连接到 {provider?.url}</p>
           </div>
         )}

         {isError && !isLoading && (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-md z-30 webview-anim-fade-in">
             <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
               <span className="text-red-400 font-bold">!</span>
             </div>
             <p className="text-red-400 font-mono text-xs tracking-widest">网页加载失败，请检查网络或刷新</p>
             <button onClick={handleRefresh} className="mt-6 px-4 py-2 border border-[#d4af37]/50 text-[#d4af37] rounded-lg hover:bg-[#d4af37]/10 transition-colors text-xs font-bold tracking-widest">
               重新加载
             </button>
           </div>
         )}

         {!isLoading && !isError && (
           <div className="absolute inset-0 webview-anim-fade-in bg-[#1a1a1a] flex items-center justify-center group overflow-hidden">
             
             {/* Note: In a real Electron app, this would be: */}
             {/* <webview src={provider?.url} partition="persist:aegis" className="w-full h-full border-none" /> */}
             
             {/* For web preview rendering we use iframe. */}
             <iframe 
               src={provider?.url} 
               className="w-full h-full border-none relative z-10"
               sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
               title={provider?.name}
            />
             
             <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
                <Globe className="w-64 h-64 text-white" />
             </div>
           </div>
         )}
      </div>
    </div>
  );
}

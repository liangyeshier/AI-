import { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSettingsStore } from './settingsStore';
import '../styles/settings.css';

export default function SettingsModal() {
  const { isOpen, setIsOpen, apiKeys, setApiKey, loadKeys, saveKeys } = useSettingsStore();
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadKeys();
    }
  }, [isOpen, loadKeys]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // Matches animation duration
  };

  const handleSave = async () => {
    const success = await saveKeys();
    if (success) {
      setToast({ msg: '已成功保存', type: 'success' });
    } else {
      setToast({ msg: '保存失败，请重试', type: 'error' });
    }
    setTimeout(() => setToast(null), 3000);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm ${isClosing ? 'modal-fade-out' : 'modal-fade-in'}`}>
      <div className={`w-full max-w-lg border border-[#d4af37]/30 bg-[#0a0a0a]/90 backdrop-blur-md rounded-[30px] p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative ring-1 ring-white/10 ${isClosing ? 'modal-scale-out' : 'modal-scale-in'}`}>
        {/* Close Button */}
        <div 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 cursor-pointer text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-[#d4af37]/10 rounded-2xl border border-[#d4af37]/30">
            <Key className="w-6 h-6 text-[#d4af37]" />
          </div>
          <h2 className="text-2xl font-bold tracking-widest text-[#d4af37] drop-shadow-[0_0_5px_#d4af37]">设置中心</h2>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {(Object.keys(apiKeys) as Array<keyof typeof apiKeys>).map((provider) => {
            const labels: Record<string, string> = {
              gemini: 'Gemini API Key',
              openai: 'OpenAI API Key',
              claude: 'Claude API Key',
              grok: 'Grok API Key',
              deepseek: 'DeepSeek API Key'
            };
            return (
              <div key={provider} className="flex flex-col gap-2">
                <label className="text-xs font-mono tracking-widest text-neutral-400 pl-1 uppercase">
                  {labels[provider]}
                </label>
                <input
                  type="password"
                  value={apiKeys[provider]}
                  onChange={(e) => setApiKey(provider, e.target.value)}
                  placeholder="请输入密钥..."
                  className="bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]/60 focus:ring-1 focus:ring-[#d4af37]/60 transition-all font-mono"
                />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-neutral-500">
             <ShieldCheck className="w-4 h-4 text-green-500/70" />
             <span className="text-[10px] font-mono tracking-wider">数据已本地加密保存，未来可升级 Keychain</span>
          </div>
          <button 
            onClick={handleSave}
            className="px-8 py-3 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] text-xs font-bold tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:-translate-y-0.5"
          >
            保存
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/80 border border-neutral-700 px-6 py-3 rounded-full backdrop-blur-md shadow-xl animate-bounce">
            {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
            <span className={`text-xs font-bold tracking-widest ${toast.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{toast.msg}</span>
          </div>
        )}
      </div>
    </div>
  );
}

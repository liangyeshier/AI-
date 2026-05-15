import { Bot, RefreshCw, Trash2, LayoutGrid } from 'lucide-react';
import { useApiChatStore } from './apiChatStore';
import { useSessionStore } from '../sessions/sessionStore';

export default function ChatHeader() {
  const { currentModel, setCurrentModel } = useApiChatStore();
  const { clearCurrentSessionHistory, createSession } = useSessionStore();

  const models = [
    { id: 'gemini', name: 'Gemini 1.5 Pro' },
    { id: 'openai', name: 'GPT-4o' },
    { id: 'claude', name: 'Claude 3.5 Sonnet' },
    { id: 'grok', name: 'Grok 2' },
    { id: 'deepseek', name: 'DeepSeek V4' }
  ];

  return (
    <div className="h-16 shrink-0 border-b border-[#d4af37]/20 bg-black/40 backdrop-blur-md flex items-center justify-between px-4 md:px-6 z-20 overflow-hidden">
      <div className="flex items-center gap-3 shrink-0">
        <div className="p-2 bg-[#d4af37]/10 rounded-xl border border-[#d4af37]/30">
          <Bot className="w-5 h-5 text-[#d4af37]" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide text-[#d4af37] drop-shadow-[0_0_5px_#d4af37] whitespace-nowrap">
            API 聊天
          </h1>
          <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase whitespace-nowrap">统一会话工作台</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <select 
          value={currentModel}
          onChange={(e) => setCurrentModel(e.target.value)}
          className="bg-black/50 border border-neutral-800 text-[#d4af37] text-xs rounded-lg px-2 py-1 outline-none focus:border-[#d4af37]/50 appearance-none min-w-[110px] cursor-pointer hidden sm:block"
        >
          {models.map(m => (
             <option key={m.id} value={m.id} className="bg-neutral-900">{m.name}</option>
          ))}
        </select>
        <div className="w-[1px] h-6 bg-neutral-800 mx-1 hidden sm:block"></div>
        <div className="flex items-center gap-1">
          <button 
            onClick={clearCurrentSessionHistory}
            className="p-2 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-red-400 transition-colors"
            title="清空会话"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button 
            onClick={createSession}
            className="p-2 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-[#d4af37] transition-colors"
            title="新会话"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button 
            className="p-2 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            title="切换布局"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { useApiChatStore } from './apiChatStore';
import { useSessionStore } from '../sessions/sessionStore';
import { renderMarkdown } from './renderers/markdownRenderer';
import { User, Bot, Info } from 'lucide-react';

export default function ChatHistory() {
  const { isGenerating } = useApiChatStore();
  const { getCurrentSession } = useSessionStore();
  const session = getCurrentSession();
  const messages = session ? session.messages : [];
  
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  if (!session || messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-transparent relative z-10 w-full h-full">
        <div className="w-16 h-16 mb-4 rounded-full bg-neutral-800/50 flex items-center justify-center border border-neutral-700/50">
           <Bot className="w-8 h-8 text-neutral-600" />
        </div>
        <p className="text-neutral-500 font-mono text-sm tracking-widest">暂无消息，请开始新的对话</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar space-y-6">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
          
          <div className="shrink-0 mt-1">
            {msg.role === 'user' ? (
              <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                <User className="w-4 h-4 text-neutral-400" />
              </div>
            ) : msg.role === 'system' ? (
              <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                <Info className="w-4 h-4 text-blue-400" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                <Bot className="w-4 h-4 text-[#d4af37]" />
              </div>
            )}
          </div>

          <div className={`max-w-[80%] rounded-2xl p-4 shadow-lg ${
            msg.role === 'user'
              ? 'bg-neutral-800 text-white border border-neutral-700 rounded-tr-sm'
              : msg.role === 'system'
              ? 'bg-blue-500/5 text-blue-300 border border-blue-500/20 font-mono text-xs tracking-wider rounded-tl-sm'
              : 'bg-black/60 text-neutral-100 border border-[#d4af37]/20 backdrop-blur-md rounded-tl-sm'
          }`}>
             {msg.role === 'system' ? (
               <div>{msg.content}</div>
             ) : (
               <div className="text-[15px]">{renderMarkdown(msg.content)}</div>
             )}
          </div>

        </div>
      ))}
      {isGenerating && (
         <div className="flex gap-4">
           <div className="shrink-0 mt-1">
             <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                <Bot className="w-4 h-4 text-[#d4af37] animate-pulse" />
             </div>
           </div>
           <div className="max-w-[80%] rounded-2xl rounded-tl-sm p-4 bg-black/60 text-neutral-100 border border-[#d4af37]/20 backdrop-blur-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
           </div>
         </div>
      )}
      <div ref={endRef} />
    </div>
  );
}

import { useState, KeyboardEvent } from 'react';
import { Send, Command, Loader2 } from 'lucide-react';
import { useApiChatStore } from './apiChatStore';
import { useSessionStore } from '../sessions/sessionStore';
import { fetchMockChatResponse, createMockStream } from './apiClient';

export default function ChatComposer() {
  const [input, setInput] = useState('');
  const { isGenerating, setIsGenerating, currentModel } = useApiChatStore();
  const { addMessageToCurrent, updateLastMessageInCurrent } = useSessionStore();

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userContent = input.trim();
    setInput('');
    setIsGenerating(true);

    addMessageToCurrent({
      id: Date.now().toString(),
      role: 'user',
      content: userContent,
      timestamp: Date.now()
    });

    try {
      const responseText = await fetchMockChatResponse([{ id: '1', role: 'user', content: userContent, timestamp: Date.now() }], currentModel);
      
      const asstId = (Date.now() + 1).toString();
      addMessageToCurrent({
        id: asstId,
        role: 'assistant',
        content: '',
        timestamp: Date.now()
      });

      const stream = createMockStream(responseText);
      let acc = '';
      for await (const chunk of stream) {
        acc += chunk;
        updateLastMessageInCurrent(acc);
      }

    } catch (error) {
      addMessageToCurrent({
        id: (Date.now() + 2).toString(),
        role: 'system',
        content: '错误提示：出错，请重试',
        timestamp: Date.now()
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 shrink-0 border-t border-[#d4af37]/20 bg-black/40 backdrop-blur-md z-20 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-20 z-30"></div>
      
      <div className="max-w-4xl mx-auto relative rounded-2xl bg-neutral-900/60 border border-neutral-700/50 backdrop-blur-xl focus-within:border-[#d4af37]/50 focus-within:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all flex shadow-lg">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isGenerating ? "正在发送…" : "请输入消息... (Enter 发送，Shift + Enter 换行)"}
          className="flex-1 bg-transparent text-white p-4 max-h-48 min-h-[56px] resize-none outline-none custom-scrollbar text-[15px]"
          rows={1}
          disabled={isGenerating}
        />
        <div className="flex items-start md:items-center justify-center p-3 gap-2">
          <div className="hidden sm:flex items-center gap-1 text-[10px] text-neutral-500 font-mono px-2 py-1 bg-black/30 rounded-md border border-neutral-800">
             <Command className="w-3 h-3" /> Enter
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isGenerating}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 hover:bg-[#d4af37] hover:text-black transition-all disabled:opacity-30 disabled:hover:bg-[#d4af37]/10 disabled:hover:text-[#d4af37] disabled:cursor-not-allowed"
            title="发送"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}

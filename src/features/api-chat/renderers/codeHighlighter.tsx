import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';

interface CodeHighlighterProps {
  language: string;
  content: string;
}

export default function CodeHighlighter({ language, content }: CodeHighlighterProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl bg-[#0a0a0a]/80 border border-neutral-800 my-4 overflow-hidden group shadow-[0_0_15px_rgba(212,175,55,0.05)] ring-1 ring-[#d4af37]/10 backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-full px-4 py-2 bg-neutral-900/80 border-b border-neutral-800 text-[10px] text-[#d4af37] font-mono tracking-widest uppercase flex justify-between items-center z-10">
        <span>{language || 'code'}</span>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-neutral-500 hover:text-[#d4af37] transition-colors outline-none"
        >
          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? '已复制' : '复制代码'}</span>
        </button>
      </div>
      <div className="pt-8 overflow-x-auto custom-scrollbar">
        <SyntaxHighlighter
          language={language === 'mermaid' ? 'text' : language}
          style={vscDarkPlus as any}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '13px',
            lineHeight: '1.5',
          }}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

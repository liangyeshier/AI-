import ReactMarkdown from 'react-markdown';
import { type Components } from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import CodeHighlighter from './codeHighlighter';
import MermaidRenderer from './mermaidRenderer';
import 'katex/dist/katex.min.css';
import '../../../styles/renderers.css';

export const renderMarkdown = (content: string) => {
  const components: Components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const codeContent = String(children).replace(/\n$/, '');

      if (!inline) {
        if (language === 'mermaid') {
          return <MermaidRenderer content={codeContent} />;
        }
        return <CodeHighlighter language={language} content={codeContent} />;
      }

      return (
        <code className="bg-[#d4af37]/10 text-[#d4af37] px-1.5 py-0.5 rounded font-mono text-[13px] border border-[#d4af37]/20" {...props}>
          {children}
        </code>
      );
    },
    p: ({children}) => <p className="mb-3 last:mb-0 leading-relaxed text-[15px]">{children}</p>,
    ul: ({children}) => <ul className="list-disc pl-6 mb-3 space-y-1">{children}</ul>,
    ol: ({children}) => <ol className="list-decimal pl-6 mb-3 space-y-1 text-[#d4af37] font-mono"><div className="text-white font-sans">{children}</div></ol>,
    li: ({children}) => <li className="mb-1 leading-relaxed marker:text-[#d4af37]">{children}</li>,
    a: ({children, href}) => <a href={href} className="text-[#d4af37] hover:underline underline-offset-2 break-all" target="_blank" rel="noreferrer">{children}</a>,
    blockquote: ({children}) => (
      <blockquote className="border-l-2 border-[#d4af37]/50 pl-4 py-1 my-3 bg-[#d4af37]/5 rounded-r-lg text-neutral-300 italic">
        {children}
      </blockquote>
    ),
    h1: ({children}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-[#d4af37]">{children}</h1>,
    h2: ({children}) => <h2 className="text-xl font-bold mt-5 mb-3 text-[#d4af37]/90">{children}</h2>,
    h3: ({children}) => <h3 className="text-lg font-bold mt-4 mb-2 text-white">{children}</h3>,
    table: ({children}) => (
      <div className="overflow-x-auto my-4 rounded-lg border border-neutral-800">
        <table className="w-full text-sm text-left">{children}</table>
      </div>
    ),
    th: ({children}) => <th className="bg-neutral-900 px-4 py-2 font-bold text-[#d4af37] border-b border-neutral-800">{children}</th>,
    td: ({children}) => <td className="px-4 py-2 border-b border-neutral-800/50 bg-black/30">{children}</td>,
  };

  return (
    <div className="markdown-body">
      <ReactMarkdown 
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components} 
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#1e1e1e',
    primaryTextColor: '#d4af37',
    primaryBorderColor: '#d4af37',
    lineColor: '#d4af37',
    secondaryColor: '#0a0a0a',
    tertiaryColor: '#0a0a0a'
  }
});

interface MermaidRendererProps {
  content: string;
}

export default function MermaidRenderer({ content }: MermaidRendererProps) {
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const renderChart = async () => {
      try {
        setError(false);
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, content);
        if (isMounted) setSvgContent(svg);
      } catch (e) {
        console.error('Mermaid rendering failed', e);
        if (isMounted) setError(true);
      }
    };
    if (content) {
      renderChart();
    }
    return () => { isMounted = false; };
  }, [content]);

  if (error) {
    return (
      <div className="p-4 border border-red-500/30 bg-red-500/5 rounded-xl my-4 text-xs font-mono text-red-400">
        Mermaid 渲染错误，请检查语法。
        <pre className="mt-2 text-[10px] text-neutral-500">{content}</pre>
      </div>
    );
  }

  return (
    <div 
      className="mermaid-container flex justify-center py-4 my-4 bg-neutral-900/30 rounded-xl border border-neutral-800 ring-1 ring-white/5" 
      dangerouslySetInnerHTML={{ __html: svgContent }} 
    />
  );
}

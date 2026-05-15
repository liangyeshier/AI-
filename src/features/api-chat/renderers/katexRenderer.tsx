import 'katex/dist/katex.min.css';

// 该组件负责提供 KaTeX 相关的样式和独立渲染接口（主要由 react-markdown 的 rehype-katex 插件自动处理）
export default function KatexRenderer({ content }: { content: string }) {
  // 作为独立组件的占位
  return (
    <div className="katex-container p-4 bg-neutral-900/30 rounded-xl border border-neutral-800 my-4 text-center">
      <div className="text-xs text-neutral-500 font-mono mb-2">KaTeX 独立渲染占位</div>
      <div className="text-[#d4af37]">{content}</div>
    </div>
  );
}

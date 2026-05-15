import ChatHeader from './ChatHeader';
import ChatHistory from './ChatHistory';
import ChatComposer from './ChatComposer';
import SessionTimeline from './SessionTimeline';
import '../../styles/apiChat.css';

export default function ApiWorkspace() {
  return (
    <div className="absolute inset-0 p-6 md:p-8 flex flex-col overflow-hidden bg-[radial-gradient(ellipse_at_center,_#1a1a1a,_#000000)] z-10 w-full h-full">
      <div className="flex-1 w-full flex border border-neutral-800 bg-[#0a0a0a]/80 backdrop-blur-md rounded-[20px] relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
         
        {/* Top decorative line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30 z-30"></div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-neutral-800/50">
          <ChatHeader />
          <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] flex flex-col overflow-hidden">
             <div className="absolute inset-0 bg-black/70 z-0 pointer-events-none"></div>
             <div className="relative z-10 flex flex-col h-full w-full">
                 <ChatHistory />
                 <ChatComposer />
             </div>
          </div>
        </div>

        {/* Session Timeline Right Panel */}
        <SessionTimeline />

      </div>
    </div>
  );
}

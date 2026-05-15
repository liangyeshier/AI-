import { useState, useEffect } from 'react';
import { useSessionStore } from '../sessions/sessionStore';
import { MessageSquare, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import '../../styles/sessions.css';

export default function SessionTimeline() {
  const { sessions, currentSessionId, loadSessions, createSession, deleteSession, renameSession, switchSession } = useSessionStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const handleCreate = () => {
    createSession();
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('已删除该会话？(点击确定执行删除)')) {
      deleteSession(id);
    }
  };

  const startEdit = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    setEditingId(id);
    setEditTitle(title);
  };

  const saveEdit = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      renameSession(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const cancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  return (
    <div className="w-64 shrink-0 flex flex-col bg-[#0a0a0a]/90 backdrop-blur-md border-l border-neutral-800 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-20 overflow-hidden rounded-r-[20px] session-timeline-container relative">
      <div className="p-4 border-b border-neutral-800/80 flex items-center justify-between relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"></div>
        <h2 className="text-sm font-bold text-neutral-300 tracking-wider">会话历史</h2>
        <button 
          onClick={handleCreate}
          className="p-1.5 hover:bg-[#d4af37]/20 rounded-md text-[#d4af37] transition-colors border border-transparent hover:border-[#d4af37]/30"
          title="新建会话"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        {sessions.map(session => {
          const isActive = session.id === currentSessionId;
          const isEditing = session.id === editingId;
          
          return (
            <div 
              key={session.id}
              onClick={() => switchSession(session.id)}
              className={`group flex items-center p-3 rounded-xl cursor-pointer transition-all border ${
                isActive 
                  ? 'bg-[#d4af37]/10 border-[#d4af37]/30 shadow-[0_0_10px_rgba(212,175,55,0.05)]' 
                  : 'bg-transparent border-transparent hover:bg-neutral-800/50 hover:border-neutral-700/50'
              }`}
            >
              <div className="shrink-0 mr-3">
                <MessageSquare className={`w-4 h-4 ${isActive ? 'text-[#d4af37]' : 'text-neutral-500'}`} />
              </div>
              
              {isEditing ? (
                <div className="flex-1 flex items-center gap-1">
                  <input 
                    autoFocus
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-black/50 text-xs text-[#d4af37] border border-[#d4af37]/50 rounded px-2 py-1 outline-none"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(e as any, session.id);
                    }}
                  />
                  <button onClick={(e) => saveEdit(e, session.id)} className="text-green-500 hover:text-green-400 p-1" title="保存">
                    <Check className="w-3 h-3" />
                  </button>
                  <button onClick={cancelEdit} className="text-neutral-500 hover:text-neutral-300 p-1">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className={`text-xs truncate ${isActive ? 'text-[#d4af37] font-medium' : 'text-neutral-300'}`}>
                    {session.title}
                  </div>
                  <div className="text-[10px] text-neutral-600 mt-1 font-mono">
                    {new Date(session.lastUpdatedAt).toLocaleTimeString()}
                  </div>
                </div>
              )}

              {!isEditing && (
                <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                  <button 
                    onClick={(e) => startEdit(e, session.id, session.title)}
                    className="p-1.5 text-neutral-500 hover:text-[#d4af37] hover:bg-[#d4af37]/10 rounded-md transition-colors"
                    title="重命名"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, session.id)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                    title="删除"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {sessions.length === 0 && (
          <div className="text-center text-xs text-neutral-600 p-4 font-mono">
            暂无消息，请开始新的对话
          </div>
        )}
      </div>
    </div>
  );
}

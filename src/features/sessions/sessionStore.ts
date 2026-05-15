import { create } from 'zustand';
import { ChatSession } from './sessionTypes';
import { sessionRepository } from './sessionRepository';
import { ChatMessage } from '../api-chat/apiClient';

interface SessionState {
  sessions: ChatSession[];
  currentSessionId: string | null;
  loadSessions: () => void;
  createSession: () => void;
  deleteSession: (id: string) => void;
  renameSession: (id: string, title: string) => void;
  switchSession: (id: string) => void;
  addMessageToCurrent: (message: ChatMessage) => void;
  updateLastMessageInCurrent: (content: string) => void;
  clearCurrentSessionHistory: () => void;
  getCurrentSession: () => ChatSession | undefined;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  sessions: [],
  currentSessionId: null,

  loadSessions: () => {
    let loaded = sessionRepository.getSessions();
    if (loaded.length === 0) {
      loaded = [{
        id: Date.now().toString(),
        title: '初始会话',
        createdAt: Date.now(),
        lastUpdatedAt: Date.now(),
        messages: [
          {
            id: 'system-1',
            role: 'system',
            content: '系统消息：欢迎使用统一 API 聊天工作台。',
            timestamp: Date.now()
          }
        ]
      }];
      sessionRepository.saveSessions(loaded);
    }
    set({ sessions: loaded, currentSessionId: loaded[0].id });
  },

  createSession: () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: '新建会话',
      createdAt: Date.now(),
      lastUpdatedAt: Date.now(),
      messages: []
    };
    const newSessions = [newSession, ...get().sessions];
    sessionRepository.saveSessions(newSessions);
    set({ sessions: newSessions, currentSessionId: newSession.id });
  },

  deleteSession: (id) => {
    const newSessions = get().sessions.filter(s => s.id !== id);
    sessionRepository.saveSessions(newSessions);
    if (get().currentSessionId === id) {
      set({ sessions: newSessions, currentSessionId: newSessions.length > 0 ? newSessions[0].id : null });
    } else {
       set({ sessions: newSessions });
    }
  },

  renameSession: (id, title) => {
    const newSessions = get().sessions.map(s => s.id === id ? { ...s, title } : s);
    sessionRepository.saveSessions(newSessions);
    set({ sessions: newSessions });
  },

  switchSession: (id) => {
    set({ currentSessionId: id });
  },

  addMessageToCurrent: (message) => {
    const currentId = get().currentSessionId;
    if (!currentId) return;
    const newSessions = get().sessions.map(s => {
      if (s.id === currentId) {
        return {
          ...s,
          lastUpdatedAt: Date.now(),
          messages: [...s.messages, message]
        };
      }
      return s;
    });
    sessionRepository.saveSessions(newSessions);
    set({ sessions: newSessions });
  },

  updateLastMessageInCurrent: (content) => {
    const currentId = get().currentSessionId;
    if (!currentId) return;
    const newSessions = get().sessions.map(s => {
      if (s.id === currentId) {
        const msgs = [...s.messages];
        if (msgs.length > 0) {
          msgs[msgs.length - 1].content = content;
        }
        return { ...s, messages: msgs, lastUpdatedAt: Date.now() };
      }
      return s;
    });
    sessionRepository.saveSessions(newSessions);
    set({ sessions: newSessions });
  },

  clearCurrentSessionHistory: () => {
    const currentId = get().currentSessionId;
    if (!currentId) return;
    const newSessions = get().sessions.map(s => s.id === currentId ? { ...s, messages: [] } : s);
    sessionRepository.saveSessions(newSessions);
    set({ sessions: newSessions });
  },

  getCurrentSession: () => {
    return get().sessions.find(s => s.id === get().currentSessionId);
  }
}));

import { ChatSession } from './sessionTypes';

const STORE_KEY = 'aether_agentic_sessions';

export const sessionRepository = {
  getSessions: (): ChatSession[] => {
    try {
      const data = localStorage.getItem(STORE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to parse sessions from localStorage', e);
    }
    return [];
  },

  saveSessions: (sessions: ChatSession[]) => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save sessions to localStorage', e);
    }
  }
};

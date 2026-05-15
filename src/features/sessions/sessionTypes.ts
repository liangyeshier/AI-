import { ChatMessage } from '../api-chat/apiClient';

export interface ChatSession {
  id: string;
  title: string;
  lastUpdatedAt: number;
  createdAt: number;
  messages: ChatMessage[];
}

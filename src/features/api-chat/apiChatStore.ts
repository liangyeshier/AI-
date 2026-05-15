import { create } from 'zustand';

interface ApiChatState {
  currentModel: string;
  isGenerating: boolean;
  setCurrentModel: (model: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
}

export const useApiChatStore = create<ApiChatState>((set) => ({
  currentModel: 'deepseek',
  isGenerating: false,
  setCurrentModel: (model) => set({ currentModel: model }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
}));

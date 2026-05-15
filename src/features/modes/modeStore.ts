import { create } from 'zustand';

export type AppMode = 'dashboard' | 'api' | 'webview' | 'build' | 'settings' | 'extra';

interface ModeState {
  activeMode: AppMode;
  setActiveMode: (mode: AppMode) => void;
}

export const useModeStore = create<ModeState>((set) => ({
  activeMode: 'dashboard',
  setActiveMode: (mode) => set({ activeMode: mode }),
}));

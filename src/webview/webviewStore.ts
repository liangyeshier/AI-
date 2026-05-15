import { create } from 'zustand';
import { WebProvider, WEB_PROVIDERS } from './webProviders';

interface WebviewState {
  activeProviderId: string;
  isLoading: boolean;
  isError: boolean;
  reloadTrigger: number;
  setActiveProviderId: (id: string) => void;
  getActiveProvider: () => WebProvider | undefined;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  triggerReload: () => void;
}

export const useWebviewStore = create<WebviewState>((set, get) => ({
  activeProviderId: WEB_PROVIDERS[0].id,
  isLoading: true,
  isError: false,
  reloadTrigger: 0,
  setActiveProviderId: (id) => set({ activeProviderId: id, isLoading: true, isError: false, reloadTrigger: get().reloadTrigger + 1 }),
  getActiveProvider: () => WEB_PROVIDERS.find(p => p.id === get().activeProviderId),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ isError: error }),
  triggerReload: () => set({ reloadTrigger: get().reloadTrigger + 1 }),
}));

import { create } from 'zustand';
import { secureStorage } from './secureStorage';

interface ApiKeys {
  gemini: string;
  openai: string;
  claude: string;
  grok: string;
  deepseek: string;
}

interface SettingsState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  apiKeys: ApiKeys;
  setApiKey: (provider: keyof ApiKeys, key: string) => void;
  loadKeys: () => Promise<void>;
  saveKeys: () => Promise<boolean>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
  apiKeys: { gemini: '', openai: '', claude: '', grok: '', deepseek: '' },
  setApiKey: (provider, key) => 
    set((state) => ({ apiKeys: { ...state.apiKeys, [provider]: key } })),
  loadKeys: async () => {
    const keys = { gemini: '', openai: '', claude: '', grok: '', deepseek: '' };
    for (const provider of Object.keys(keys) as Array<keyof ApiKeys>) {
      const val = await secureStorage.getItem(`api_key_${provider}`);
      if (val) {
        keys[provider] = val;
      }
    }
    set({ apiKeys: keys });
  },
  saveKeys: async () => {
    try {
      const { apiKeys } = get();
      for (const [provider, key] of Object.entries(apiKeys)) {
        await secureStorage.setItem(`api_key_${provider}`, key);
      }
      return true;
    } catch (e) {
      console.error("Failed to save keys", e);
      return false;
    }
  }
}));

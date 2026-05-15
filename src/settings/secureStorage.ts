export const secureStorage = {
  setItem: async (key: string, value: string): Promise<void> => {
    // 抽象层：目前使用 localStorage，未来可升级为 node-keytar 或 Electron safeStorage
    localStorage.setItem(key, value);
  },
  getItem: async (key: string): Promise<string | null> => {
    return localStorage.getItem(key);
  },
  removeItem: async (key: string): Promise<void> => {
    localStorage.removeItem(key);
  }
};

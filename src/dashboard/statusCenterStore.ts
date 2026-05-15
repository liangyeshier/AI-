import { create } from 'zustand';

interface ActivityLogItem {
  id: string;
  time: number;
  message: string;
  type: 'info' | 'success' | 'warn' | 'error';
}

interface StatusCenterState {
  nodeConnected: boolean;
  activeModeText: string;
  currentService: string;
  apiCount: number;
  sessionCount: number;
  activities: ActivityLogItem[];
  setNodeConnected: (connected: boolean) => void;
  setActiveModeText: (text: string) => void;
  setCurrentService: (service: string) => void;
  setApiCount: (count: number) => void;
  setSessionCount: (count: number) => void;
  addActivity: (message: string, type?: ActivityLogItem['type']) => void;
}

export const useStatusCenterStore = create<StatusCenterState>((set, get) => ({
  nodeConnected: true,
  activeModeText: '主控制台',
  currentService: '空闲',
  apiCount: 3, // 模拟数据
  sessionCount: 5, // 模拟数据
  activities: [
    { id: '1', time: Date.now() - 5000, message: '系统启动，完成载入', type: 'info' },
    { id: '2', time: Date.now() - 3000, message: '成功连接到 API 模式', type: 'success' },
    { id: '3', time: Date.now() - 1000, message: '拉取最新配置数据', type: 'info' },
  ],
  setNodeConnected: (connected) => set({ nodeConnected: connected }),
  setActiveModeText: (text) => set({ activeModeText: text }),
  setCurrentService: (service) => set({ currentService: service }),
  setApiCount: (count) => set({ apiCount: count }),
  setSessionCount: (count) => set({ sessionCount: count }),
  addActivity: (message, type = 'info') => set((state) => {
    const newActivity: ActivityLogItem = { id: Date.now().toString(), time: Date.now(), message, type };
    return { activities: [newActivity, ...state.activities].slice(0, 5) };
  })
}));

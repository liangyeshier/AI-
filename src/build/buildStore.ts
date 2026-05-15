import { create } from 'zustand';

export type TargetOS = 'mac' | 'win' | 'both';

interface LogItem {
  id: string;
  time: number;
  message: string;
  type?: 'info' | 'success' | 'error' | 'warn';
}

interface BuildState {
  targetOS: TargetOS;
  isBuilding: boolean;
  progress: number;
  statusText: string;
  logs: LogItem[];
  setTargetOS: (os: TargetOS) => void;
  startBuild: () => void;
  updateProgress: (progress: number, text: string) => void;
  addLog: (message: string, type?: LogItem['type']) => void;
  finishBuild: (success: boolean) => void;
  resetBuild: () => void;
}

export const useBuildStore = create<BuildState>((set, get) => ({
  targetOS: 'mac',
  isBuilding: false,
  progress: 0,
  statusText: '准备就绪',
  logs: [],
  setTargetOS: (os) => set({ targetOS: os }),
  startBuild: () => set({ isBuilding: true, progress: 0, statusText: '正在打包…', logs: [] }),
  updateProgress: (progress, text) => set({ progress, statusText: text }),
  addLog: (message, type = 'info') => set(state => ({
    logs: [...state.logs, { id: Date.now().toString() + Math.random(), time: Date.now(), message, type }]
  })),
  finishBuild: (success) => set({
    isBuilding: false,
    progress: success ? 100 : get().progress,
    statusText: success ? '打包完成' : '打包失败，请检查配置'
  }),
  resetBuild: () => set({ isBuilding: false, progress: 0, statusText: '准备就绪', logs: [] })
}));

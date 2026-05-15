import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  getSystemMetrics: () => ipcRenderer.invoke('get-system-metrics'),
  startBuild: (targetOS: string) => ipcRenderer.send('start-build', { targetOS }),
  onBuildLog: (callback: (data: { type: string, message: string }) => void) => {
    ipcRenderer.on('build-log', (event, data) => callback(data));
  },
  onBuildProgress: (callback: (progress: number) => void) => {
    ipcRenderer.on('build-progress', (event, progress) => callback(progress));
  },
  onBuildComplete: (callback: () => void) => {
    ipcRenderer.on('build-complete', () => callback());
  }
});

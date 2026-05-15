interface Window {
  electronAPI?: {
    minimize: () => void;
    maximize: () => void;
    close: () => void;
    getSystemMetrics: () => Promise<{
      cpuUsage: number;
      memUsage: number;
      totalMemStr: string;
      usedMemStr: string;
      netUsage: number;
    }>;
    startBuild: (targetOS: string) => void;
    onBuildLog: (callback: (data: { type: string; message: string }) => void) => void;
    onBuildProgress: (callback: (progress: number) => void) => void;
    onBuildComplete: (callback: () => void) => void;
  };
}

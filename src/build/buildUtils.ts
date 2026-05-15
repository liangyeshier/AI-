import { useBuildStore } from './buildStore';

export const startPackaging = async () => {
  const store = useBuildStore.getState();
  if (store.isBuilding) return;

  store.startBuild();

  if (window.electronAPI) {
    store.addLog('启动原生打包进程...', 'info');
    
    // Unsubscribe from previous runs if necessary, assuming only one run here
    // In a real app we'd need a cleaner way to handle IPC listeners over time
    window.electronAPI.onBuildLog((data) => {
      store.addLog(data.message, data.type as any);
    });
    
    window.electronAPI.onBuildProgress((progress) => {
      store.updateProgress(progress, `正在打包中 (${progress}%)`);
    });
    
    window.electronAPI.onBuildComplete(() => {
      store.finishBuild(true);
      store.updateProgress(100, '打包完成');
    });
    
    window.electronAPI.startBuild(store.targetOS);
    return;
  }

  // Fallback for Web preview
  store.addLog('初始化构建环境...', 'info');

  const steps = [
    { text: '清理历史构建缓存', progress: 10, delay: 800 },
    { text: '安装跨平台依赖', progress: 25, delay: 1200 },
    { text: '编译 TypeScript 源码', progress: 45, delay: 1500 },
    { text: '构建前端静态资源', progress: 60, delay: 1000 },
    { text: `正在生成 ${store.targetOS === 'mac' ? 'macOS' : store.targetOS === 'win' ? 'Windows' : '双系统'} 安装包`, progress: 80, delay: 2000 },
    { text: '代码签名与检查', progress: 95, delay: 1000 },
    { text: '构建设定完成', progress: 100, delay: 500 }
  ];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    await new Promise(resolve => setTimeout(resolve, step.delay));
    
    // Simulate failure 5% of the time, to demonstrate the UI handling
    if (Math.random() > 0.95 && i > 3) {
      store.addLog('构建过程中发生未知错误，代码签名失败', 'error');
      store.finishBuild(false);
      return;
    }

    store.updateProgress(step.progress, step.text);
    store.addLog(step.text, 'info');
  }

  store.addLog('所有构建任务已完成。', 'success');
  store.finishBuild(true);
  store.updateProgress(100, '打包完成');
};

export const openBuildDirectory = () => {
  const store = useBuildStore.getState();
  store.addLog('打开应用目录...', 'info');
  // 模拟在文件管理器中打开
  setTimeout(() => {
    store.addLog('已在文件管理器中显示安装包', 'success');
  }, 500);
};

import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as os from 'os';
import { exec } from 'child_process';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    frame: false, // Frameless window
    transparent: true, // For rounded corners
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load from Vite dev server during development
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Handle window controls
  ipcMain.on('window-minimize', () => {
    mainWindow.minimize();
  });
  
  ipcMain.on('window-maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on('window-close', () => {
    mainWindow.close();
  });
}

// System metrics handler for PerformancePanel
ipcMain.handle('get-system-metrics', () => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memUsagePercent = (usedMem / totalMem) * 100;
  
  const cpus = os.cpus();
  let idle = 0;
  let total = 0;
  cpus.forEach(core => {
    for (const type in core.times) {
      total += core.times[type as keyof typeof core.times];
    }
    idle += core.times.idle;
  });
  const cpuUsagePercent = 100 - Math.round(100 * idle / total);

  // Fake Network I/O for demonstration as standard Node os module doesn't provide precise per-process net I/O easily
  const netUsage = Math.random() * 20;

  return {
    cpuUsage: cpuUsagePercent,
    memUsage: memUsagePercent,
    totalMemStr: (totalMem / (1024 ** 3)).toFixed(1) + 'GB',
    usedMemStr: (usedMem / (1024 ** 3)).toFixed(1) + 'GB',
    netUsage
  };
});

// Build task simulation
ipcMain.on('start-build', (event, { targetOS }) => {
  const commands = [
    `Initializing build environment for ${targetOS}...`,
    'Resolving dependencies...',
    'Compiling assets using Vite...',
    '> vite build',
    'vite v6.0.0 building for production...',
    '✓ 142 modules transformed.',
    'Building native wrappers with electron-builder...',
    `Packaging for ${targetOS}...`,
    'Code signing skipped (dev mode).',
    'Build complete. Artifacts saved.'
  ];
  
  event.sender.send('build-log', { type: 'info', message: 'Starting build process...' });
  event.sender.send('build-progress', 0);
  
  let step = 0;
  const interval = setInterval(() => {
    if (step < commands.length) {
      event.sender.send('build-log', { type: 'info', message: commands[step] });
      const progress = Math.round(((step + 1) / commands.length) * 100);
      event.sender.send('build-progress', progress);
      step++;
    } else {
      clearInterval(interval);
      event.sender.send('build-complete');
    }
  }, 1000);
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

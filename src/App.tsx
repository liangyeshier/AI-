import TitleBar from './layout/TitleBar';
import Sidebar from './layout/Sidebar';
import StatusBar from './layout/StatusBar';
import MainContent from './layout/MainContent';
import SettingsModal from './settings/SettingsModal';

export default function App() {
  return (
    <div className="flex flex-col h-screen sm:h-[calc(100vh-40px)] sm:m-5 sm:rounded-[30px] rounded-none bg-[#0a0a0a] text-white font-sans overflow-hidden selection:bg-[#d4af37]/30 border border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
      <TitleBar />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <MainContent />
      </div>

      <StatusBar />
      <SettingsModal />
    </div>
  );
}

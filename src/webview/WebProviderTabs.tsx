import { useWebviewStore } from './webviewStore';
import { WEB_PROVIDERS } from './webProviders';

export default function WebProviderTabs() {
  const { activeProviderId, setActiveProviderId } = useWebviewStore();

  return (
    <div className="flex items-center gap-2 bg-black/60 p-2 rounded-[16px] border border-neutral-800/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      {WEB_PROVIDERS.map((provider) => {
        const isActive = activeProviderId === provider.id;
        return (
          <div
            key={provider.id}
            onClick={() => setActiveProviderId(provider.id)}
            className={`px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 text-xs font-bold tracking-widest ${
              isActive
                ? 'bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                : 'text-neutral-500 border border-transparent hover:text-neutral-300 hover:bg-white/5'
            }`}
          >
            {provider.name}
          </div>
        );
      })}
    </div>
  );
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

// Prevent "Cannot set property fetch of #<Window> which has only a getter" error
// Some dependencies (like formdata-polyfill via node-fetch) try to override window.fetch
try {
  const originalFetch = window.fetch;
  Object.defineProperty(window, 'fetch', {
    get: () => originalFetch,
    set: (val) => {
      console.warn('Blocked attempt to override window.fetch', val);
    },
    configurable: true,
  });
} catch (e) {
  console.error('Failed to protect window.fetch', e);
}

import App from './App.tsx';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Defensive guard to ensure window.fetch is writable and robust across iframe environments
if (typeof window !== 'undefined') {
  try {
    let currentFetch = window.fetch ? window.fetch.bind(window) : null;
    const desc = Object.getOwnPropertyDescriptor(window, 'fetch') ||
                 Object.getOwnPropertyDescriptor(Object.getPrototypeOf(window), 'fetch');
    if (desc && !desc.writable && !desc.set) {
      Object.defineProperty(window, 'fetch', {
        get: () => currentFetch,
        set: (fn) => { currentFetch = fn; },
        configurable: true,
        enumerable: true,
      });
    }
  } catch (_e) {
    // Non-fatal
  }
}

createRoot(document.getElementById('root')!).render(<App />);

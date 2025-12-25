import { App } from './App.js';
import { SelectLang } from './components/SelectLang.js';
App();
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_caching.js', {
        type: 'module',
      })
      .catch((err) => console.error('Service Worker registration failed', err));
  });
}
window.addEventListener('hashchange', App);
window.addEventListener('change', SelectLang);

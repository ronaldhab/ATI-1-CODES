import { App } from './App.js';
App();
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_caching.js', {
        type: 'module', // <--- Esto es lo que permite usar 'import' dentro del sw.js
      })
      .then((reg) => console.log('Service Worker registered'))
      .catch((err) => console.error('Service Worker registration failed', err));
  });
}
window.addEventListener('hashchange', App);

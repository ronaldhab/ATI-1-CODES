import { NotFound } from '../pages/404.js';

export function ajax() {
  async function Get(url) {
    try {
      //const response = await fetch(url, { cache: 'force-cache' });
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          console.error('El Recurso no fue encontrado (404)');
          NotFound();
          return;
        }
        return new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return {
    Get,
  };
}

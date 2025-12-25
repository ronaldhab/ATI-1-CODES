import { agregarParametroLang, getLanguageInUrl } from '../helpers/language.js';
import { Router } from './Router.js';

export function SelectLang() {
  const selector = document.getElementById('language-filter');

  // Validamos que el elemento exista para evitar errores de tipo "null"
  if (!selector) return;

  selector.addEventListener('click', () => {
    // Usamos un objeto de mapeo para evitar los if/else repetitivos

    const langCode = selector.value;

    // Si el valor existe en nuestro mapa, procedemos
    if (langCode) {
      const currentLang = getLanguageInUrl();

      if (currentLang !== langCode) {
        agregarParametroLang(langCode);
        // El Router se encarga de re-renderizar la vista
        Router();
      }
    }
  });
}

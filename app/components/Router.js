import { Home } from '../pages/Home.js';
import { Perfil } from '../pages/Perfil.js';
import { NotFound } from '../pages/404.js';

import { agregarParametroLang, getLanguageInUrl } from '../helpers/language.js';


export function Router() {

  const lang = getLanguageInUrl() ?? undefined;

  const cookieLang = document.cookie
    .split('; ')
    .find(row => row.startsWith('lang='))
    ?.split('=')[1];

  // Si no hay lang en la URL, pero sí en la cookie, agregarlo a la URL
  if (!lang) {
    agregarParametroLang(cookieLang);
  }

  let { hash } = location;

  const ci = hash.split('/')[2];
  const cantElementos = hash.split('/').length;

  if (!hash || hash === '#/') {
    Home(lang);
  } else if (hash.includes('#/perfil') && ci && cantElementos === 3) {
    
    Perfil(ci, lang);
    
  } else {
    //app.innerHTML = `<h2 style="position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%); font-family: Arial, sans-serif; color: #333;">Página no encontrada 😥</h2>`;
    NotFound();
  }
}

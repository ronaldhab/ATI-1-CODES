
// función para obtener el lenguaje de la URL y cambiar el idioma
function getLanguageInUrl() {
  'use strict';
  let paramsLang = new URLSearchParams(window.location.search);

  return paramsLang.get('lang');
}

/***************************Cambiar idioma*********************************/
function languageMustBeChanged() {
  // Array de idiomas válidos
  const validLangs = ['ES', 'EN', 'PT'];

  const lang = getLanguageInUrl();
  
  if (lang && validLangs.includes(lang.toUpperCase())) {
    // Verificar si el idioma está guardado en el localStorage
    const storedLang = localStorage.getItem('langConfig')
      ? JSON.parse(localStorage.getItem('langConfig')).language
      : null;
    if (storedLang && storedLang.toUpperCase() === lang.toUpperCase()) {
      return false;
    }
    return true;
  }

  // No hay idioma en la URL o no es válido
  return true;
}

// Crea el parametro lang en la url si no existe (usa 'es' por defecto)
function agregarParametroLang(lang='es') {
  const url = new URL(window.location.href);

  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url.toString());
  
}

function getLanguageConfig(lang, config) {
  if (!config) {
    config = localStorage.getItem('langConfig')
      ? JSON.parse(localStorage.getItem('langConfig')).content
      : {};
  } else {
    // Si es necesario cambiar el idioma, guardamos la nueva
    // configuración en el localStorage
    // eliminar configuración previa
    localStorage.removeItem('langConfig');
    localStorage.setItem(
      'langConfig',
      JSON.stringify({ language: lang.toUpperCase(), content: config })
    );
  }

  return config;
}

export {
  agregarParametroLang,
  getLanguageInUrl,
  languageMustBeChanged,
  getLanguageConfig,
};

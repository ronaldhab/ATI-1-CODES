import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';

import api from '../helpers/reto7_api.js';
import { ajax } from '../helpers/ajax.js';
import { 
  languageMustBeChanged, 
  getLanguageConfig } from '../helpers/language.js';
import { Listado } from '../components/Listado.js';
import { buscador } from '../helpers/buscador.js';

export function Home(lang='es') {

  const app = document.getElementById('root');

  (async () => {
    try {
      
      let [estudiantes, config] = await Promise.all([
        ajax().Get(api.STUDENTS), // json con todos los estudiantes
        languageMustBeChanged() ? ajax().Get(api.CONFIG + lang) : Promise.resolve(null), // Petición 2
      ])

      config = getLanguageConfig(lang, config)
      
      //renderizamos home con los datos obtenidos
      app.innerHTML =
        `<main class="contenedor-index">` +
        Header(config) +
        Listado(estudiantes) +
        Footer(config) +
        `</main>`;
      buscador(config, 'index');
      
    } catch (error) {
      // Si cualquiera falla, cae directamente aquí
      console.error('Una de las peticiones falló:', error);
    }

  })();
}

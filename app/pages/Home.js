import { ajax } from '../helpers/ajax.js';
import api from '../helpers/reto7_api.js';
import { Header } from '../components/Header.js';
import { Listado } from '../components/Listado.js';
import { Footer } from '../components/Footer.js';
import { buscador } from '../helpers/buscador.js';

export function Home() {
  const app = document.getElementById('root');

  let { hash } = location;

  (async () => {
    try {
      const lang = hash.split('/')[2];

      const promesas = [
        ajax().Get(api.STUDENTS), // Petición 1
        ajax().Get(api.CONFIG + 'es'), // Petición 2
      ];

      const [estudiantes, config] = await Promise.all(promesas);

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

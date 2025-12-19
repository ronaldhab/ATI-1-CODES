import { ajax } from '../helpers/ajax.js';
import api from '../helpers/reto7_api.js';
import { Header } from '../components/Header.js';
import { Listado } from '../components/Listado.js';
import { Footer } from '../components/Footer.js';
import { buscador } from '../helpers/buscador.js';

export function Home() {
  // const obj = {
  //   siglasUCV: 'UCV',
  //   nombrePag: 'ATI',
  //   periodoTitulo: '2025-2',
  //   saludo: 'Hola',
  //   textoNombreForm: 'Buscar...',
  //   textoBtn: 'Buscar',
  //   no_encontrado: 'No se encontraron resultados para: ',
  // };

  // const copyRight =
  //   'Copyright © 2025 Escuela de computación - ATI. Todos los derechos reservados';

  // ajax()
  //   .Get(api.STUDENTS)
  //   .then((data) => {
  //     app.innerHTML =
  //       `<main class="contenedor-index">` +
  //       Header(obj) +
  //       Listado(data) +
  //       Footer(copyRight) +
  //       `</main>`;
  //     buscador(obj, 'index');
  //   });

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

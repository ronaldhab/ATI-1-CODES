import { Home } from '../pages/Home.js';
import { Perfil } from '../pages/Perfil.js';

export function Router() {
  const app = document.getElementById('root');

  const obj = {
    siglasUCV: 'UCV',
    nombrePag: 'ATI',
    periodoTitulo: '2025-2',
    saludo: 'Hola',
    textoNombreForm: 'Buscar...',
    textoBtn: 'Buscar',
    no_encontrado: 'No se encontraron resultados para: ',
  };

  const copyRight =
    'Copyright © 2025 Escuela de computación - ATI. Todos los derechos reservados';

  const detalle = {
    ci: '29567199',
    imagen: '29567199/29567199Pequena.jpg',
    nombre: 'Ronald Herrera',
  };

  let { hash } = location;

  if (!hash || hash === '#/') {
    Home();
  } else if (hash.includes('#/perfil')) {
    const ci = hash.split('/')[2];
    Perfil(ci);
  } else {
    app.innerHTML = `<h2 style="position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%); font-family: Arial, sans-serif; color: #333;">Página no encontrada 😥</h2>`;
  }
}

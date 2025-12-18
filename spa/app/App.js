import { Footer } from './components/Footer.js';
import { Header } from './components/Header.js';
import { Listado } from './components/Listado.js';

export function App() {
  const app = document.getElementById('root');

  const obj = {
    siglasUCV: 'UCV',
    nombrePag: 'ATI',
    periodoTitulo: '2025-2',
    saludo: 'Hola',
    textoNombreForm: 'Buscar...',
    textoBtn: 'Buscar',
  };

  const copyRight =
    'Copyright © 2025 Escuela de computación - ATI. Todos los derechos reservados';

  const estudiantes = [
    {
      ci: '29567199',
      imagen: '/29567199/29567199Pequena.jpg',
      nombre: 'Ronald Herrera',
    },
    {
      ci: '19371273',
      imagen: '/19371273/19371273.jpg',
      nombre: 'Raquel Escalante Salazar',
    },
    {
      ci: '18829705',
      imagen: '/18829705/18829705.jpg',
      nombre: 'Leopoldo Enrique Izquierdo Carias',
    },
    {
      ci: '18819509',
      imagen: '/18819509/18819509.jpg',
      nombre: 'Darwin R. Guaimacuto N.',
    },
  ];

  const perfil = {
    nombre: 'Ronald Herrera',
    descripcion:
      'Estudiante de la licenciatura de computación de la UCV. Apasionado por el mundo de las redes y el desarrollo web. Actualmente me encuentro ampliando mis conocimientos y habilidades en estas áreas para poder llevar a cabo proyectos futuros.',
    color: 'Morado',
    libro: ['Harry Potter'],
    musica: ['Rock alternativo'],
    video_juego: ['Baldurs Gate 3 y The Witcher 3.'],
    lenguajes: ['c++', 'python', 'java', 'javascript'],
    email: 'ronald.alfredo.hb@gmail.com',
    ci: '29567199',
    genero: 'masculino',
    fecha_nacimiento: '07/03/2002',
  };

  app.innerHTML =
    `<main class="contenedor-index">` +
    Header(obj) +
    Listado(estudiantes) +
    Footer(copyRight) +
    `</main>`;
}

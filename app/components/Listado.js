import { Card } from './Card.js';

export function Listado(estudiantes) {
  // Si existe, lo parseamos; si no, creamos un arreglo vacío
  const existeImgs = !!sessionStorage.getItem('imagenes');

  const imagenes = existeImgs
    ? JSON.parse(sessionStorage.getItem('imagenes'))
    : {};

  const $section = document.createElement('section');
  $section.classList.add('seccion-estudiantes');
  $section.innerHTML = `<p class="mensaje-no-encontrado filter"></p>`;

  const $ul = document.createElement('ul');
  $ul.classList.add('lista-estudiantes');

  const $div = document.createElement('div');

  let cardsHTML = '';

  estudiantes.forEach((perfilCard) => {
    if (!existeImgs) {
      imagenes[perfilCard['ci']] = perfilCard['imagen'];
    }
    cardsHTML += Card(perfilCard, 'es');
  });

  if (!existeImgs) {
    sessionStorage.setItem('imagenes', JSON.stringify(imagenes));
  }

  $ul.innerHTML = cardsHTML;

  $section.appendChild($ul);

  $div.appendChild($section);

  return $div.innerHTML;
}

import { Card } from './Card.js';

export function Listado(estudiantes) {
  const obj = {
    ci: '29567199',
    imagen: '/29567199/29567199Pequena.jpg',
    nombre: 'Ronald Herrera',
  };

  const $section = document.createElement('section');
  $section.classList.add('seccion-estudiantes');

  const $ul = document.createElement('ul');
  $ul.classList.add('lista-estudiantes');

  const $div = document.createElement('div');

  let cardsHTML = '';

  estudiantes.forEach((perfilCard) => {
    cardsHTML += Card(perfilCard, 'es');
  });

  $ul.innerHTML = cardsHTML;

  $section.appendChild($ul);

  $div.appendChild($section);

  return $div.innerHTML;
}

export function Card(perfilCard) {
  return `<div class="card-estudiante" data-nombre="${perfilCard.nombre}">
              <div class="card-img-container">
              <a href="#/perfil/${perfilCard['ci']}">
              <picture>
                  <source media="(max-width: 769px)" srcset="public/${
                    perfilCard['imagen']
                  }" />
                  <source media="(min-width: 770px)" srcset="public/${perfilCard[
                    'imagen'
                  ]
                    .replace('Pequena.jpg', 'Grande.jpg')
                    .trim()}" />
                  <img
                    class="img-card-estudiante"
                    src="public/${perfilCard['imagen']}"
                    alt="imagen de Estudiante"
                  />
                </picture>
                <span class="nombre-estudiante"> ${perfilCard['nombre']}</span>
                </a>
              </div>
            </div>`;
}

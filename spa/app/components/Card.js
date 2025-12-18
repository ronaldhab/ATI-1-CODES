export function Card(perfilCard, langPerfil){
  return `<div class="card-estudiante" data-nombre="${
        perfilCard.nombre
      }">
              <div class="card-img-container">
              <a href="/perfil.html?lang=${langPerfil}&cedula=${perfilCard['ci']}">
              <picture>
                  <source media="(max-width: 769px)" srcset="${
                    perfilCard['imagen']
                  }" />
                  <source media="(min-width: 770px)" srcset="${perfilCard['imagen']
                    .replace('Pequena.jpg', 'Grande.jpg')
                    .trim()}" />
                  <img
                    class="img-card-estudiante"
                    src="${perfilCard['imagen']}"
                    alt="imagen de Estudiante"
                  />
                </picture>
                <span class="nombre-estudiante"> ${perfilCard['nombre']}</span>
                </a>
              </div>
            </div>`
}
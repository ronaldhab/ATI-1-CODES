export function Header(data) {
  return `<header>
        <nav>
          <ul class="ul-nav">
            <li class="li-logo">
              <div class="logo-texto">
                <p id="nombre-pag">${data['sitio'][0]}</p>
                <span class="logo-texto-UCV">${data['sitio'][1]}</span>
                <p id="periodo">${data['sitio'][2]}</p>
              </div>
            </li>
            <li class="li-saludo-nombre">
              <p class="saludo-texto">
                <span id="saludo">${data['saludo']}</span>, Ronald
              </p>
            </li>
            <li class="li-busqueda">
              <div class="form-contenedor">
                <form class="form-busqueda-nombre">
                  <input
                    class="buscador"
                    data-lang="nombre"
                    id="input-nombre"
                    type="search"
                    placeholder="${data['buscar']}..."
                    aria-label="Buscar en el sitio"
                  />

                  <input
                    data-lang="buscar"
                    class="btn-buscar"
                    type="submit"
                    value="${data['buscar']}"
                  />
                </form>
              </div>
            </li>
          </ul>
        </nav>
      </header>`;
}

import { getStudentsImages } from "../helpers/getStudentsImages.js";

export async function CardDetail(perfil, lang) {

  let imagenes = sessionStorage.getItem('imagenes')
    ? JSON.parse(sessionStorage.getItem('imagenes'))
    : undefined;

  if (!imagenes) {
    imagenes = await getStudentsImages(); 
  }
  
  const contactoCompleto = lang['email'].split(/(?=\[email\])/);
  let textoContacto = contactoCompleto[0];

  return `<div class="boton-regresar-contenedor">
      <a class="boton-regresar" href="#/">${lang['home']}</a>
    </div>
  <main class="contenedor-perfil">
      <div class="img-contenedor">
        <picture>
          <source
            id="source-pequena-perfil"
            media="(max-width: 768px)"
            srcset="public/${imagenes[`${perfil['ci']}`]}"
          />
          <source
            id="source-grande-perfil"
            media="(min-width: 769px)"
            srcset="public/${imagenes[`${perfil['ci']}`]}"
          />
          <img class="estudiante-img" src="public/${
            imagenes[`${perfil['ci']}`]
          }" alt="Imagen de ${perfil.nombre}" />
        </picture>
      </div>
      <div class="estudiante-info">
        <h1 class="estudiante-nombre">${perfil['nombre']}</h1>
        <div class="estudiante-descripcion-contenedor">
          <p class="estudiante-descripcion">${perfil['descripcion']}</p>
        </div>
        <div class="estudiante-intereses-contenedor">
          <table class="estudiante-intereses">
            <tr>
              <td id="color">${lang['color']}</td>
              <td id="respuesta-color">${perfil['color']}</td>
            </tr>
            <tr>
              <td data-lang="libro" id="libro">${lang['libro']}</td>
              <td id="respuesta-libro">${perfil['libro']}</td>
            </tr>
            <tr>
              <td data-lang="musica" id="musica">${lang['musica']}</td>
              <td id="respuesta-musica">${perfil['musica']}</td>
            </tr>
            <tr>
              <td data-lang="videojuego" id="videojuego">${
                lang['video_juego']
              }</td>
              <td id="respuesta-videojuego">${perfil['video_juego']}</td>
            </tr>
            <tr>
              <td><strong id="lenguajes">${lang['lenguajes']}</strong></td>
              <td><strong id="respuesta-lenguajes">${
                perfil['lenguajes']
              }</strong></td>
            </tr>
          </table>
        </div>
        <footer class="footer-perfil">
          <table class="contacto">
            <tr>
              <td id="texto-contacto">${textoContacto} ${perfil['email']}</td>
              <td>
                <a class="contacto-enlace" href=mailto:${
                  perfil['email']
                }?subject=Contacto desde el perfil&body=Hola%20${
    perfil['nombre']
  }%2C%0A%0AMe%20gustar%C3%ADa%20ponerme%20en%20contacto%20contigo.></a>
              </td>
            </tr>
          </table>
        </footer>
      </div>
    </main>`

  
}

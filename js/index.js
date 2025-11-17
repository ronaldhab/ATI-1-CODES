window.onload = function () {
  /***************************Configuraciones***************************/
  const [nombre, siglas, periodo] = config['sitio'];
  tituloIndex = nombre + siglas + ' ' + periodo;

  const contactoCompleto = config['email'].split(/(?=\[email\])/);
  let textoContacto = contactoCompleto[0];
  let enlaceContacto = contactoCompleto[1];

  // Index.html conf
  let nombrePag = document.getElementById('nombre-pag');
  let siglasUCV = document.getElementsByClassName('logo-texto-UCV')[0];
  let periodoTitulo = document.getElementById('periodo');
  let saludo = document.getElementById('saludo');
  let copyright = document.getElementById('copyright');
  let textoNombreForm = document.getElementById('input-nombre');
  let textoBtn = document.getElementsByClassName('btn-buscar')[0];

  // Perfil.html conf
  let nombreEstudiante =
    document.getElementsByClassName('estudiante-nombre')[0];
  let descipcionEstudiante = document.getElementsByClassName(
    'estudiante-descripcion'
  )[0];
  let color = document.getElementById('color');
  let musica = document.getElementById('musica');
  let libro = document.getElementById('libro');
  let videojuego = document.getElementById('videojuego');
  let lenguajes = document.getElementById('lenguajes');
  let contacto = document.getElementById('texto-contacto');
  let enlace = document.getElementsByClassName('contacto-enlace')[0];

  /*-----Validaciones-----*/
  // Index.html
  nombrePag && (nombrePag.innerHTML = nombre);
  nombrePag && (document.title = tituloIndex);
  siglasUCV && (siglasUCV.innerHTML = siglas);
  periodoTitulo && (periodoTitulo.innerHTML = periodo);
  saludo && (saludo.innerHTML = config['saludo']);
  copyright && (copyright.innerHTML = config['copyRight']);
  textoNombreForm && (textoNombreForm.placeholder = config['nombre'] + '...');
  textoBtn && (textoBtn.value = config['buscar']);

  // Perfil.html
  nombreEstudiante && (nombreEstudiante.innerHTML = config['nombre']);
  descipcionEstudiante &&
    (descipcionEstudiante.innerHTML = config['descripcion']);
  color && (color.innerHTML = config['color']);
  musica && (musica.innerHTML = config['musica']);
  libro && (libro.innerHTML = config['libro']);
  videojuego && (videojuego.innerHTML = config['video_juego']);
  lenguajes && (lenguajes.innerHTML = config['lenguajes']);
  contacto && (contacto.innerHTML = textoContacto);
  enlace && (enlace.innerHTML = enlaceContacto);

  /*----------------------------*/
  /****************************************************************************/

  /****************Lista dinámica de estudiantes*******************************/
  if (nombrePag) {
    const ul = document.querySelector('.lista-estudiantes');
    perfiles.forEach((perfilCard) => {
      const li = document.createElement('li');
      li.className = 'card';
      li.innerHTML = `<div class="card-estudiante" data-nombre="${
        perfilCard.nombre
      }">
              <div class="card-img-container">
              <a href="/perfil.html?cedula=${perfilCard.ci}">
              <picture>
                  <source media="(max-width: 769px)" srcset="${
                    perfilCard.imagen
                  }" />
                  <source media="(min-width: 770px)" srcset="${perfilCard.imagen
                    .replace('Pequena.jpg', 'Grande.jpg')
                    .trim()}" />
                  <img
                    class="img-card-estudiante"
                    src="${perfilCard.imagen}"
                    alt="imagen de Estudiante"
                  />
                </picture>
                <span class="nombre-estudiante"> ${perfilCard.nombre}</span>
                </a>
              </div>
            </div>`;
      ul.appendChild(li);
    });
  }

  /****************************************************************************/

  /**********************Perfiles dinamicos************************************/
  if (nombreEstudiante != null) {
    nombreEstudiante.innerHTML = perfil['nombre'];
    descipcionEstudiante.innerHTML = perfil['descripcion'];

    let respColor = document.getElementById('respuesta-color');
    let respLibro = document.getElementById('respuesta-libro');
    let respMusica = document.getElementById('respuesta-musica');
    let respvideoJuego = document.getElementById('respuesta-videojuego');
    let respLenguajes = document.getElementById('respuesta-lenguajes');
    let sourcePequena = document.getElementById('source-pequena-perfil');
    let sourceGrande = document.getElementById('source-grande-perfil');
    let imgPerfil = document.getElementsByClassName('estudiante-img')[0];

    respColor.innerHTML = perfil['color'];
    respLibro.innerHTML = perfil['libro'];
    respMusica.innerHTML = perfil['musica'];
    respvideoJuego.innerHTML = perfil['video_juego'];
    respLenguajes.innerHTML = perfil['lenguajes'].join(', ');
    enlace.innerHTML = perfil['email'];
    enlace.href = `mailto:${perfil['email']}?subject=Contacto desde el perfil&body=Hola%20${perfil['nombre']}%2C%0A%0AMe%20gustar%C3%ADa%20ponerme%20en%20contacto%20contigo.`;

    let urlImg = perfiles.find((elem) => elem.ci === perfil['ci']).imagen;

    if (perfil['ci'] === '29567199') {
      sourcePequena.srcset = `${perfil['ci']}/${perfil['ci']}Pequena.jpg`;
      sourceGrande.srcset = `${perfil['ci']}/${perfil['ci']}Grande.jpg`;
    }

    imgPerfil.src = urlImg;
    imgPerfil.alt = `imagen de ${perfil['nombre']}`;
  }
};

// Función para crear el script del json
function detallesPerfil() {
  let params = new URLSearchParams(document.location.search);
  let cedula = params.get('cedula');
  if (!cedula) return;
  const url = `${cedula}/perfil.json`;
  const jsonFileScript = document.createElement('script');
  jsonFileScript.src = url;
  jsonFileScript.type = 'text/javascript';
  jsonFileScript.defer = true;
  document.head.appendChild(jsonFileScript);

  console.log();
}

detallesPerfil();

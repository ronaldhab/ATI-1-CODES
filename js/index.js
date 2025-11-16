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
let nombreEstudiante = document.getElementsByClassName('estudiante-nombre')[0];
let descipcionEstudiante = document.getElementsByClassName(
  'estudiante-descipcion'
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

/*****Lista dinámica de estudiantes******/

const ul = document.querySelector('.lista-estudiantes');
perfiles.forEach((perfil) => {
  const li = document.createElement('li');
  li.className = 'card';
  li.innerHTML = `<div class="card-estudiante" data-nombre="${perfil.nombre}">
              <div class="card-img-container">
              <picture>
                  <source media="(max-width: 769px)" srcset="${
                    perfil.imagen
                  }" />
                  <source media="(min-width: 770px)" srcset="${perfil.imagen
                    .replace('Pequena.jpg', 'Grande.jpg')
                    .trim()}" />
                  <img
                    class="img-card-estudiante"
                    src="${perfil.imagen}"
                    alt="imagen de Estudiante"
                  />
                </picture>
                <span class="nombre-estudiante"> ${perfil.nombre}</span>
              </div>
            </div>`;
  ul.appendChild(li);
});
/******************************************/

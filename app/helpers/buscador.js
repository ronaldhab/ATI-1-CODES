export function buscador(config) {
  const cartas = document.querySelectorAll('.card-estudiante');
  const mensajeNoEncontrado = document.querySelector('.mensaje-no-encontrado');

  // Funcion para eliminar acentos
  const normalizar = (texto) => {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.buscador')) {
      const textoBusqueda = normalizar(e.target.value.trim());
      let cartasVisibles = 0; // 1. Iniciamos el contador

      cartas.forEach((carta) => {
        const coincide = normalizar(carta.textContent).includes(textoBusqueda);

        if (coincide) {
          carta.classList.remove('filter');
          cartasVisibles++; // 2. Si coinciden los strings, sumamos 1 al contador
        } else {
          carta.classList.add('filter');
        }
      });

      // 3. Verificamos el contador al final del ciclo
      if (cartasVisibles === 0) {
        //--->Si no hay coincidencias se muestra el mensaje
        mensajeNoEncontrado.textContent =
          config['no_encontrado'] + textoBusqueda;

        mensajeNoEncontrado.classList.remove('filter');
      } else {
        //--->Si hay coincidencias se oculta el mensaje
        mensajeNoEncontrado.classList.add('filter');
      }
    }
  });

  // Selección del input search
  let inputBuscador = document.querySelector('.buscador');

  inputBuscador.addEventListener('input', (e) => {
    //--->Capturamos el evento input para mostrar las cards de los estudiantes nuevamente
    if (e.target.value.trim() === '') {
      mensajeNoEncontrado.classList.add('filter');

      cartas.forEach((carta) => {
        carta.classList.remove('filter');
      });
    }
  });
}

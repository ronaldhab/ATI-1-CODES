import { ajax } from './ajax.js';
import api from './reto7_api.js';

export function getStudentsImages() {
  const existeImgs = !!sessionStorage.getItem('imagenes');
  const imagenes = {}
  
  if (existeImgs) {
    imagenes = JSON.parse(sessionStorage.getItem('imagenes'));
    return imagenes;
  } else {
    return ajax().Get(api.STUDENTS)
    .then((estudiantes) => {
        estudiantes.forEach((estudiante) => {
        if (!imagenes[estudiante['ci']]) {
          imagenes[estudiante['ci']] = estudiante['imagen'];
        }
      })
      sessionStorage.setItem('imagenes', JSON.stringify(imagenes)); 

      return imagenes
 })
  }
}
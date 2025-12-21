import { ajax } from '../helpers/ajax.js';
import api from '../helpers/reto7_api.js';
import { CardDetail } from '../components/CardDetail.js';

export function Perfil(cedula) {
  const app = document.getElementById('root');

  let { hash } = location;

  (async () => {
    try {
      const lang = hash.split('/')[2];

      const promesas = [
        ajax().Get(api.PROFILE + cedula), // Petición 1
        ajax().Get(api.CONFIG + 'es'), // Petición 2
      ];

      const [data, config] = await Promise.all(promesas);

      //renderizamos home con los datos obtenidos
      app.innerHTML = CardDetail(data, config);
    } catch (error) {
      // Si cualquiera falla, cae directamente aquí
      console.error('Una de las peticiones falló:', error);
    }
  })();
}

import { CardDetail } from '../components/CardDetail.js';
import { ajax } from '../helpers/ajax.js';
import api from '../helpers/reto7_api.js';
import { 
  getLanguageConfig, 
  languageMustBeChanged } from '../helpers/language.js';

export function Perfil(cedula, lang='es') {
  const app = document.getElementById('root');

  (async () => {
    try {
      
      let [data, config] = await Promise.all([
        ajax().Get(api.PROFILE + cedula), // Petición 1
        languageMustBeChanged() ? ajax().Get(api.CONFIG + lang) : Promise.resolve(null)
      ])

      config = getLanguageConfig(lang, config)

      //renderizamos home con los datos obtenidos
      app.innerHTML = await CardDetail(data, config);
      
    } catch (error) {
      // Si cualquiera falla, cae directamente aquí
      console.error('Una de las peticiones falló:', error);
    }
  })();
}

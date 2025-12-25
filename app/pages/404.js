export const NotFound = () => {
  const app = document.getElementById('root');

  app.innerHTML = `<main class="contenedor-index">  
               <div class="not-found-container">
                    <h2 class="not-found-h2">
                        <span class="not-found-span">404</span>
                        <br>P&aacute;gina no encontrada
                    </h2>
                    <div class="not-found-btn-container">
                        <p class="not-found-btn-text">La página que buscas no existe o ha sido movida.</p>
                        <a class="not-found-btn-link" href="#/">Volver al inicio</a>
                    </div>
                </div>
            </main>`;
};

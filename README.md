# ATI-1-CODES

## Reto - 07

_Ejecutar el siguiente comando en el directorio "raiz" del proyecto donde esta index.html_

_Asegurarse de tener los archivos "index.py" y "mod-wsgi.conf" en este directorio_

###### Para crear la imagen

docker build -t contenedor_ronald .

###### Para correr el contenedor

docker run -d -p 8080:80 --name ronald_ati contenedor_ronald

## Manejo de la memoria caché

Para evitar la sobrecarga de llamadas fetch al servidor en la SPA, se hizo uso de un **Service Worker**, el cual intercepta las peticiones y carga directamente el contenido desde la caché (en caso de que se encuentre almacenado allí).

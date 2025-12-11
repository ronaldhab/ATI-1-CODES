# 1. Usamos la imagen base oficial de Ubuntu con Apache preinstalado
FROM ubuntu/apache2:latest

# 2. Actualizamos Ubuntu e instalamos nano para revisar archivos y editarlos si es necesario
RUN apt-get update && \
    apt-get install nano -y && \
    apt-get clean

# 3. Copiamos todo el conntenido del directorio . a /var/www/html/
COPY . /var/www/html/

# 4. Abrimos el puerto 80
EXPOSE 80

# 5. Comando de arranque
CMD ["apachectl", "-D", "FOREGROUND"]
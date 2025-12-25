FROM ubuntu

RUN apt-get update && apt-get install -y \
	python3 python3-venv \
	&& apt install apache2 apache2-utils ssl-cert libapache2-mod-wsgi-py3 -y

RUN a2enmod wsgi

WORKDIR /var/www/html/ATI

# COPY ./index.py .

COPY . .

WORKDIR /etc/apache2/conf-available/

# Agregue la siguiente línea al archivo mod-wsgi.conf
# WSGIScriptAlias /wsgi /var/www/html/app.py  
COPY ./mod-wsgi.conf .

RUN a2enconf mod-wsgi

RUN apachectl restart

# Exponer puerto (80)
EXPOSE 80

# Comando para iniciar Apache (o mod_wsgi-express)
CMD ["apache2ctl", "-D", "FOREGROUND"]

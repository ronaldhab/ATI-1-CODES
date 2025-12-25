import os
import datetime
from urllib.parse import quote
import json

def expensive_query(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    return json.dumps(data).encode('utf-8')
    

def application(environ, start_response):
    
    # Obtener la ruta solicitada
    path = environ.get('PATH_INFO', '/')
    
    safe_path = quote(path)
    
    id_busqueda = None
    prefix = '/api/search/'

    # Directorio donde se encuentran tus archivos (ajusta según tu servidor)
    base_dir = os.path.dirname(__file__)

    if path.startswith('/api/search/'):
        cedula = path[len('/api/search/'):]
        
        if cedula:
            
            try:
                data = json.loads(get_file_content(os.path.join(base_dir, 'public', cedula, 'perfil.json'), mode='r'))
                
                status = '200 OK'
                content = json.dumps(data).encode('utf-8')
                
            except FileNotFoundError:
                status = '404 Not Found'
                content = json.dumps({"error": str(f"La cedula {cedula} no esta registrada en el sistema.")}).encode('utf-8')
            
        else:
            status = '400 Bad Request'
            content = json.dumps({"error": "Debe indicar el numero de cédula."}).encode('utf-8')

        headers = [
            ('Content-Type', 'application/json; charset=utf-8'),
            ('Content-Length', str(len(content))),
        ]   

    elif path.startswith('/api/config/'):
        idioma = path[len('/api/config/'):]
        cookie_header = ''

        if idioma:
            
            try:
                data = json.loads(get_file_content(os.path.join(base_dir, 'data', 'conf', f'config{idioma.upper()}.json'), mode='r'))
                content = json.dumps(data).encode('utf-8')
                
                max_age = 60 * 60 * 24 * 5  # 5 dias
                cookie_header = f'lang={idioma}; Path=/; Max-Age={max_age}; SameSite=Lax;'
                status = '200 OK'
                
            except FileNotFoundError:
                status = '404 Not Found'
                content = json.dumps({"error": str(f"El idioma {idioma} no existe en el sistema.")}).encode('utf-8')
            
        else:
            status = '400 Bad Request'
            content = json.dumps({"error": "Debe indicar el idioma a cambiar."}).encode('utf-8')

        if cookie_header != '':
            headers = [
                ('Content-Type', 'application/json; charset=utf-8'),
                ('Content-Length', str(len(content))),
                ('Set-Cookie', cookie_header)
            ]
        else:
            headers = [
                ('Content-Type', 'application/json; charset=utf-8'),
                ('Content-Length', str(len(content))),
            ]

    elif path == '/' or path == '':
        try:
            content = get_file_content(os.path.join(base_dir, 'index.html'), mode='rb')
            status = '200 OK'
            # date = datetime.datetime.utcnow() + datetime.timedelta(days=10)
            # expires = date.strftime("%a, %d %b %Y %H:%M:%S GMT")
            # cookie_header = f'lang=ES; Path=/ATI; SameSite=Lax; expires={expires}'
            headers = [('Content-Type', 'text/html; charset=utf-8')]
            
        except FileNotFoundError:
            status = '404 NOT FOUND'
            content = b"Archivo no encontrado."
            headers = [('Content-Type', 'text/plain')]
        
    elif path == '/api/students':
        try:
            data = json.loads(get_file_content(os.path.join(base_dir, 'data', 'index.json'), mode='r'))
            content = json.dumps(data).encode('utf-8')
            status = '200 OK'

            headers = [
                ('Content-Type', 'application/json; charset=utf-8'),
                ('Content-Length', str(len(content))),
            ]
            
        except FileNotFoundError:
            status = '404 Not Found'
            content = b"El recurso solicitado no se encuentra."
            headers = [('Content-Type', 'text/plain')]
            
        except Exception as e:
            content = json.dumps({"error": str(e)}).encode('utf-8')
            headers = [
                ('Content-Type', 'application/json; charset=utf-8'),
                ('Content-Length', str(len(content))),
            ]
            status = '500 Internal Server Error'
    
    else:
        status = '404 NOT FOUND'
        content = json.dumps({"error": "El recurso solicitado no puede ser localizado."}).encode('utf-8')

        headers = [
            ('Content-Type', 'application/json; charset=utf-8'),
            ('Content-Length', str(len(content))),
        ]
      
      
    # Enviar respuesta
    start_response(status, headers)
    return [content]


# Funcion utilitaria para leer y retornar el contenido de un archivo (normalmente será html o json)
def get_file_content(file_path, mode='rb'):
    
    if not os.path.exists(file_path):
        raise FileNotFoundError

    with open(file_path, mode, encoding='utf-8' if mode == 'r' else None) as f:
        return f.read()



# def not_found_response(start_response):
#     status = '404 NOT FOUND'
#     content = b"El recurso solicitado no se encuentra."
#     headers = [('Content-Type', 'text/plain')]
#     start_response(status, headers)
#     return [content]
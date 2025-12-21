import os
from urllib.parse import quote
import json

def application(environ, start_response):
    
    # Obtener la ruta solicitada
    path = environ.get('PATH_INFO', '/')
    
    safe_path = quote(path)
    cookie_header = f'ati={safe_path}; Path=/ATI; SameSite=Lax'
    
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
            ('Set-Cookie', cookie_header)
        ]   

    elif path.startswith('/api/config/'):
        idioma = path[len('/api/config/'):]
        
        if idioma:
            
            try:
                data = json.loads(get_file_content(os.path.join(base_dir, 'data', 'conf', f'config{idioma.upper()}.json'), mode='r'))
                
                status = '200 OK'
                content = json.dumps(data).encode('utf-8')
                
            except FileNotFoundError:
                status = '404 Not Found'
                content = json.dumps({"error": str(f"El idioma {idioma} no existe en el sistema.")}).encode('utf-8')
            
        else:
            status = '400 Bad Request'
            content = json.dumps({"error": "Debe indicar el idioma a cambiar."}).encode('utf-8')

        headers = [
            ('Content-Type', 'application/json; charset=utf-8'),
            ('Content-Length', str(len(content))),
            ('Set-Cookie', cookie_header)
        ]

    elif path == '/' or path == '':
        try:
            content = get_file_content(os.path.join(base_dir, 'index.html'), mode='rb')
            status = '200 OK'
            headers = [('Content-Type', 'text/html; charset=utf-8'), ('Set-Cookie', cookie_header)]
        except FileNotFoundError:
            status = '404 NOT FOUND'
            content = b"Archivo no encontrado."
            headers = [('Content-Type', 'text/plain')]
        
    
    elif path == '/nuevo/todos':
        try:
            with open(os.path.join(base_dir, 'nuevo.html'), 'rb') as f:
                content = f.read()
            status = '200 OK'
            headers = [('Content-Type', 'text/html; charset=utf-8'), ('Set-Cookie', cookie_header)]
        except FileNotFoundError:
            status = '404 NOT FOUND'
            content = b"El recurso solicitado no se encuentra."
            headers = [('Content-Type', 'text/plain')]
    
    elif path == '/reto-ronald':
        try:
            with open(os.path.join(base_dir, 'reto-ronald', 'spa', 'pa.html'), 'rb') as f:
                content = f.read()
            status = '200 OK'
            headers = [('Content-Type', 'text/html; charset=utf-8')]
        except FileNotFoundError:
            status = '404 NOT FOUND'
            content = b"El recurso solicitado no se encuentra."
            headers = [('Content-Type', 'text/plain')]
        
    elif path == '/api/students':
        try:
            with open(os.path.join(base_dir, 'data', 'index.json'), 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            status = '200 OK'
            content = json.dumps(data).encode('utf-8')
            headers = [
                ('Content-Type', 'application/json; charset=utf-8'),
                ('Content-Length', str(len(content))),
                ('Set-Cookie', cookie_header)
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
                ('Set-Cookie', cookie_header)
            ]
            status = '500 Internal Server Error'
    
    else:
        status = '404 NOT FOUND'
        try:
            with open(os.path.join(base_dir, 'mipagina404.html'), 'rb') as f:
                content = f.read()
            #status = '200 OK'
            headers = [('Content-Type', 'text/html; charset=utf-8')]
            
        except FileNotFoundError:
            status = '404 NOT FOUND'
            content = b"El recurso solicitado no se encuentra."
            headers = [('Content-Type', 'text/plain')]
      
      
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
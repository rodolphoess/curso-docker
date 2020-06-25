import logging
import http.server
import socketserver
import getpass

# Criacao de um servidor que devolvera a pagina index a partir desse servidor escrito abaixo. Para isso foi herdado da classe SimpleHTTPRequestHandler e sobrescrito o metodo log_message.
class MyHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        logging.info("%s - - [%s] %s\n"% (
            self.client_address[0],
            self.log_date_time_string(),
            format%args
        ))

logging.basicConfig(
    filename='/log/http-server.log', # Arquivo que sera usado para logar
    format='%(asctime)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

logging.getLogger().addHandler(logging.StreamHandler())
logging.info('inicializando...')
PORT = 8000

httpd = socketserver.TCPServer(("", PORT), MyHTTPHandler)
logging.info('escutando a porta: %s', PORT)
logging.info('usuario: %s', getpass.getuser())
httpd.serve_forever()

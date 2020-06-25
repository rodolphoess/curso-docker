# A partir das layers do nginx
FROM nginx:latest

# Cria-se uma nova layer indicando o mantenedor
LABEL maintainer 'Rodolpho rodolphoess@gmail.com'

# Nova layer aonde escrevera o conteudo apos do echo dentro do arquivo especificado no path. Esse arquivo conteudo.html sera acessado atraves do index.html
RUN echo '<h1>Sem conteudo</h1>' > /usr/share/nginx/html/conteudo.html

# Nova layer aonde copia qualquer arquivo .html que esteja na pasta do Dockerfile, e esse arquivo sera copiado e enviado para o path especificado no path
COPY *.html /usr/share/nginx/html/
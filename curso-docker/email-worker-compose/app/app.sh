#!/bin/sh

# Instala dependências que serão usadas na aplicação .py
pip install bottle==0.12.13 psycopg2==2.7.1 redis==2.10.5

# Chama o código em python para subir o serviço
python -u sender.py
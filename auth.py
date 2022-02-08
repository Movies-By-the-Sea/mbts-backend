import os
from dotenv import load_dotenv
from flask import request

load_dotenv('./.env')

def auth_request():
    try:
        return request.headers['Auth'] == os.getenv('KEY')
    except KeyError:
        return False
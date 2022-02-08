import os
from flask import request

def auth_request():
    try:
        return request.headers['auth'] == os.getenv('KEY')
    except KeyError:
        return False
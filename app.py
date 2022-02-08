from flask import Flask
from dotenv import load_dotenv

from controller.movies import movie_url

load_dotenv('../config/.env')

app = Flask(__name__)
app.register_blueprint(movie_url)

if __name__ == '__main__':
    app.run(debug=True)
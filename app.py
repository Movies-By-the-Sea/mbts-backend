from model import Model
from flask import Flask

from auth import auth_request

app = Flask(__name__)

@app.route("/")
def test(): return '<h1>Server Running</h1>'

@app.route("/latest")
def get_latest_reviewed(): return Model.get_latest_reviewed(auth_request())

@app.route("/must-watch")
def get_must_watch(): return Model.get_must_watch(auth_request())

@app.route("/netflix")
def get_netflix_films(): return Model.get_netflix_films(auth_request())

@app.route("/amazon-prime")
def get_prime_films(): return Model.get_prime_films(auth_request())

@app.route("/foreign")
def get_foreign_films(): return Model.get_foreign_films(auth_request())

@app.route("/animated")
def get_animated_films(): return Model.get_animated_films(auth_request())

@app.route("/true-story")
def get_true_story_films(): return Model.get_true_story_films(auth_request())

@app.route("/meta")
def get_meta_films(): return Model.get_meta_films(auth_request())

@app.route("/horror")
def get_horror_films(): return Model.get_horror_films(auth_request())

@app.route("/indie")
def get_indie_films(): return Model.get_indie_films(auth_request())

@app.route("/drama")
def get_drama_films(): return Model.get_drama_films(auth_request())

@app.route("/mystery")
def get_mystery_films(): return Model.get_mystery_films(auth_request())

@app.route("/sci-fi")
def get_scifi_films(): return Model.get_scifi_films(auth_request())

@app.route("/lighthearted")
def get_lighthearted_films(): return Model.get_lighthearted_films(auth_request())

@app.route("/romance")
def get_romance_films(): return Model.get_romance_films(auth_request())

@app.route("/action")
def get_action_films(): return Model.get_action_films(auth_request())

if __name__ == '__main__':
    app.run(debug=True)
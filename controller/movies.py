import model.movies as Model

from .auth import auth_request
from controller import movie_url

@movie_url.route("/")
def test(): return '<h1>Server Running</h1>'

@movie_url.route("/latest")
def get_latest_reviewed(): return Model.get_latest_reviewed(auth_request())

@movie_url.route("/motd")
def get_motd(): return Model.get_motd(auth_request())

@movie_url.route("/must-watch")
def get_must_watch(): return Model.get_boolean_values(auth_request(), "Must Watch")

@movie_url.route("/netflix")
def get_netflix_films(): return Model.get_boolean_values(auth_request(), "Netflix")

@movie_url.route("/amazon-prime")
def get_prime_films(): return Model.get_boolean_values(auth_request(), "Prime")

@movie_url.route("/foreign")
def get_foreign_films(): return Model.get_boolean_values(auth_request(), "Foreign")

@movie_url.route("/animated")
def get_animated_films(): return Model.get_films_by_genre(auth_request(), "Animated")

@movie_url.route("/true-story")
def get_true_story_films(): return Model.get_films_by_genre(auth_request(), "True Story")

@movie_url.route("/meta")
def get_meta_films(): return Model.get_films_by_genre(auth_request(), "Meta")

@movie_url.route("/horror")
def get_horror_films(): return Model.get_films_by_genre(auth_request(), "Horror")

@movie_url.route("/drama")
def get_drama_films(): return Model.get_drama_films(auth_request())

@movie_url.route("/mystery")
def get_mystery_films(): return Model.get_mystery_films(auth_request())

@movie_url.route("/sci-fi")
def get_scifi_films(): return Model.get_films_by_genre(auth_request(), "SciFi")

@movie_url.route("/lighthearted")
def get_lighthearted_films(): return Model.get_lighthearted_films(auth_request())

@movie_url.route("/romance")
def get_romance_films(): return Model.get_films_by_genre(auth_request(), "Romance")

@movie_url.route("/action")
def get_action_films(): return Model.get_action_films(auth_request())

@movie_url.route("/dark")
def get_dark_films(): return Model.get_films_by_genre(auth_request(), "Dark")

@movie_url.route("/top30")
def get_top_30(): return Model.get_top_30_films(auth_request())

@movie_url.route("/movie/<name>")
def get_movie_info(name): return Model.get_movie_by_name(auth_request(), name)
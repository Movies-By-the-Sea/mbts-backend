import model.people as Model

from .auth import auth_request
from controller import people_url

@people_url.route('/director/<name>')
def get_movies_by_director(name): return Model.get_director_films(auth_request(), name)

@people_url.route('/actor/<name>')
def get_movies_by_actor(name): return Model.get_actors_film(auth_request(), name)
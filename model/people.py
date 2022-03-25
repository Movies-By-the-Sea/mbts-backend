from . import api as API


def get_director_films(auth, name):
    query = {
        "property": "Director",
        "select": {
            "equals": name
        }
    }
    return API.call(method="POST", query=query, auth=auth)



def get_actors_film(auth, name):
    query = {
        "property"    : "Actors",
        "multi_select": {
            "contains": name
        }
    }
    return API.call(method="POST", query=query, auth=auth)
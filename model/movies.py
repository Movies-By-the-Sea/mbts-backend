from . import api as API

def get_latest_reviewed(auth): 
    payload = {
        "page_size": 1,
        "sorts"    : [{
                "timestamp": "created_time",
                "direction": "descending"
        }]
    }
    return API.custom_call(method="POST", payload=payload, auth=auth)

def get_must_watch(auth): 
    query = {
        "property": "Must Watch",
        "checkbox": {
            "equals": True
        }
    }
    return API.call(method="POST", query=query, auth=auth)

def get_netflix_films(auth): 
    query = {
        "property": "Netflix",
        "checkbox": {
            "equals": True
        }
    }
    return API.call(method="POST", query=query, auth=auth)

def get_prime_films(auth): 
    query = {
        "property": "Prime",
        "checkbox": {
            "equals": True
        }
    }
    return API.call(method="POST", query=query, auth=auth)

def get_foreign_films(auth): 
    query = {
        "property": "Foreign",
        "checkbox": {
            "equals": True
        }
    }
    return API.call(method="POST", query=query, auth=auth)

def get_animated_films(auth): 
    query = {
        "property"    : "Genre",
        "multi_select": {
            "contains": "Animated"
        }
    }
    return API.call(method="POST", query=query, auth=auth)

def get_true_story_films(auth): 
    query = {
        "property"    : "Genre",
        "multi_select": {
            "contains": "True Story"
        }
    }
    return API.call(method="POST", query=query, auth=auth)

def get_meta_films(auth): 
    query = {
        "property"    : "Genre",
        "multi_select": {
            "contains": "Meta"
        }
    }
    return API.call(method="POST", query=query, auth=auth) 

def get_horror_films(auth): 
    query = {
        "property"    : "Genre",
        "multi_select": {
            "contains": "Horror"
        }
    }
    return API.call(method="POST", query=query, auth=auth)

def get_dark_films(auth): 
    query = {
        "property"    : "Genre",
        "multi_select": {
            "contains": "Dark"
        }
    }
    return API.call(method="POST", query=query, auth=auth)

def get_indie_films(auth): 
    query = {
        "property"    : "Genre",
        "multi_select": {
            "contains": "Indie"
        }
    }
    return API.call(method="POST", query=query, auth=auth)

def get_drama_films(auth): 
    query = {"or":[{
        "property"    : "Genre",
        "multi_select": {
            "contains": "Drama"
        }
    },{
        "property"    : "Genre",
        "multi_select": {
            "contains": "Social"
        }
    }]}
    return API.call(method="POST", query=query, auth=auth)

def get_mystery_films(auth): 
    query = {"or":[{
        "property"    : "Genre",
        "multi_select": {
            "contains": "Mystery"
        }
    },{
        "property"    : "Genre",
        "multi_select": {
            "contains": "Thriller"
        }
    }]}
    return API.call(method="POST", query=query, auth=auth)

def get_scifi_films(auth): 
    query = {
        "property"    : "Genre",
        "multi_select": {
            "contains": "SciFi"
        }
    }
    return API.call(method="POST", query=query, auth=auth)

def get_lighthearted_films(auth): 
    query = {"or":[{
        "property"    : "Genre",
        "multi_select": {
            "contains": "Comedy"
        }
    },{
        "property"    : "Genre",
        "multi_select": {
            "contains": "Lighthearted"
        }
    },{
        "property"    : "Genre",
        "multi_select": {
            "contains": "Con"
        }
    }]}
    return API.call(method="POST", query=query, auth=auth)

def get_romance_films(auth): 
    query = {
        "property"    : "Genre",
        "multi_select": {
            "contains": "Romance"
        }
    }
    return API.call(method="POST", query=query, auth=auth)

def get_action_films(auth): 
    query = {"or":[{
        "property"    : "Genre",
        "multi_select": {
            "contains": "Action"
        }
    },{
        "property"    : "Genre",
        "multi_select": {
            "contains": "War"
        }
    }]}
    return API.call(method="POST", query=query, auth=auth)
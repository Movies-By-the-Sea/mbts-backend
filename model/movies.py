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



def get_top_30_films(auth):
    payload = {
        "sorts" :[{
            "property" : "Overall",
            "direction": "descending"
        }]
    }
    return API.custom_call(method="POST", payload=payload, auth=auth, size=30)



def get_movie_by_name(auth, name):
    n1 = name.upper()                  # HEY THERE
    n2 = n1.split(" ")                 # ['HEY','THERE]
    n3 = [i.capitalize() for i in n2]  # ['Hey', 'There']
    n4 = ' '.join(n3)                  # 'Hey There'
    payload = {
        "page_size":1,
        "filter": {
            "property":"Name",
            "rich_text":{
                "contains":n4
            }
        }
    }
    return API.custom_call(method="POST", payload=payload, auth=auth)



def get_boolean_values(auth, property):
    query = {
        "property":property,
        "checkbox":{
            "equals":True
        }
    }
    return API.call(method="POST", query=query, auth=auth)



def get_films_by_genre(auth, genre):
    query = {
        "property"    : "Genre",
        "multi_select": {
            "contains": genre
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
    },{
        "property"    : "Genre",
        "multi_select": {
            "contains": "Indie"
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
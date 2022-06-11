import model
import requests

def call(method, query, auth):
    res    = call_api(query, method)
    result = paginate_call(method, query, auth)
    return structure_response(res, result, auth)

def custom_call(method, payload, auth, size=None):
    url  = model.base_url + model.database_id + '/query'
    res  = requests.request(method=method, json=payload, url=url, headers=model.headers)
    data = filter_data(res,auth)
    if size!=None: data = data[:size]
    return structure_response(res, data, auth)

def structure_response(res, result, auth):
    if auth:
        authorization = 'Admin'
    else:
        authorization = 'Public'
    return {
        "authorization": authorization,
        "status"       : res.status_code,
        "message"      : manage_error(res),
        "size"         : len(result),
        "result"       : result
    }

def manage_error(res):
    message = ''
    if len(res.json()['results']) == 0: message = 'Query returned no results'
    elif res.status_code != 200: message = 'Invalid query'
    else: message = 'Query Successful'
    return message

def call_api(query, method, next_cursor=None):
    url = model.base_url + model.database_id + '/query'
    if next_cursor == None:
        payload = {"filter" : query}
    else:
        payload = {
            "filter"      : query,
            "start_cursor": next_cursor,
            "sorts"       : [{
                "timestamp": "created_time",
                "direction": "descending"
            }]
        }
    return requests.request(method=method, json=payload, url=url, headers=model.headers)

def paginate_call(method, query, auth):
    res      = call_api(query, method)
    data     = res.json()
    response = filter_data(res, auth)
    while data['has_more']:
        res       = call_api(query, method, data['next_cursor'])
        data      = res.json()
        response += filter_data(res, auth)
    return res, response
            
def filter_data(res, auth):
    result = []
    for item in res.json()['results']:
        data = item['properties']
        if auth:
            result.append({
                "name"    : data['Name']['title'][0]['plain_text'],
                "director": data['Director']['select']['name'],
                "actors"  : data['Actors']['multi_select'],
                "year"    : data['Year']['number'],
                "review"  : data['Review']['rich_text'][0]['plain_text'],
                "genre"   : data['Genre']['multi_select'],
                "ratings" : {
                    "story"     : data['Story']['number'],
                    "acting"    : data['Acting']['number'],
                    "execution" : data['Execution']['number'],
                    "profundity": data['Profundity']['number'],
                    "overall"   : data['Overall']['number']
                },
                "must_watch": data['Must Watch']['checkbox'],
                "netflix"   : data['Netflix']['checkbox'],
                "prime"     : data['Prime']['checkbox'],
                "trailer"   : data['Trailer']['url'],
                "poster"    : data['PosterImage']['files'][0]['file']['url']
            })
        else:
            result.append({
                "name"    : data['Name']['title'][0]['plain_text'],
                "director": data['Director']['select']['name'],
                "actors"  : data['Actors']['multi_select'],
                "year"    : data['Year']['number'],
                "genre"   : data['Genre']['multi_select'],
                "netflix"   : data['Netflix']['checkbox'],
                "prime"     : data['Prime']['checkbox'],
                "trailer"   : data['Trailer']['url'],
            }) 
    return result
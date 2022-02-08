import os
import requests, json
from dotenv import load_dotenv

load_dotenv('./.env')

class API:

    token       = os.getenv('TOKEN')
    database_id = os.getenv('DATABASE_ID')
    base_url    = os.getenv('BASE_URL')
    headers     = {
        'Accept'        : 'application/json',
        'Authorization' : 'Bearer ' + token,
        'Notion-Version': '2021-08-16'
    }

    @staticmethod
    def call(method, query, auth):
        res    = API.call_api(query, method)
        result = API.paginate_call(method, query, auth)
        return API.structure_response(res, result, auth)

    @staticmethod
    def custom_call(method, payload, auth):
        url  = API.base_url + API.database_id + '/query'
        res  = requests.request(method=method, json=payload, url=url, headers=API.headers)
        data = API.filter_data(res,auth)
        return API.structure_response(res, data, auth)

    @staticmethod
    def structure_response(res, result, auth):
        if auth:
            authorization = 'Admin'
        else:
            authorization = 'Public'
        return {
            "authorization": authorization,
            "status"       : res.status_code,
            "message"      : API.manage_error(res),
            "size"         : len(result),
            "result"       : result
        }

    @staticmethod
    def manage_error(res):
        message = ''
        if len(res.json()['results']) == 0: message = 'Query returned no results'
        elif res.status_code != 200: message = 'Invalid query'
        else: message = 'Query Successful'
        return message

    @staticmethod
    def call_api(query, method, next_cursor=None):
        url = API.base_url + API.database_id + '/query'
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
        return requests.request(method=method, json=payload, url=url, headers=API.headers)

    @staticmethod
    def paginate_call(method, query, auth):
        res      = API.call_api(query, method)
        data     = res.json()
        response = API.filter_data(res, auth)
        while data['has_more']:
            res       = API.call_api(query, method, data['next_cursor'])
            data      = res.json()
            response += API.filter_data(res, auth)
        return response
            
    @staticmethod
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
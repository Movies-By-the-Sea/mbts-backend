import json
from firebase import firebase
from firebase_admin import credentials, initialize_app, storage


REVIEWS_PATH = '../checkpoint_15-5/movies.json'
FILE_PATH = '../checkpoint_15-5/movies_posters/'
DATA_TABLE = '/movie-reviews'



# INITIALIZING FIREBASE
cred = credentials.Certificate('../storage_adminsdk.json')
initialize_app(cred, {'storageBucket' : 'mbts-backend.appspot.com'})
firebase = firebase.FirebaseApplication('https://mbts-backend-default-rtdb.asia-southeast1.firebasedatabase.app/', None)



with open(REVIEWS_PATH) as json_file:

    data = json.load(json_file)
    for item in data:

        filePath = FILE_PATH + item['Poster']
        fileName = item['Poster']
        blob = storage.bucket().blob(fileName)
        blob.upload_from_filename(filePath)
        blob.make_public()

        DB_ENTRY = {
            'id'        : item['ID'],
            'name'      : item['Name'],
            'review'    : item['Review'],
            'director'  : item['Director'],
            'actor'     : item['Lead'],
            'year'      : item['Year'],
            'amazon'    : item['Prime'],
            'netflix'   : item['Netflix'],
            'instagram' : item['Instagram'],
            'acting'    : item['Acting'],
            'story'     : item['Story'],
            'execution' : item['Execution'],
            'profundity': item['Profundity'],
            'overall'   : item['Overall'],
            'genre1'    : item['Genre1'],
            'genre2'    : item['Genre2'],
            'trailer'   : item['Trailer'],
            'poster'    : blob.public_url
        }

        result = firebase.post(DATA_TABLE, DB_ENTRY)
        print(result)
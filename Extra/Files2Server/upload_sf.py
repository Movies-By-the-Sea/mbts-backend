import json
from firebase import firebase
from firebase_admin import credentials, initialize_app, storage


REVIEWS_PATH = '../checkpoint/short_films.json'
FILE_PATH = '../checkpoint/sf_posters/'
DATA_TABLE = '/short-film-reviews'



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
            'id'         : item['ID'],
            'name'       : item['Name'],
            'director'   : item['Director'],
            'description': item['Description'],
            'genre1'     : item['Genre1'],
            'genre2'     : item['Genre2'],
            'instagram'  : item['Instagram'],
            'duration'   : item['Duration'],
            'link'       : item['Link'],
            'poster'     : blob.public_url
        }

        result = firebase.post(DATA_TABLE, DB_ENTRY)
        print(result)
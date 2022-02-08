import os

token       = os.getenv('TOKEN')
database_id = os.getenv('DATABASE_ID')
base_url    = os.getenv('BASE_URL')
headers     = {
    'Accept'        : 'application/json',
    'Authorization' : 'Bearer ' + token,
    'Notion-Version': '2021-08-16'
}
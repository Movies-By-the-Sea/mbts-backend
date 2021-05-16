# Helper Files

These scripts have been written to facilitate easy and quick transition from serverless database to and from local documents.

---

## Uploading to Database

_Input type : JSON, img_

_Return type : Reviews with their poster URL mapped, added to DB_

Run upload.py to upload all movie reviews to the database. Change the variable *SHORT_FILMS* to true if uploading short films.

### Usage

1. Update the reviews in the movies.json/short_films.json respectively.
2. Update the images in movies_posters/sf_posters respectively.
3. In the _HelperFiles_ folder, install the required dependencies from the pipfile.
4. Go to [Service Account](https://console.firebase.google.com/project/mbts-backend/settings/serviceaccounts/adminsdk) and generate new private key.
5. Rename the downloaded key to *storage_adminsdk.json* and move it to the current folder.
6. Run upload.py.
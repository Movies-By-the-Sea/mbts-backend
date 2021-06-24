# MBtS Backend API

RESTful API build to serve the frontend website as well as the control and analytics panel for Movie By the Sea platform.

---

## Architecture

Refer to endpoints.md and database.md for more information about the API routes.

__Language__           : _Javascript_</br> 
__Tech Stack__         : _NodeJs, ExpressJS_</br>
__Databse type__       : _Firebase Firestore (document-based)_</br>
__Cloud Storage type__ : _Google Cloud Storage_</br>
__Hosting server__     : _Heroku_</br>
__External API__       : _Facebook Graph API_

---

## Setting up environment variables

There are 3 main environment variables that are important to make correct queries. They are the **Firebase Config Credentials**, **Firebase Service Account Key** and the **Facebook Graph API Credentials**. More details about how to obtain them are given below.

### Firebase Config Credentials

1. Head on over to [firebase console -> project settings -> general](https://console.firebase.google.com/project/mbts-backend-api/settings/general/web:OTdmNTcwNDktZTEzYS00YjM0LTk0MjgtMGIwNmM2YTRkMGM5).
2. Scroll down to _Your Apps_. Select your app. From the _SDK setup and configuration_, choose _CDN_ and copy paste the credentials into your environment variables accordingly.

### Firebase Service Account Key

1. Head on over to [firebase console -> project settings -> service accounts](https://console.firebase.google.com/project/mbts-backend-api/settings/serviceaccounts/adminsdk).
2. Click on the _Generate New Private Key_. This will download a _serviceAccountCredentials.json_.
3. Copy its contents and store it in the environment variables

### Facebook Graph API Credentials

1. Head on over to [developers.facebook.com -> Settings -> basic](https://developers.facebook.com/apps/839738336925481/settings/basic/?business_id=619079035363503).
2. Copy the _App ID_ and the _App Secret_ into the environemt variables.
3. Refer to [Graph API Helper Files](./Extra/HelperFiles/GraphAPI/README.md) to further run a few files to generate access tokens and subsequently fill them into the environment variables.

---

## Getting started

Make sure you have the environemtn variables setup before proceeding. Use the [helper files](./Extra/HelperFiles) to quickly perform any queries or interract with the serverless architecture. README provided for both Firestore and FB Graph API interraction.

Make sure you have [NodeJS](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed before continuing. Would also be good to have pip and python installed to use certain helper files, but is **not required** to run the server. Once done, run the following commands to install all dependencies and start the server

```
$ npm install
$ npm run dev
```
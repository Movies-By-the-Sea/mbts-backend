# MBtS Backend API

_Last updated : Friday, 25th June, 2021_

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

## API Usage

Majority of the routes can only be accessed by passing in a UID token to the request body. However, 2 of the routes have been made public and thus can be accessed without passing any tokens. Although the quantity of response would be less than a request with the UID token, it can be used freely. Their details are as below:

### Geting all reviews
This will return all the reviews present in the MBtS database along with their meta data such as genre, leads, director, year, etc. There are two tables user cn access - **movie-reviews** and **short-film-reviews**. Pass them accordingly in the request body.
```
GET /reviews
    ?table={review-table-specified}
```
JSON response:

    {
        message: "query successful",
        size   : <length-of-the-returned-data>,
        request: 
        {
            type: "GET",
            url : process.env.SERVER + "/reviews",
            body: 
            {
                table  : <specified-table>,
                orderBy: "timestamp"
            }
        },
        response: <response-data>
    }

### Getting review by ID
The review ID can be found while calling the get-all-reviews route. That can be passed here to get the review of a particular movie/short-film by ID
```
GET /reviews/get
    ?table={review-table-specified}&id={review-id}
```
JSON Response:

    {
        message: "Query successful",
        request: 
        {
            type: "GET",
            url : process.env.SERVER + "/reviews" + "/get",
            body: 
            {
              table: req.body.table,
              id   : req.body.id
            }
        },
        response: doc.data(),
    }
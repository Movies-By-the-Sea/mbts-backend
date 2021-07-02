# API Endpoints

_Last updated : Friday 2nd July, 2021_

1. Can perform CRUD operations on various tables in the database according to the authentication level provided.
2. Can return analytics data from the Instagram page.
3. User data storage and encryption handled by Firebase OAuth Authentication.
4. Hosted on Heroku

__Endpoint URL : [mbts-backend.herokuapp.com](https://mbts-backend.herokuapp.com/)__

## Authorization

1. Done using UID tokens generated when a user is created in the MBtS database.
2. Each UID token contains information about the user access level according to which various API routes are available.
3. These tokens are passed along in the body of each request and the corresponding response is masked accordingly.
4. Few routes have been made public which **does not require** use of UID token. Read more about them in the [README.md](README.md) 

### Access Levels

There are 5 access levels. Each level allows the use of routes which are below it. Their roles are as follows:

| Access Level | Role      | Description                                                              |
| ------------ | --------- | ------------------------------------------------------------------------ |
| 1            | reader    | Can only use the _GET_ routes of the reviews                             |
| 2            | writer    | Can use _POST_ routes of reviews, to write and upload one                |
| 3            | manager   | Can use _PATCH_, _PUT_ and _DELETE_ routes of reviews to manage database |
| 4            | analytics | Has access to IG analytics routes                                        |
| 5            | admin     | Has master access to all routes and can revoke levels                    |

__NOTE__ : Get in touch to create your user account and access the API. If you already have an email account verified here but do not have the UID token, follow the _"/admin/user"_ route for more info.

---

## Testing Route
**ACCESS LEVEL : None**

This is just to check whether the server is running correctly or not.
```
GET /
```
JSON Response:

    {
        message : "Hello World
    }

---

## Reviews Routes

1. Can be used to perform CRUD operations on the reviews database.
2. Tables to be used - **movie-reviews** / **short-film-reviews**

---

### Get all Reviews
**ACCESS LEVEL : public + Authorized**

1. Will get all the reviews from the table specified.
2. Using public route will return all general info about each review. Below 3 access level will get additional image specifications and 3 above will get that plus post meta data information.
```
GET /reviews
    ?table={review-table-specified}
    &uid={access-token-uid-(optional)}
```
JSON Response:

    {
        remarks: "Reviews sorted by timestamp",
        size   : <number-of-reviews-returned>
        request: {
            type: "GET",
            auth: <{Public}-if-not-specified-else-access-level>,
            URL : "/reviews",
            body: <contents-of-request-body>
        },
        response: <array-of-items-with-each-item-information-in-json>
    }

---

### Get Review by ID
**ACCESS LEVEL : public + Authorized**

1. Get particular review by ID from database.
2. Using public route will return all general info about each review. Below 3 access level will get additional image specifications and 3 above will get that plus post meta data information.
```
GET /reviews
    ?table={review-table-specified}
    &uid={access-token-uid-(optional)}
```
JSON Response:

    {
        remarks: "Query successful",
        size   : 1
        request: {
            type: "GET",
            auth: <{Public}-if-not-specified-else-access-level>,
            URL : "/reviews/get",
            body: <contents-of-request-body>
        },
        response: <review-data-in-json>
    }

---

### Get General Information
**ACCESS LEVEL : 1**

Get general info about the reviews in the database such as number of reviews updated on IG, number of foreign reviews, number of different genre reviews, etc.
```
GET /reviews/general
    ?table={review-table-specified}
    &uid={access-token-uid}
```
JSON Response:

    {
        remarks: "Query successful",
        size   : 1
        request: 
        {
            type: "GET",
            auth: <access-level-of-user>
            URL : "/reviews/general,
            body: <contents-of-request-body>
        },
        response: 
        {
            Instagram : <array[id, num, size]>,
            Netflix   : <array[id, num, size]>,
            Prime     : <array[id, num, size]>,
            Must_Watch: <array[id, num, size]>,
            Foreign   : <array[id, num, size]>,
            Genre     : 
            {
                Lighthearted : <array[id, num, size]>,
                Comedy       : <array[id, num, size]>,
                Romance      : <array[id, num, size]>,
                Horror       : <array[id, num, size]>,
                Thriller     : <array[id, num, size]>,
                Animated     : <array[id, num, size]>,
                Dark         : <array[id, num, size]>,
                Meta         : <array[id, num, size]>,
                War          : <array[id, num, size]>,
                Crime        : <array[id, num, size]>,
                Inspirational: <array[id, num, size]>,
                Sci_Fi       : <array[id, num, size]>,
                True_Story   : <array[id, num, size]>,
                Drama        : <array[id, num, size]>,
                Fantasy      : <array[id, num, size]>,
                Action       : <array[id, num, size]>,
                Indie        : <array[id, num, size]>,
                Mystery      : <array[id, num, size]>,
            }
        }
    }

---

### Update Instagram Status
**ACCESS LEVEL : 3**

Change and update the IG status of a review.
```
PATCH /reviews/updateIG
    ?table={review-table-specified}&id={review-id-specified}&instagram={new-status}
    uid={access-token-uid}
```
JSON Response:

    {
        remarks: "Review Instagram status updated successful",
        size   : 0
        request: {
            type: "PATCH",
            auth: <{Public}-if-not-specified-else-access-level>,
            URL : "/reviews/updateIG",
            body: <contents-of-request-body>
        },
        response: []
    }

---

### Update Review
**ACCESS LEVEL : 3 + user-matched-review**

1. Make updates to any specific fields of the review.
2. Image updating can only be done via the admin panel.
3. Can be access by users with level 3 and above access or by the author of the said review to be updated.
```
PUT /reviews/update
    ?table={review-table-specified}&id={review-id-specified}
    &uid={access-token-uid}
```
JSON Response:

    {
        remarks: "Review updated successful",
        size   : 0
        request: {
            type: "PUT",
            auth: <{Public}-if-not-specified-else-access-level>,
            URL : "/reviews/update",
            body: <contents-of-request-body>
        },
        response: []
    }

---

### Upload Review
**ACCESS LEVLE : 2**

1. Upload a review to the specified table in database
2. Also include your email(author) and uid(author_uid) in the request body so that the review maps to particular user.
```
POST /reviews/upload
    ?table={review-table-specified}&upload_data={data-to-be-filled}&author={verified-user-email-id}
    &uid={access-token-uid}
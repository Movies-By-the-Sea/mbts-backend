# API Endpoints

_Last updated : Friday, 25th June, 2021_

Currntly cappable of performing CRUD operations on the database and gather basic insights from the Instagram page. Plans to make more routes with complex queris and analytics from both the website (via Google-Analytics) and the IG page in pipeline. Latest version already hosted on Heroku.

Encryption and storing of UIDs is handled by Firebase OAuth Authentication.

__Endpoint URL : [mbts-backend.herokuapp.com](https://mbts-backend.herokuapp.com/)__

---

## Authorization

There are two authorizations at play here. The **auth ID token** and the **user UID**. Without either of these, the API cannot be accessed.

### Access Levels

There are 5 access levels. Each level allows the use of routes which are below it. Their roles are as follows:

| Access Level | Role      | Description                                                              |
| ------------ | --------- | ------------------------------------------------------------------------ |
| 1            | reader    | Can only use the _GET_ routes of the reviews                             |
| 2            | writer    | Can use _POST_ routes of reviews, to write and upload one                |
| 3            | manager   | Can use _PATCH_, _PUT_ and _DELETE_ routes of reviews to manage database |
| 4            | analytics | Has access to IG analytics routes                                        |
| 5            | admin     | Has master access to all routes and can revoke levels                    |

When an account is created, a UID corresponding to it are generated. When using any route, pass in the UID as a request body to authorize your request.

__NOTE__ : Get in touch to create your user account and access the API.

### Auth ID Tokens

These tokens are used to validate whether the user can use the API or not. This would soon be depriciated once the accounts are connected to the database.

---

## Testing Route
This is just to check whether the server is running correctly or not. **ACCESS LEVEL : None**
```
GET /
    &auth_id={auth-id-token}&uid={access-token-uid}
```
JSON Response:

    {
        message : "Hello World
    }

---

## Reviews Routes
This route will point to all operations on the database
The tables here refer to either of the two - movie-reviews / short-film-reviews

### Get all reviews
Get all the reviews from the specified table. **ACCESS LEVEL : 1**
```
GET /reviews
    ?table={review-table-specified}
    &auth_id={auth-id-token}&uid={access-token-uid}
```
JSON Response:

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

### Get Review By ID
Get particular movie review by ID. **ACCESS LEVEL : 1**
```
GET /reviews/get
    ?table={review-table-specified}&id={review-id}
    &auth_id={auth-id-token}&uid={access-token-uid}
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

### Get general Information
Get general info about the reviews in the database such as number of reviews updated on IG, number of foreign reviews, number of different genre reviews, etc. **ACCESS LEVEL : 1**
```
GET /reviews/general
    ?table={review-table-specified}
    &auth_id={auth-id-token}&uid={access-token-uid}
```
JSON Response:

    {
        message: "Query successful",
        request: 
        {
            type: "GET",
            url : process.env.SERVER + "/reviews" + "/general",
            body: 
            {
                table: req.body.table
            }
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

### Update Instagram status
Change and update the IG status of a review. **ACCESS LEVEL : 3**
```
PATCH /reviews/updateIG
    ?table={review-table-specified}&id={review-id-specified}
    &auth_id={auth-id-token}&uid={access-token-uid}
```
JSON Response:

    {
        message: "Query successful",
        request: 
        {
            type: "PATCH",
            url : process.env.SERVER + "/operations" + "/updateIG",
            body: 
            {
            table    : req.body.table,
            id       : req.body.id,
            instagram: req.body.instagram
            }
        },
    }

### Update a review
Make updates to any specific field of the review. For images, only the uploaded url linked is passed as that is taken care of in the admin panel. **ACCESS LEVEL : 3**
```
PUT /reviews/update
    ?table={review-table-specified}&id={review-id-specified}
    &auth_id={auth-id-token}&uid={access-token-uid}
```
JSON Response:

    {
        message: "Query successful",
        request: 
        {
              type: "PUT",
              url : process.env.SERVER + "/operations" + "/update",
              body: 
              {
                id         : req.body.id,
                table      : req.body.table,
                update_data: req.body.update_data,
            }
        },
    }

### Upload a review
Upload a review to the specified table in the database. **ACCESS LEVEL : 2**
```
POST /reviews/upload
    ?table={review-table-specified}
    &auth_id={auth-id-token}&uid={access-token-uid}
```
JSON Response:

    {
        message: "Post added successfully",
        request: 
        {
            type: "POST",
            url : process.env.SERVER + "/operations" + "/upload",
            body: 
            {
              table        : req.body.table,
              id           : doc.id,
              data_uploaded: data,
            }
        }
    }

### Delete a review
Delete a review from the specified table from the database. **ACCESS LEVEL : 3**
```
DELETE /reviews/delete
    ?table={review-table-specified}&id={review-id-specified}
    &auth_id={auth-id-token}&uid={access-token-uid}
```
JSON Response:

    {
        message: "Document deleted successfully",
        request: 
        {
            type: "DELETE",
            url : process.env.SERVER + "/operations" + "/delete",
            body: 
            {
              table: req.body.table,
              id   : req.body.id
            }
        },
    }

---

## Instagram Routes
This route will get results for all the analytics and general info of the IG account of MBtS

### Get general info
This will return the basic info of the IG page such as the category, followers and following counts, etc. **ACCESS LEVEL : 4**
```
GET /instagram
    &auth_id={auth-id-token}&uid={access-token-uid}
```
JSON Response:

    {
        message: 'query successful',
        request: 
        {
            type: "GET",
            url : process.env.SERVER + "/instagram" + "/"
        },
        response: <business-discovery-data-from-graph-api>
    }

### Get daily users analytics
This will return the daily user interaction, reach and engament information. **ACCESS LEVEL : 4**
```
GET /instagram/users
    ?auth_id={auth-id-token}&uid={access-token-uid}
```
JSON Response:
    
    {
        message: "query successful",
        request: 
        {
            type: "GET",
            url : process.env.SERVER + "/instagram" + "/users"
        },
        response: <graph-api-response-data>
    }

### Get latest post
This will get the latest post uploaded on the IG page. **ACCESS LEVEL : 4**
```
GET /instagram/latest
    ?auth_id={auth-id-token}&uid={access-token-uid}
```
JSON Response:

    {
        message: "query successful",
        request: 
        {
            type: "GET",
            url : process.env.SERVER + "/instagram" + "/latest"
        },
        response: <graph-api-response-data>   
    }

### Get last week insights
This will get the insights from last week's uploaded posts with metrics such as reach, engagements, impressions and saved. **ACCESS LEVEL : 4**
```
GET /instagram/insights
    ?auth_id={auth-id-token}&uid={access-token-uid}
```
JSON Response:

    {
        message: "query successful",
        request: 
        {
            type: "GET",
            url : process.env.SERVER + "/instagram" + "/insights"
        },
        response : 
        {
            size    : insights.length,
            insights: insights
        }
    }

---

## Admin Routes
These routes can be used to manage the users and their access and control over the API.

### Create a User
This route will help create a user with the specified access level and correspondingly generate their UIDs. **ACCESS LEVEL : 5**
```
POST /admin/createUser
    ?name={user-name}&email={user-email}&password={user-password}&accessLevel={access-level-to-be-given}
    &auth_id={auth-id-token}&uid={access-token-uid}
```
JSON Response:

    {
        message: "User successfully created",
        request:
        {
                type: "POST",
                url : process.env.SERVER + "/admin" + "/createAPIUser"
        },
        response :
        {
            uid        : uid,
            accessLevel: accessLevel,
            user       : 
            {
                    name    : name,
                    email   : email,
                    password: password
            }
        }
    }
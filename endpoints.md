# API Endpoints

_Last updated : Friday, 25th June, 2021_

Currntly cappable of performing CRUD operations on the database and gather basic insights from the Instagram page. Plans to make more routes with complex queris and analytics from both the website (via Google-Analytics) and the IG page in pipeline. Latest version already hosted on Heroku.

Encryption and storing of UIDs is handled by Firebase OAuth Authentication.

__Endpoint URL : [mbts-backend.herokuapp.com](https://mbts-backend.herokuapp.com/)__

---

## Authorization

Authentication and authorization is done by the **user UID** token. These are generated when a user object is created and can be used to access various routes depending upon the access levels granted. This is specified in the UID token itself. Pass along these tokens in the request body to authroize it.

Two routes have been made public for general purposes and can be accessed without any UID tokens. Read more about them in the [README.md](README.md) file.

### Access Levels

There are 5 access levels. Each level allows the use of routes which are below it. Their roles are as follows:

| Access Level | Role      | Description                                                              |
| ------------ | --------- | ------------------------------------------------------------------------ |
| 1            | reader    | Can only use the _GET_ routes of the reviews                             |
| 2            | writer    | Can use _POST_ routes of reviews, to write and upload one                |
| 3            | manager   | Can use _PATCH_, _PUT_ and _DELETE_ routes of reviews to manage database |
| 4            | analytics | Has access to IG analytics routes                                        |
| 5            | admin     | Has master access to all routes and can revoke levels                    |


__NOTE__ : Get in touch to create your user account and access the API.

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
This route will point to all operations on the database
The tables here refer to either of the two - **movie-reviews** / **short-film-reviews**

### Get all reviews
**ACCESS LEVEL : 1**
Get all the reviews from the specified table. Public version of this route is also available which will give less data in response to the one given here passing the UID token. Read more about it [here](README.md).
```
GET /reviews
    ?table={review-table-specified}
    &uid={access-token-uid}
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
                uid    : <uid-of-the-user>,
                table  : <specified-table>,
                orderBy: "timestamp"
            }
        },
        response: <response-data>
    }

### Get Review By ID
**ACCESS LEVEL : 1**
Get particular movie review by ID. Public version of this route is also available which will give less data in response to the one given here passing the UID token. Read more about it [here](README.md).
```
GET /reviews/get
    ?table={review-table-specified}&id={review-id}
    &uid={access-token-uid}
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
                uid  : <uid-of-the-user>                
                table: <specified-table>,
                id   : <specified-review-id>
            }
        },
        response: <array-of-data>,
    }

### Get general Information
**ACCESS LEVEL : 1**
Get general info about the reviews in the database such as number of reviews updated on IG, number of foreign reviews, number of different genre reviews, etc.
```
GET /reviews/general
    ?table={review-table-specified}
    &uid={access-token-uid}
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
                uid  : <user-uid>
                table: <specified-table>
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
**ACCESS LEVEL : 3**
Change and update the IG status of a review.
```
PATCH /reviews/updateIG
    ?table={review-table-specified}&id={review-id-specified}
    uid={access-token-uid}
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
                uid      : <user-uid>
                table    : <specified-table>,
                id       : <specified-review-id>,
                instagram: <specified-IG-status>
            }
        },
    }

### Update a review
**ACCESS LEVEL : 3**
Make updates to any specific field of the review. For images, only the uploaded url linked is passed as that is taken care of in the admin panel.
```
PUT /reviews/update
    ?table={review-table-specified}&id={review-id-specified}
    &uid={access-token-uid}
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
                  uid        : <user-uid>
                  id         : <specified-review-id>,
                  table      : <specified-table>,
                  update_data: <updated-data-to-be-sent>,
              }
        },
    }

### Upload a review
**ACCESS LEVEL : 2**
Upload a review to the specified table in the database.
```
POST /reviews/upload
    ?table={review-table-specified}
    &uid={access-token-uid}
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
                uid          : <user-uid>
                table        : <specified-table>
                data_uploaded: <review-data-to-be-uploaded>,
            }
        },
        response:
        {
            review_id: <review-id-generated>
        }
    }

### Delete a review
**ACCESS LEVEL : 3**
Delete a review from the specified table from the database.
```
DELETE /reviews/delete
    ?table={review-table-specified}&id={review-id-specified}
    &uid={access-token-uid}
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
                uid  : <user-uid>
                table: <specified-table>,
                id   : <specified-review-id>
            }
        },
    }

---

## Instagram Routes
This route will get results for all the analytics and general info of the IG account of MBtS

### Get general info
**ACCESS LEVEL : 4**
This will return the basic info of the IG page such as the category, followers and following counts, etc.
```
GET /instagram
    &uid={access-token-uid}
```
JSON Response:

    {
        message: 'query successful',
        request: 
        {
            type: "GET",
            url : process.env.SERVER + "/instagram" + "/",
            body:
            {
                uid: <user-uid>
            }
        },
        response: <business-discovery-data-from-graph-api>
    }

### Get daily users analytics
**ACCESS LEVEL : 4**
This will return the daily user interaction, reach and engament information.
```
GET /instagram/users
    &uid={access-token-uid}
```
JSON Response:
    
    {
        message: "query successful",
        request: 
        {
            type: "GET",
            url : process.env.SERVER + "/instagram" + "/users",
            body:
            {
                uid: <user-uid>
            }
        },
        response: <graph-api-response-data>
    }

### Get latest post
**ACCESS LEVEL : 4**
This will get the latest post uploaded on the IG page.
```
GET /instagram/latest
    &uid={access-token-uid}
```
JSON Response:

    {
        message: "query successful",
        request: 
        {
            type: "GET",
            url : process.env.SERVER + "/instagram" + "/latest",
            body:
            {
                uid: <user-uid>
            }
        },
        response: <graph-api-response-data>   
    }

### Get last week insights
**ACCESS LEVEL : 4**
This will get the insights from last week's uploaded posts with metrics such as reach, engagements, impressions and saved.
```
GET /instagram/insights
    &uid={access-token-uid}
```
JSON Response:

    {
        message: "query successful",
        request: 
        {
            type: "GET",
            url : process.env.SERVER + "/instagram" + "/insights",
            body:
            {
                uid: <user-uid>
            }
        },
        response : 
        {
            size    : <array-size-of-insights>,
            insights: <array-of-insights>
        }
    }

---

## Admin Routes
These routes can be used to manage the users and their access and control over the API.

### Create a User
**ACCESS LEVEL : 5**
This route will help create a user with the specified access level and correspondingly generate their UIDs.
```
POST /admin/createUser
    ?name={user-name}&email={user-email}&password={user-password}&accessLevel={access-level-to-be-given}
    &uid={access-token-uid}
```
JSON Response:

    {
        message: "User successfully created",
        request:
        {
                type: "POST",
                url : process.env.SERVER + "/admin" + "/createAPIUser",
                body:
                {
                    uid: <user-uid>,
                    accessLevel: <access-level-specified>,
                    user       :
                    {
                        name    : <created-user-name>,
                        email   : <created-user-email>,
                        password: <created-user-password>
                    }
                }
        },
        response :
        {
            uid_created: <uid-generated-of-the-created-user>
        }
    }
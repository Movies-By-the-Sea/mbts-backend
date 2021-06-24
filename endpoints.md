# API Endpoints

_Last updated : Friday, 25th June, 2021_

Currntly cappable of performing CRUD operations on the database and gather basic insights from the Instagram page. Plans to make more routes with complex queris and analytics from both the website (via Google-Analytics) and the IG page in pipeline. Latest version already hosted on Heroku.

For development purposes, the server can be set to `http://localhost` with the port number of choice. 

---

## Testing Route
This is just to check whether the server is running correctly or not
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
The tables here refer to either of the two - movie-reviews / short-film-reviews

### Get all reviews
Get all the reviews from the specified table.
```
GET /reviews?table={review-table-specified}
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
Get particular movie review by ID
```
GET /reviews/get?table={review-table-specified}&id={review-id}
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
Get general info about the reviews in the database such as number of reviews updated on IG, number of foreign reviews, number of different genre reviews, etc.
```
GET /reviews/general?table={review-table-specified}
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
Change and update the IG status of a review
```
PATCH /reviews/updateIG?table={review-table-specified}&id={review-id-specified}
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
Make updates to any specific field of the review. For images, only the uploaded url linked is passed as that is taken care of in the admin panel
```
PUT /reviews/update?table={review-table-specified}&id={review-id-specified}
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
Upload a review to the specified table in the database
```
POST /reviews/upload?table={review-table-specified}
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
Delete a review from the specified table from the database
```
DELETE /reviews/delete?table={review-table-specified}&id={review-id-specified}
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
This will return the basic info of the IG page such as the category, followers and following counts, etc.
```
GET /instagram
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
This will return the daily user interaction, reach and engament information
```
GET /instagram/users
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
This will get the latest post uploaded on the IG page
```
GET /instagram/latest
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
This will get the insights from last week's uploaded posts with metrics such as reach, engagements, impressions and saved
```
GET /instagram/insights
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
const express = require("express");
const cors = require("cors");
const app = express();

const reviewRoute = require("./routes/reviews");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/',(req, res)=> res.status(200).json({"message":"Hello world"}));
app.use("/reviews", reviewRoute);


// HANDLING SERVER SIDE ERRORS
app.use((req, res, next) => {
    const error  = new Error('Route Not found');
    error.status = 400;
    next(error);  
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message, 
        }
    });
});

module.exports = app;
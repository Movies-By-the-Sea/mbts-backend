const express = require("express");
const cors = require("cors");
const app = express();

const errorRoute = require("./routes/error");
const reviewRoute = require("./routes/reviews");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(errorRoute);

app.get('/',(req, res)=>{
    return res.status(200).json({"message":"Hello world"});
})
app.use("/reviews", reviewRoute);

module.exports = app;
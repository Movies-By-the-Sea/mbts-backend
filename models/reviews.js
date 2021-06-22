const db = require("../db");
require("dotenv").config();




async function getAllReviews(req, res) {
    try {
        const data      = [];
        const reviewRef = db.collection(req.body.table);
        const snapshot  = await reviewRef.orderBy("timestamp").get();
        snapshot.forEach((doc) => {
            data.push({
                "ID" : doc.id,
                "data" : doc.data()
            });
        });
        return res
            .status(200)
            .json({
                message : "query successful",
                size : data.length,
                request : {
                    type: "GET",
                    url : process.env.SERVER + "/reviews"
                },
                response : data
            })  
    } catch (error) {
        return res
            .status(400)
            .json({
                message : error.message
            })
    }
}






async function getReviewByID(req, res) {
    const reviewRef = db.collection(req.body.table).doc(req.body.id);
    const doc       = await reviewRef.get();
    if (!doc.exists) {
      return res
          .status(404)
          .json({
            message: "No such review with given ID found",
          });
    } else {
      return res
          .status(200)
          .json({
            message : "Query successful",
            movie_id: req.body.id,
            request : {
              type: "GET",
              url : process.env.SERVER + "/reviews" + "/get",
            },
            response: doc.data(),
          });
    }
}





async function getData(table, query) {
    const data = {
      size    : 0,
      response: [],
    };
    let   counter   = 0;
    const reviewRef = db.collection(String(table));
    const snap      = await reviewRef
        .where(query, "==", true)
        .get();
    snap.forEach((doc) => {
      data.response.push(doc.id);
      counter++;
    });
    data.size = counter;
    return data;
  }




async function getGeneralInfo(req, res) {
    return res
    .status(200)
    .json({
      message: "Query successful",
      request: {
        type: "GET",
        url : process.env.SERVER + "/reviews" + "/general",
      },
      response: {
        Instagram : await getData(req.body.table, "instagram"),
        Netflix   : await getData(req.body.table, "netflix"),
        Prime     : await getData(req.body.table, "prime"),
        Must_Watch: await getData(req.body.table, "must_watch"),
        Foreign   : await getData(req.body.table, "foreign"),
      },
    });
}





module.exports = {
    getAllReviews : getAllReviews,
    getReviewByID : getReviewByID,
    getGeneralInfo: getGeneralInfo
}
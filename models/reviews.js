const { db, admin } = require("../firebase");
require("dotenv").config();





//=====================================================================================
//=====================================================================================

async function getAllReviews(req, res) {
  const data      = [];
  const reviewRef = db.collection(req.body.table);
  const snapshot  = await reviewRef.orderBy("timestamp").get();
  snapshot.forEach((doc) => {
    if(req.body.uid === undefined) {
      data.push({
        "ID" : doc.id,
        "data" : {
          name    : doc.data().name,
          director: doc.data().director,
          year    : doc.data().year,
          lead    : doc.data().lead,
          genre   : doc.data().genre,
          review  : doc.data().review,
          poster  : doc.data().poster,
          ratings : {
            story     : doc.data().story,
            acting    : doc.data().acting,
            execution : doc.data().execution,
            profundity: doc.data().profundity,
            overall   : doc.data().overall
          },
          foreign     : doc.data().foreign,
          must_watch  : doc.data().must_watch,
          amazon_prime: doc.data().prime,
          netflix     : doc.data().netflix,
          trailer     : doc.data().trailer
        }
      })
    } else {
      data.push({
          "ID"  : doc.id,
          "data": doc.data()
      });
    }
  });
  return res
      .status(200)
      .json({
          message: "query successful",
          size   : data.length,
          request: {
              type: "GET",
              url : process.env.SERVER + "/reviews",
              body: {
                uid    : req.body.uid,
                table  : req.body.table,
                orderBy: "timestamp"
              }
          },
          response: data
      })  
}

//=====================================================================================
//=====================================================================================





//=====================================================================================
//=====================================================================================

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
    const result = [];
    if(req.body.uid === undefined) {
      result.push({
        name    : doc.data().name,
        director: doc.data().director,
        year    : doc.data().year,
        lead    : doc.data().lead,
        genre   : doc.data().genre,
        review  : doc.data().review,
        poster  : doc.data().poster,
        ratings : {
          story     : doc.data().story,
          acting    : doc.data().acting,
          execution : doc.data().execution,
          profundity: doc.data().profundity,
          overall   : doc.data().overall
        },
        foreign     : doc.data().foreign,
        must_watch  : doc.data().must_watch,
        amazon_prime: doc.data().prime,
        netflix     : doc.data().netflix,
        trailer     : doc.data().trailer
      });
    } else {
      result.push(doc.data());
    }
    return res
        .status(200)
        .json({
          message: "Query successful",
          request: {
            type: "GET",
            url : process.env.SERVER + "/reviews" + "/get",
            body: {
              uid    : req.body.uid,
              table: req.body.table,
              id   : req.body.id
            }
          },
          response: result,
        });
  }
}

//=====================================================================================
//=====================================================================================





//=====================================================================================
//=====================================================================================

async function getData(table, query, allInfo=false) {
  const data = {
    size    : 0,
    response: [],
  };
  let   counter   = 0;
  const reviewRef = db.collection(table);
  const snap      = await reviewRef
      .where(query, "==", true)
      .get();
  snap.forEach((doc) => {
    if(allInfo) {
      data.response.push({
        id  : doc.id,
        data: doc.data()
      });
    }
    counter++;
  });
  data.size = counter;
  return data;
}


async function getDataGenre(table, query, allInfo=false) {
  const data = {
    size    : 0,
    response: []
  };
  let   counter   = 0;
  const reviewRef = db.collection(table);
  const snap      = await reviewRef
      .where("genre","array-contains",query)
      .get();
    snap.forEach((doc) => {
      if(allInfo) {
        data.response.push({
          id  : doc.id,
          data: doc.data()
        });
      }
      counter++;
    });
    data.size = counter;
    return data
}



async function getGeneralInfo(req, res) {
  return res
  .status(200)
  .json({
    message: "Query successful",
    request: {
      type: "GET",
      url : process.env.SERVER + "/reviews" + "/general",
      body: {
        uid    : req.body.uid,
        table: req.body.table
      }
    },
    response: {
      Instagram : await getData(req.body.table, "instagram"),
      Netflix   : await getData(req.body.table, "netflix"),
      Prime     : await getData(req.body.table, "prime"),
      Must_Watch: await getData(req.body.table, "must_watch"),
      Foreign   : await getData(req.body.table, "foreign"),
      Genre     : {
        Lighthearted : await getDataGenre(req.body.table, "Lighthearted"),
        Comedy       : await getDataGenre(req.body.table, "Comedy"),
        Romance      : await getDataGenre(req.body.table, "Romance"),
        Horror       : await getDataGenre(req.body.table, "Horror"),
        Thriller     : await getDataGenre(req.body.table, "Thriller"),
        Animated     : await getDataGenre(req.body.table, "Animated"),
        Dark         : await getDataGenre(req.body.table, "Dark"),
        Meta         : await getDataGenre(req.body.table, "Meta"),
        War          : await getDataGenre(req.body.table, "War"),
        Crime        : await getDataGenre(req.body.table, "Crime"),
        Inspirational: await getDataGenre(req.body.table, "Inspirational"),
        Sci_Fi       : await getDataGenre(req.body.table, "Sci_Fi"),
        True_Story   : await getDataGenre(req.body.table, "True_Story"),
        Drama        : await getDataGenre(req.body.table, "Drama"),
        Fantasy      : await getDataGenre(req.body.table, "Fantasy"),
        Action       : await getDataGenre(req.body.table, "Action"),
        Indie        : await getDataGenre(req.body.table, "Indie"),
        Mystery      : await getDataGenre(req.body.table, "Mystery"),
      }
    },
  });
}

//=====================================================================================
//=====================================================================================





module.exports = {
    getAllReviews : getAllReviews,
    getReviewByID : getReviewByID,
    getGeneralInfo: getGeneralInfo
}
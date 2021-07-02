const { db, auth } = require("../firebase");
require("dotenv").config();





//=====================================================================
//=====================================================================

async function getAccessLevel(uid) {
    return (await auth.getUser(uid)).customClaims.accessLevel;
}

//=====================================================================
//=====================================================================





//=====================================================================
//=====================================================================

async function getAllData(table) {
    const data = [];
    const reviewRef = db.collection(table);
    const snapshot  = await reviewRef.orderBy("timestamp").get();
    snapshot.forEach((doc) => data.push(doc.data()));
    return data;
}

//=====================================================================
//=====================================================================





//=====================================================================
//=====================================================================

async function getDataByTableID(table, id) {
    const reviewRef = db.collection(table).doc(id);
    return [(await reviewRef.get()).data()];
}

//=====================================================================
//=====================================================================





//=====================================================================
//=====================================================================

async function getQueryData(table, query, allInfo=false) {
    const data      = { size:0 , response:new Array() };
    let   counter   = 0;
    const reviewRef = db.collection(table);
    const snapshot  = await reviewRef.where(query,"==",true).get();
    snapshot.forEach((doc) => {
        if(allInfo) {
            data.response.push({
                id  : doc.id,
                data: doc.data()
            });
        };
        counter++;
    });
    data.size = counter;
    return data;
}

//=====================================================================
//=====================================================================





//=====================================================================
//=====================================================================

async function getQueryDataWithFields(table, query, fields, allInfo=false) {
    const data      = { size:0 , response:new Array() };
    let   counter   = 0;
    const reviewRef = db.collection(table);
    const snapshot  = await reviewRef.where(query,"==",fields).get();
    snapshot.forEach((doc) => {
        if(allInfo) {
            data.response.push({
                id  : doc.id,
                data: doc.data()
            });
        };
        counter++;
    });
    data.size = counter;
    return data;
}

//=====================================================================
//=====================================================================





//=====================================================================
//=====================================================================

async function getDataByGenre(table, query, allInfo=false) {
    const data      = { size:0, response: new Array() };
    let   counter   = 0;
    const reviewRef = db.collection(table);
    const snap      = await reviewRef.where("genre","array-contains",query).get();
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

//=====================================================================
//=====================================================================

  



//=====================================================================
//=====================================================================

async function maskDataByAuth(req, getUnique=false) {
    const data = getUnique ? await getDataByTableID(req.body.table, req.body.id) : await getAllData(req.body.table);
    if(data[0] === undefined) {
        return {
            data: "No such review with given ID found",
            type: "Invalid request"
        }
    }
    if(req.body.uid === undefined) {
        let publicData = new Array();
        data.forEach((doc) => {
            publicData.push({
                "ID"  : doc.id,
                "data": {
                  name    : doc.name,
                  director: doc.director,
                  year    : doc.year,
                  lead    : doc.lead,
                  genre   : doc.genre,
                  review  : doc.review,
                  poster  : doc.poster,
                  ratings : {
                    story     : doc.story,
                    acting    : doc.acting,
                    execution : doc.execution,
                    profundity: doc.profundity,
                    overall   : doc.overall
                  },
                  foreign     : doc.foreign,
                  must_watch  : doc.must_watch,
                  amazon_prime: doc.prime,
                  netflix     : doc.netflix,
                  trailer     : doc.trailer
                }
              });
        })
        return {
            data: publicData,
            type: "Public Request"
        };
    } else {
        if(await getAccessLevel(req.body.uid) === 5) {
            return {
                data: data,
                type: "Admin Request"
            };
        } else {
            let temp = data;
            temp.forEach((doc) => doc.author_uid = "access denied");
            return {
                data: temp,
                type: "Non-admin authorized request"
            };
        }
    }
}

//=====================================================================
//=====================================================================





//=====================================================================
//=====================================================================

function mapAccessLevel(accessLevel) {
    switch(accessLevel) {
        case 1 : return "Reader Access";
        case 2 : return "Writer Access";
        case 3 : return "Manager Access";
        case 4 : return "Analytics Access";
        case 5 : return "Admin Access";
        default: return "Public Access";
    }
}

//=====================================================================
//=====================================================================





//=====================================================================
//=====================================================================

async function formatResponse(req, res, status, resp) {
    if(status != 200) {
        return res.status(status).json({
            error: { message: resp.message }
        });
    }
    return res.status(status).json({
        remark : resp.remark || "Query successful",
        size   : resp.size || 0,
        request: {
            type: resp.requestType || 'GET',
            auth: resp.auth || mapAccessLevel(await getAccessLevel(req.body.uid)),
            URL : process.env.SERVER + resp.URL,
            body: req.body || []
        },
        response: resp.response
    })
}

//=====================================================================
//=====================================================================





module.exports = {
    maskDataByAuth        : maskDataByAuth,
    getQueryData          : getQueryData,
    getDataByGenre        : getDataByGenre,
    getDataByTableID      : getDataByTableID,
    formatResponse        : formatResponse,
    getQueryDataWithFields: getQueryDataWithFields,
    getAccessLevel        : getAccessLevel
}
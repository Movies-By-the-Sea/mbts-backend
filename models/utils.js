const { db, auth } = require("../firebase");


async function getAccessLevel(uid) {
    return (await auth.getUser(uid)).customClaims.accessLevel;
}

async function getAllData(table) {
    const data = [];
    const reviewRef = db.collection(table);
    const snapshot  = await reviewRef.orderBy("timestamp").get();
    snapshot.forEach((doc) => data.push(doc.data()));
    return data;
}



async function maskDataByAuth(req) {
    const data = await getAllData(req.body.table);
    if(req.body.uid === undefined) {
        let publicData = new Array();
        data.forEach((doc) => {
            publicData.push({
                "ID" : doc.id,
                "data" : {
                  name    : doc.data.name,
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

module.exports = {
    maskDataByAuth: maskDataByAuth
}
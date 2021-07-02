const { db, auth } = require("../firebase");





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
    const data      = [];
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




module.exports = {
    getAccessLevel        : getAccessLevel,
    getAllData            : getAllData,
    getDataByTableID      : getDataByTableID,
    getQueryData          : getQueryData,
    getQueryDataWithFields: getQueryDataWithFields,
    getDataByGenre        : getDataByGenre
}
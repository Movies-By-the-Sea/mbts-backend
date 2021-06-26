const { db, admin } = require("../firebase");
const bcrypt = require("bcrypt");
require("dotenv").config();


async function getInfo(req, res) {

    const userDB   = db.collection("users");
    const snapshot = await userDB
        .where("email","==",req.body.email)
        .get();
    if(snapshot.empty) {
        return res
            .status(400)
            .json({
                message: "No such user found"
            });
    };
    snapshot.forEach(doc => {
        bcrypt.compare(req.body.password, doc.data().password, (err, result) => {
            if(result) {
                return res
                    .status(200)
                    .json({
                        message: "query successful",
                        request: {
                            type: "GET",
                            url : process.env.SERVER + "/admin" + "/user",
                            body: {
                                email   : req.body.email,
                                password: req.body.password
                            }
                        },
                        response:{
                            uid : doc.id,
                            info: doc.data()
                        }
                    }); 
            } else {
                return res
                    .status(400)
                    .json({
                        message: "Password does not match"
                    })
            }
        })
    });
};

module.exports = {
    getInfo: getInfo
}
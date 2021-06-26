const { db, auth } = require("../firebase");
const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);





//==========================================================================================
//==========================================================================================

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
                            url : process.env.SERVER + "/user",
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

//==========================================================================================
//==========================================================================================





//==========================================================================================
//==========================================================================================

async function updateInfo(req, res) {
    if(req.body.updateData.accessLevel != undefined) {
        return res
            .status(400)
            .json({
                message: "Unauthorized to change access level"
            });
    } else {
        await auth
        .updateUser(req.body.uid, req.body.updateData)
        .then(async () => {
            if(req.body.updateData.password != undefined) {
                const hash = await bcrypt.hash(req.body.updateData.password, saltRounds);
                req.body.updateData.password = hash;
            }
            const ref = db.collection("users").doc(req.body.uid);
            await ref.update(req.body.updateData);
            return res
                .status(200)
                .json({
                    message: "query successful",
                    request: {
                        type: "PUT",
                        url : process.env.SERVER + "/user" + "/update",
                        body: {
                            uid       : req.body.uid,
                            updateData: req.body.updateData
                        }
                    }
                });
        });
    };
}

//==========================================================================================
//==========================================================================================





module.exports = {
    getInfo   : getInfo,
    updateInfo: updateInfo
}
const { db, auth } = require("../firebase");
const bcrypt = require("bcrypt");
require("dotenv").config({path:"../.env"});
const saltRounds = parseInt(process.env.SALT_ROUNDS);





//=====================================================================
//=====================================================================

async function createUser(req, res) {
    const { name, email, password, accessLevel } = req.body;
    if(!name || !email || !password || !accessLevel) {
        return res
            .status(400)
            .json({
                message : "Missing fields"
            });
    };
    if(accessLevel > 5) {
        return res
            .status(400)
            .json({
                message: "Cannot have access level above 5"
            });
    };
    const hash = await bcrypt.hash(password, saltRounds);
    await auth.createUser({
        name    : name,
        email   : email,
        password: hash
    })
    .then(async (userRecord) => {
        await auth.setCustomUserClaims(userRecord.uid, {
            accessLevel: accessLevel
        });
        await db
        .collection("users")
        .doc(userRecord.uid)
        .set({
            name       : name,
            email      : email,
            accessLevel: accessLevel,
            password   : hash
        });
        return res
        .status(200)
            .json({
                message: "User successfully created",
                request: {
                    type: "POST",
                    url : process.env.SERVER + "/admin" + "/create",
                    body: {
                        uid        : req.body.uid,
                        accessLevel: accessLevel,
                        user       : {
                            name    : name,
                            email   : email,
                            password: password
                        }
                    }
                },
                response : {
                    userRecord: userRecord
                }
            });
    })
};

//=====================================================================
//=====================================================================





//=====================================================================
//=====================================================================

async function deleteUser(req, res) {
    await db
        .collection("users")
        .doc(req.body.delete_uid)
        .delete()
        .then(async () => {
            await auth
                .deleteUser(req.body.delete_uid)
                .then(() => {
                    return res
                        .status(200)
                        .json({
                            message: "successfully deleted user",
                            request: {
                                type: "DELETE",
                                url : process.env.SERVER + "/admin" + "/delete",
                                body: {
                                    auth_uid  : req.body.uid,
                                    delete_uid: req.body.delete_uid
                                }
                            }
                        });
                });
        });
};

//=====================================================================
//=====================================================================





//=====================================================================
//=====================================================================

async function getAllUsers(req, res) {
    auth
        .listUsers()
        .then((userRecords) => {
            return res
                .status(200)
                .json({
                    message: "query successul",
                    size   : userRecords.users.length,
                    request: {
                        type: "GET",
                        url : process.env.SERVER + "/admin" + "/",
                        body: {
                            uid: req.body.uid
                        }
                    },
                    response: userRecords.users
                })
        })
}

//=====================================================================
//=====================================================================





//=====================================================================
//=====================================================================

async function updateClaim(req, res) {
    if((req.body.accessLevel > 5) || (req.body.accessLevel <= 0)) {
        return res
            .status(200)
            .json({
                message: "Specified access level not possible"
            });
    };
    await auth
        .setCustomUserClaims(req.body.update_uid, {
            accessLevel: req.body.accessLevel
        })
        .then(async () => {
            const ref = db.collection("users").doc(req.body.update_uid);
            await ref.update({
                accessLevel: req.body.accessLevel
            });
            return res
                .status(200)
                .json({
                    message: "query successful",
                    request: {
                        type: "PATCH",
                        url : process.env.SERVER + "/admin" + "/claims",
                        body: {
                            uid        : req.body.uid,
                            update_uid : req.body.update_uid,
                            accessLevel: req.body.accessLevel
                        }
                    }
                })
        })
}

//=====================================================================
//=====================================================================





module.exports = {
    createUser : createUser,
    deleteUser : deleteUser,
    getAllUsers: getAllUsers,
    updateClaim: updateClaim
}
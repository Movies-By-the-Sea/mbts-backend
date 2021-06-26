const { db, auth } = require("../firebase");
require("dotenv").config({path:"../.env"});




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
    const { uid } = await auth.createUser({
        name,
        password,
        email
    });
    await auth.setCustomUserClaims(uid, {
        accessLevel: accessLevel
    });
    return res
        .status(200)
        .json({
            message: "User successfully created",
            request: {
                type: "POST",
                url : process.env.SERVER + "/admin" + "/create",
                body: {
                    accessLevel: accessLevel,
                    user       : {
                        name    : name,
                        email   : email,
                        password: password
                    }
                }
            },
            response : {
                uid        : uid
            }
        });
};


async function deleteUser(req, res) {
    auth
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
                })
        })
}


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

module.exports = {
    createUser : createUser,
    deleteUser : deleteUser,
    getAllUsers: getAllUsers
}
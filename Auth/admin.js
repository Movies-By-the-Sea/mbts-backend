const admin = require("firebase-admin");
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
    const { uid } = await admin.auth().createUser({
        name,
        password,
        email
    });
    await admin.auth().setCustomUserClaims(uid,{
        accessLevel: accessLevel
    });
    return res
        .status(200)
        .json({
            message: "User successfully created",
            request: {
                type: "POST",
                url : process.env.SERVER + "/admin" + "/createAPIUser"
            },
            response : {
                uid        : uid,
                accessLevel: accessLevel,
                user       : {
                    name    : name,
                    email   : email,
                    password: password
                }
            }
        });
};

module.exports = {
    createUser: createUser
}
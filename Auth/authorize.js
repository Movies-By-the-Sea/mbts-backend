const { db, auth } = require("../firebase");
const admin = require("./admin");
require("dotenv").config({path:"../.env"});

async function isAuthorized(req, res, next, authLevel) {
    await auth
        .getUser(req.body.uid)
        .then((userRecord) => {
            if(userRecord.customClaims['accessLevel'] >= authLevel) {
                return next();
            } else {
                return res
                    .status(400)
                    .json({
                        message : "Access level unauthorized"
                    });
            }
        })
};

module.exports = isAuthorized;
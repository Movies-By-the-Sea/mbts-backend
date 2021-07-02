const { db, auth } = require("../firebase");
const utils = require("../models/utils");
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
                        error : {
                            message : "Access level unauthorized"
                        }
                    });
            }
        })
};


async function sharedAuthorize(uid, author_uid, level) {
    const authLevel = utils.getAccessLevel(uid);
    if((author_uid === uid) || authLevel >= level) {
        return true;
    }
    return false;
}


module.exports = {
    isAuthorized   : isAuthorized,
    sharedAuthorize: sharedAuthorize
};
require("dotenv").config();

function authenticate(req, res, next) {
    if(req.body.auth_id === process.env.ROOT_UID) {
        return next();
    }
    return res.status(401).json({message : "Unauthorized"});
}

module.exports = authenticate;
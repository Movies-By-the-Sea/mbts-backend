
function authenticate(req, res, next) {
    if((req.body.email !== undefined) && (req.body.password != undefined)) {
        return next();
    }
    if(req.body.uid === undefined) {
        return res.status(401).json({message : "Unauthorized"});
    }
    return next();
}

module.exports = authenticate;
const { db, auth } = require("../firebase");
const utils        = require("./utils");
const bcrypt       = require("bcrypt");
require("dotenv").config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);





//==========================================================================================
//==========================================================================================

async function getInfo(req, res) {

    const userDB   = db.collection("users");
    const snapshot = await userDB.where("email","==",req.body.email).get();
    if(snapshot.empty) {
        return utils.formatResponse(req, res, 400, {message: 'No such user with given Email ID found'});
    };
    snapshot.forEach(doc => {
        bcrypt.compare(req.body.password, doc.data().password, (err, result) => {
            if(result) {
                info = {
                    auth    : 'Authorized user',
                    URL     : '/user',
                    response: {
                        uid : doc.id,
                        data: doc.data()
                    }
                }
                return utils.formatResponse(req, res, 200, info);
            } else {
                return utils.formatResponse(req, res, 400, {message: 'Incorrect password. Try again'});
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
        return utils.formatResponse(req, res, 400, {message:'Unauthorized to change Access Level'});
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
            info = {
                remark     : 'User info updated successfully',
                URL        : '/user' + '/update',
                requestType: 'PUT'
            };
            return utils.formatResponse(req, res, 200, info);
        });
    };
}

//==========================================================================================
//==========================================================================================





module.exports = {
    getInfo   : getInfo,
    updateInfo: updateInfo
}
const express  = require('express');
const multer = require('multer')
const path = require('path')
const { v4 : uuidv4 } = require('uuid')
const database = require('../../firebase');
const router   = express.Router();
require('dotenv').config();





// file upload code
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'))
    },
    filename: function (req, file, cb) {
        // console.log(file);
        var datetimestamp = Date.now();
        cb(null, file.originalname)
    }
});

var uploadSingle = multer({ //multer settings
    storage: storage
}).single('poster');







//==================================================================================
// WRTING A REVIEW

function writeReviewData(table, data) {
    let id = uuidv4()
    database
    .ref(table + '/' + id)
    .set(data);
    return id
}

router.post('/upload',  (req, res, next) => {
    uploadSingle(req, res, function(err) {
        if(err) {
            res.json({
                error_code : 1,
                error_desc : err
            });
            return;
        } 
        poster_path = (req.file.path).split('/').slice(-1).pop()
        let data = {
            name      : req.body.name,
            director  : req.body.director,
            genre     : [req.body.genre1, req.body.genre2],
            instagram : req.body.instagram.toLowerCase() == 'true',
            review    : req.body.review,
            year      : parseInt(req.body.year),
            actor     : req.body.actor,
            netflix   : req.body.netflix.toLowerCase() == 'true',
            amazon    : req.body.amazon.toLowerCase() == 'true',
            acting    : parseFloat(req.body.acting),
            story     : parseFloat(req.body.story),
            execution : parseFloat(req.body.execution),
            profundity: parseFloat(req.body.profundity),
            overall   : parseFloat(req.body.overall),
            trailer   : req.body.trailer,
            poster_name    : poster_path
        };
        let id = writeReviewData(req.body.table, data);
        return res
            .status(200)
            .json({
                message : 'Successfully added to Movie-Reviews Database',
                request : {
                    type : 'POST',
                    url : process.env.SERVER + '/upload'
                },
                response : {
                    uuid : id,
                    table : req.body.table,
                    data_uploaded : data
                }
            })
    })
})

//=======================================================================================






module.exports = router;
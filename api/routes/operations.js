const express  = require('express');
const { v4 : uuidv4 } = require('uuid')
const database = require('../../firebase');
const router   = express.Router();
require('dotenv').config();










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
    let data = {
        name       : req.body.name,
        director   : req.body.director,
        genre      : req.body.genre,
        instagram  : req.body.instagram,
        poster_name: req.body.poster_name,
        poster_link: req.body.poster_link
    };
    let table = req.body.table;
    if (table == 'movie-reviews') {
        data.review     = req.body.review;
        data.year       = req.body.year;
        data.actor      = req.body.actor;
        data.netflix    = req.body.netflix;
        data.amazon     = req.body.amazon;
        data.acting     = req.body.acting;
        data.story      = req.body.story;
        data.execution  = req.body.execution;
        data.profundity = req.body.profundity;
        data.overall    = req.body.overall;
        data.trailer    = req.body.trailer;
    }
    else if (table == 'short-film-reviews') {
        data.link        = req.body.link;
        data.description = req.body.description;
        data.duration    = req.body.duration;
    }
    let id = writeReviewData(req.body.table, data)
    return res
        .status(200)
        .json({
            message: 'Successfully added to Movie-Reviews Database',
            request: {
                type: 'POST',
                url : process.env.SERVER + '/upload'
            },
            response : {
                uuid         : id,
                table        : table,
                data_uploaded: data
            }
        })
})

//=======================================================================================






module.exports = router;
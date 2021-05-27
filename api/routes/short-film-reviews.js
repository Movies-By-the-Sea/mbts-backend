const express  = require('express');
const database = require('../../firebase');
const router   = express.Router();
require('dotenv').config();





//=================================================================================
// GET ALL REVIEWS

router.get('/', (req, res, next) => {
    database
    .ref('short-film-reviews')
    .on('value', (snapshot) => {
        return res
            .status(200)
            .json({
                message  : 'success',
                size     : Object.keys(snapshot.val()).length,
                request  : {
                    type     : 'GET',
                    url      : process.env.SERVER + '/short-film-reviews'
                },
                response : snapshot.val()
        });
    });
});

//=================================================================================




//==================================================================================
// GETTING GENERAL INFO

router.get('/general', (req, res, next) => {
    database
    .ref('movie-reviews')
    .on('value', (snapshot) => {

        let reviews = snapshot.val();
        let count   = 0;

        for(item in reviews) {
            if(reviews[item]['instagram']) {
                count++;
            }
        }

        return res
            .status(200)
            .json({
                message     : 'success',
                allReviews  : Object.keys(snapshot.val()).length,
                allInstagram: count
            })
    })
})

//==================================================================================






//=================================================================================
// GET ALL SHORT-FILMS UPDATED ON INSTAGRAM

router.get('/instagram', (req, res, next) => {
    database
    .ref('short-film-reviews')
    .on('value', (snapshot) => {

        let reviews = snapshot.val();
        let movies  = [];
        let count   = 0;

        for(item in reviews) {
            if(reviews[item]['instagram']) {
                movies.push(reviews[item]);
                count++;
            }
        }

        return res
        .status(200)
        .json({
            message  : 'success',
            size     : count,
            request  : {
                type     : 'GET',
                url      : process.env.SERVER + '/short-film-reviews/instagram'
            },
            response : movies
        });

    });
});

//=================================================================================







module.exports = router;
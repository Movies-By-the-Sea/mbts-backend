const express    = require('express');
const database = require('../../firebase');
const router   = express.Router();
require('dotenv').config();




//=================================================================================
// GET ALL REVIEWS

router.get('/', (req, res, next) => {
    database
    .ref('movie-reviews')
    .on('value', (snapshot) => {
        return res
            .status(200)
            .json({
                message : 'success',
                size : Object.keys(snapshot.val()).length,
                request : {
                    type : 'GET',
                    url  : process.env.SERVER + '/movie-reviews'
                },
                response : snapshot.val(),
        });
    });
});

//=================================================================================





//=================================================================================
// GET ALL MOVIES UPDATED ON INSTAGRAM

router.get('/instagram', (req, res, next) => {
    database
    .ref('movie-reviews')
    .on('value', (snapshot) => {

        let reviews = snapshot.val();
        let movies = [];
        let count = 0;

        for(item in reviews) {
            if(reviews[item]['instagram']) {
                movies.push(reviews[item]);
                count++;
            }
        }

        return res
        .status(200)
        .json({
            message : 'success',
            size : count,
            request : {
                type : 'GET',
                url : process.env.SERVER + '/movie-reviews/instagram'
            },
            response : movies
        });

    });
});
//=================================================================================





//=================================================================================
// GET ALL MOVIES AVAILABLE ON AMAZON PRIME

router.get('/amazon-prime', (req, res, next) => {
    database
    .ref('movie-reviews')
    .on('value', (snapshot) => {

        let reviews = snapshot.val();
        let movies = [];
        let count = 0;

        for(item in reviews) {
            if(reviews[item]['amazon']) {
                movies.push(reviews[item]);
                count++;
            }
        }

        return res
        .status(200)
        .json({
            message : 'success',
            size : count,
            request : {
                type : 'GET',
                url : process.env.SERVER + '/movie-reviews/amazon-prime'
            },
            response : movies
        });

    });
});
//=================================================================================





//=================================================================================
// GET ALL MOVIES AVAILABLE ON NETFLIX

router.get('/netflix', (req, res, next) => {
    database
    .ref('movie-reviews')
    .on('value', (snapshot) => {

        let reviews = snapshot.val();
        let movies = [];
        let count = 0;

        for(item in reviews) {
            if(reviews[item]['netflix']) {
                movies.push(reviews[item]);
                count++;
            }
        }

        return res
        .status(200)
        .json({
            message : 'success',
            size : count,
            request : {
                type : 'GET',
                url : process.env.SERVER + '/movie-reviews/netflix'
            },
            response : movies
        });

    });
});
//=================================================================================






module.exports = router;
const express = require('express');
const router = require('../../MBtS/old/api/routes/reviews');
const route = express.Router();

router.use((req, res, next) => {
    const err = new Error('Route Not Found');
    err.status = 400;
    next(err);
})
router.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
});

module.exports = route
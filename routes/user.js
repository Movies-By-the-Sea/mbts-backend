const express         = require('express');
const asyncHandler    = require('express-async-handler');
const isAuthenticated = require("../Auth/authenticate");
const user            = require("../models/users");
const router          = express.Router();



// THESE ROUTES ARE ACCESSIBLE BY ANY USER HAVING VALID UID TOKENS
router.get("/",
    asyncHandler((req, res, next) => isAuthenticated(req, res, next)),
    asyncHandler((req, res)       => user.getInfo(req, res))
);



module.exports = router;
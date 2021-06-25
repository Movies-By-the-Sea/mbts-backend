const express      = require('express');
const asyncHandler = require('express-async-handler');
const isAuthorized = require("../Auth/authorize");
const admin        = require("../Auth/admin");
const router       = express.Router();

// ONLY AUTHLEVEL 5 USERS CAN CREATE OTHER USERS
router.post("/createUser",
    asyncHandler((req, res, next) => isAuthorized(req, res, next, 5)),
    asyncHandler((req, res) => admin.createUser(req, res))
)


module.exports = router;
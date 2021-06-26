const express      = require('express');
const asyncHandler = require('express-async-handler');
const isAuthorized = require("../Auth/authorize");
const admin        = require("../Auth/admin");
const user         = require("../models/users");
const router       = express.Router();



// ONLY AUTHLEVEL 5 USERS CAN CREATE OTHER USERS
router.get("/",
    asyncHandler((req, res, next) => isAuthorized(req, res, next, 5)),
    asyncHandler((req, res)       => admin.getAllUsers(req, res))
);
router.post("/create",
    asyncHandler((req, res, next) => isAuthorized(req, res, next, 5)),
    asyncHandler((req, res)       => admin.createUser(req, res))
)
router.delete("/delete",
    asyncHandler((req, res, next) => isAuthorized(req, res, next, 5)),
    asyncHandler((req, res)       => admin.deleteUser(req, res))
);



// THESE ROUTES ARE ACCESSIBLE BY ANY USER HAVING VALID UID TOKENS
router.get("/user", asyncHandler((req, res) => user.getInfo(req, res)));



module.exports = router;
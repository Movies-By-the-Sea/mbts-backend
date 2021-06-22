const express      = require('express');
const asyncHandler = require('express-async-handler');
const operations   = require("../models/operations");
const reviews      = require("../models/reviews");
const router       = express.Router();


router.get("/",           asyncHandler((req, res) => reviews.getAllReviews(req, res)));
router.get("/get",        asyncHandler((req, res) => reviews.getReviewByID(req, res)));
router.get("/general",    asyncHandler((req, res) => reviews.getGeneralInfo(req, res)));
router.patch("/updateIG", asyncHandler((req, res) => operations.updateIGStatus(req, res)));
router.put("/update",     asyncHandler((req, res) => operations.updateReview(req, res)));
router.post("/upload",    asyncHandler((req, res) => operations.uploadReview(req, res)));
router.delete("/delete",  asyncHandler((req, res) => operations.deleteReview(req, res)));


module.exports = router;
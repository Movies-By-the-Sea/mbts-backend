const express      = require('express');
const asyncHandler = require('express-async-handler');
const insights     = require('../models/ig_insights');
const router       = express.Router();

router.get("/",         asyncHandler((req, res) => insights.getBusinessInfo(req, res)));
router.get("/users",    asyncHandler((req, res) => insights.getDailyUserInsights(req, res)));
router.get("/latest",   asyncHandler((req, res) => insights.getLatestPost(req,res)));
router.get("/insights", asyncHandler((req, res) => insights.getPostInsights(req, res)));


module.exports = router;
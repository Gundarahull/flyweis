const express = require("express");
const { profitCalculator, investAmount, investTranscations } = require("../controllers/investment.controller");
const isAuthenticate = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/profitCalculator", isAuthenticate, profitCalculator);
router.post('/amount',isAuthenticate,investAmount)
router.post('/transcations',isAuthenticate,investTranscations)

module.exports = router;

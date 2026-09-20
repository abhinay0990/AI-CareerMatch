const express = require("express");

const {
    analyzeCareerProfile
} = require("../controllers/careerController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/analyze",
    protect,
    analyzeCareerProfile
);

module.exports = router;
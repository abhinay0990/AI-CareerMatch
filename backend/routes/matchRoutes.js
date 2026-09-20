const express = require("express");

const {
    matchResumeWithJob
} = require("../controllers/matchController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Match resume with a job
router.post(
    "/",
    protect,
    matchResumeWithJob
);

module.exports = router;
const express = require("express");

const {
    getMatchHistory
} = require("../controllers/matchHistoryController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Get logged-in user's match history
router.get(
    "/",
    protect,
    getMatchHistory
);


module.exports = router;
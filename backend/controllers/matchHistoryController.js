const MatchHistory = require("../models/MatchHistory");


// Get user's match history
const getMatchHistory = async (req, res) => {
    try {
        const history = await MatchHistory.find({
            userId: req.userId
        })
            .populate("jobId", "title company location")
            .populate("resumeId", "fileName")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: history.length,
            history
        });

    } catch (error) {
        console.error(
            "Get match history error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to get match history"
        });
    }
};


module.exports = {
    getMatchHistory
};
const Resume = require("../models/Resume");
const Job = require("../models/Job");
const MatchHistory = require("../models/MatchHistory");

const getDashboardStats = async (req, res) => {
    try {
        const userId = req.userId;

        const resumeCount = await Resume.countDocuments({
            userId
        });

        const jobCount = await Job.countDocuments();

        const matchCount = await MatchHistory.countDocuments({
            userId
        });

        const latestResume = await Resume.findOne({
            userId
        }).sort({ createdAt: -1 });

        const recentMatches = await MatchHistory.find({
            userId
        })
            .populate("jobId", "title company")
            .populate("resumeId", "fileName")
            .sort({ createdAt: -1 })
            .limit(5);

        const scoreData = await MatchHistory.aggregate([
            {
                $match: {
                    userId: latestResume
                        ? latestResume.userId
                        : null
                }
            },
            {
                $group: {
                    _id: null,
                    averageScore: {
                        $avg: "$matchScore"
                    }
                }
            }
        ]);

        const averageScore =
            scoreData.length > 0
                ? Math.round(scoreData[0].averageScore)
                : 0;

        res.json({
            success: true,
            stats: {
                resumeCount,
                jobCount,
                matchCount,
                averageScore
            },
            latestResume,
            recentMatches
        });

    } catch (error) {
        console.error(
            "Dashboard error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to load dashboard"
        });
    }
};

module.exports = {
    getDashboardStats
};
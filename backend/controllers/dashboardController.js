const mongoose = require("mongoose");

const Resume = require("../models/Resume");
const Job = require("../models/Job");
const MatchHistory = require("../models/MatchHistory");

const getDashboardStats = async (req, res) => {
    try {
        const userId = req.userId;

        const userObjectId = new mongoose.Types.ObjectId(userId);

        const resumeCount = await Resume.countDocuments({
            userId: userObjectId
        });

        const jobCount = await Job.countDocuments();

        const matchCount = await MatchHistory.countDocuments({
            userId: userObjectId
        });

        const latestResume = await Resume.findOne({
            userId: userObjectId
        }).sort({
            createdAt: -1
        });

        const recentMatches = await MatchHistory.find({
            userId: userObjectId
        })
            .populate("jobId", "title company")
            .populate("resumeId", "fileName")
            .sort({
                createdAt: -1
            })
            .limit(5);

        const scoreData = await MatchHistory.aggregate([
            {
                $match: {
                    userId: userObjectId
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
            error
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
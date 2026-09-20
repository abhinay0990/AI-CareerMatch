const mongoose = require("mongoose");

const matchHistorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        resumeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume",
            required: true
        },

        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true
        },

        matchScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },

        matchedSkills: {
            type: [String],
            default: []
        },

        missingSkills: {
            type: [String],
            default: []
        },

        recommendations: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const MatchHistory = mongoose.model(
    "MatchHistory",
    matchHistorySchema
);

module.exports = MatchHistory;
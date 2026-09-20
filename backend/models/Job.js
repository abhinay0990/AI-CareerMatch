const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        company: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            default: "Remote"
        },

        description: {
            type: String,
            required: true
        },

        skills: {
            type: [String],
            default: []
        },

        experience: {
            type: String,
            default: "Fresher"
        }
    },
    {
        timestamps: true
    }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
const Job = require("../models/Job");

// Create a job
const createJob = async (req, res) => {
    try {
        const {
            title,
            company,
            location,
            description,
            skills,
            experience
        } = req.body;

        if (!title || !company || !description) {
            return res.status(400).json({
                success: false,
                message: "Title, company and description are required"
            });
        }

        const job = await Job.create({
            title,
            company,
            location,
            description,
            skills,
            experience
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            job
        });

    } catch (error) {
        console.error("Create job error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to create job"
        });
    }
};


// Get all jobs
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: jobs.length,
            jobs
        });

    } catch (error) {
        console.error("Get jobs error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to get jobs"
        });
    }
};


module.exports = {
    createJob,
    getJobs
};

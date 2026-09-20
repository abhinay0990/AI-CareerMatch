const Resume = require("../models/Resume");
const Job = require("../models/Job");
const MatchHistory = require("../models/MatchHistory");

const { analyzeResume } = require("../services/aiService");


const matchResumeWithJob = async (req, res) => {
    try {
        const { resumeId, jobId } = req.body;


        // Validate request
        if (!resumeId || !jobId) {
            return res.status(400).json({
                success: false,
                message: "resumeId and jobId are required"
            });
        }


        // Find user's resume
        const resume = await Resume.findOne({
            _id: resumeId,
            userId: req.userId
        });


        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }


        // Find job
        const job = await Job.findById(jobId);


        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }


        // Prepare job requirements
        const jobRequirements = `
Job Title: ${job.title}

Company: ${job.company}

Location: ${job.location}

Experience Required: ${job.experience}

Required Skills:
${job.skills.join(", ")}

Job Description:
${job.description}
`;


        // Run AI analysis
        const analysis = await analyzeResume(
            resume.extractedText,
            jobRequirements
        );


        // Save match result
        const matchHistory = await MatchHistory.create({
            userId: req.userId,
            resumeId: resume._id,
            jobId: job._id,
            matchScore: analysis.matchScore,
            matchedSkills: analysis.matchedSkills,
            missingSkills: analysis.missingSkills,
            recommendations: analysis.recommendations
        });


        // Send response
        res.json({
            success: true,

            resume: {
                id: resume._id,
                fileName: resume.fileName
            },

            job: {
                id: job._id,
                title: job.title,
                company: job.company
            },

            analysis,

            matchHistoryId: matchHistory._id
        });


    } catch (error) {

        console.error(
            "Match error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to match resume with job"
        });
    }
};


module.exports = {
    matchResumeWithJob
};
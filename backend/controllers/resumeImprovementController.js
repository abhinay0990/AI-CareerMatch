const Resume = require("../models/Resume");
const {
    improveResume
} = require("../services/resumeAiService");

const analyzeResumeForImprovement = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            userId: req.userId
        }).sort({
            createdAt: -1
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Please upload a resume first"
            });
        }

        if (!resume.extractedText) {
            return res.status(400).json({
                success: false,
                message: "Resume text is not available"
            });
        }

        const analysis = await improveResume(
            resume.extractedText
        );

        res.json({
            success: true,
            resume: {
                id: resume._id,
                fileName: resume.fileName
            },
            analysis
        });

    } catch (error) {
        console.error(
            "Resume improvement error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to analyze resume for improvement"
        });
    }
};

module.exports = {
    analyzeResumeForImprovement
};
const fs = require("fs");
const path = require("path");

const Resume = require("../models/Resume");
const { PDFParse } = require("pdf-parse");

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume PDF"
            });
        }

        console.log("Multer file object:", req.file);

        // Multer gives us the actual uploaded file path
        const filePath = req.file.path;

        console.log("Multer file path:", filePath);
        console.log("File exists:", fs.existsSync(filePath));

        if (!fs.existsSync(filePath)) {
            return res.status(500).json({
                success: false,
                message: "Uploaded file could not be found"
            });
        }

        // Read PDF
        const pdfBuffer = fs.readFileSync(filePath);

        // Extract PDF text
        const parser = new PDFParse({
            data: pdfBuffer
        });

        const pdfData = await parser.getText();
        const extractedText = pdfData.text;

        await parser.destroy();

        // Save resume
        const resume = await Resume.create({
            userId: req.userId,
            fileName: req.file.originalname,
            filePath: filePath,
            extractedText: extractedText
        });

        res.status(201).json({
            success: true,
            message: "Resume uploaded and text extracted successfully",
            resume: {
                id: resume._id,
                fileName: resume.fileName,
                extractedText: resume.extractedText
            }
        });

    } catch (error) {
        console.error("Resume upload error:", error);

        res.status(500).json({
            success: false,
            message: error.message || "Failed to process resume"
        });
    }
};

const getMyResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            userId: req.userId
        }).sort({ createdAt: -1 });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "No resume found"
            });
        }

        res.json({
            success: true,
            resume
        });

    } catch (error) {
        console.error("Get resume error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to get resume"
        });
    }
};

module.exports = {
    uploadResume,
    getMyResume
};
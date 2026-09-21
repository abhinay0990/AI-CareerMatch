const fs = require("fs");
const path = require("path");

const Resume = require("../models/Resume");
const { PDFParse } = require("pdf-parse");

const uploadResume = async (req, res) => {
    try {
        // 1. Check whether a file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume PDF"
            });
        }

        // 2. Build the absolute path to the uploaded PDF
        const filePath = path.join(
            __dirname,
            "..",
            req.file.path
        );

        console.log("Uploaded file path:", req.file.path);
        console.log("Absolute file path:", filePath);

        // 3. Check whether the file exists
        if (!fs.existsSync(filePath)) {
            console.error("File not found:", filePath);

            return res.status(500).json({
                success: false,
                message: "Uploaded file could not be found"
            });
        }

        // 4. Read the uploaded PDF
        const pdfBuffer = fs.readFileSync(filePath);

        // 5. Extract text from the PDF
        const parser = new PDFParse({
            data: pdfBuffer
        });

        const pdfData = await parser.getText();
        const extractedText = pdfData.text;

        await parser.destroy();

        // 6. Save resume details in MongoDB
        const resume = await Resume.create({
            userId: req.userId,
            fileName: req.file.originalname,
            filePath: filePath,
            extractedText: extractedText
        });

        // 7. Send response
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
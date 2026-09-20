const fs = require("fs");
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

        // 2. Read the uploaded PDF file
        const pdfBuffer = fs.readFileSync(req.file.path);

        // 3. Extract text from the PDF
    const parser = new PDFParse({
    data: pdfBuffer
});

const pdfData = await parser.getText();

const extractedText = pdfData.text;

await parser.destroy();

        // 5. Save resume details in MongoDB
        const resume = await Resume.create({
            userId: req.userId,
            fileName: req.file.originalname,
            filePath: req.file.path,
            extractedText: extractedText
        });

        // 6. Send response
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

        console.error("Resume upload error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to process resume"
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
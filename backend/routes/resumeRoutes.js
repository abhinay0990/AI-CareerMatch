const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
    uploadResume,
    getMyResume
} = require("../controllers/resumeController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "../uploads");

        // Create uploads folder if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    }
});

// Allow PDF files only
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(
            new Error("Only PDF files are allowed"),
            false
        );
    }
};

// Upload configuration
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: fileFilter
});

// Upload resume
router.post(
    "/upload",
    protect,
    upload.single("resume"),
    uploadResume
);

// Get user's latest resume
router.get(
    "/my-resume",
    protect,
    getMyResume
);

// Handle Multer errors
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "Resume file must be smaller than 5 MB"
            });
        }

        return res.status(400).json({
            success: false,
            message: "Resume upload failed"
        });
    }

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    next();
});

module.exports = router;
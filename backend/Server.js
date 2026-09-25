const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const jobRoutes = require("./routes/jobRoutes");
const matchRoutes = require("./routes/matchRoutes");
const matchHistoryRoutes = require("./routes/matchHistoryRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Trust Render's reverse proxy
app.set("trust proxy", 1);

// Connect MongoDB
connectDB();

// Security middleware
app.use(helmet());

// CORS
app.use(
    cors({
        origin: true,
        credentials: true
    })
);

// Parse JSON requests
app.use(express.json());

// Rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});

// Apply rate limit to API routes
app.use("/api", apiLimiter);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/match-history", matchHistoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", googleAuthRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "AI CareerMatch API is running"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const express = require("express");

const {
    createJob,
    getJobs
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// GET ALL JOBS
// Anyone can view jobs
router.get("/", getJobs);


// CREATE JOB
// Login required
router.post("/", protect, createJob);


module.exports = router;
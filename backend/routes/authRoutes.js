const express = require("express");
const {
    body,
    validationResult
} = require("express-validator");

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const router = express.Router();


// Check validation errors
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()[0].msg
        });
    }

    next();
};


// Registration validation
const registerValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail(),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
];


// Login validation
const loginValidation = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
];


// Register
router.post(
    "/register",
    registerValidation,
    validateRequest,
    registerUser
);


// Login
router.post(
    "/login",
    loginValidation,
    validateRequest,
    loginUser
);


module.exports = router;
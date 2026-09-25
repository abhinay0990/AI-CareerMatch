const firebaseAuth = require("../config/firebaseAdmin");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const googleLogin = async (req, res) => {
    try {

        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({
                success: false,
                message: "Google ID token is required"
            });
        }

        console.log("Google ID token received");

        // Verify Firebase ID token
        const decodedToken =
            await firebaseAuth.verifyIdToken(idToken);

        console.log(
            "Firebase user verified:",
            decodedToken.email
        );

        const email = decodedToken.email;
        const name =
            decodedToken.name ||
            decodedToken.email?.split("@")[0] ||
            "Google User";

        const uid = decodedToken.uid;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Google account email not found"
            });
        }

        // Find existing user in MongoDB
        let user = await User.findOne({
            email: email.toLowerCase()
        });

        // Create MongoDB user if it doesn't exist
        if (!user) {

            console.log(
                "Creating new Google user:",
                email
            );

            user = await User.create({
                name: name,
                email: email.toLowerCase(),

                // Random password because
                // Google users don't use your
                // email/password authentication.
                password:
                    `google_${uid}_${Date.now()}`
            });

        } else {

            console.log(
                "Existing user found:",
                email
            );

        }

        // Create your existing AI CareerMatch JWT
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        console.log(
            "AI CareerMatch JWT created"
        );

        return res.json({
            success: true,
            message: "Google login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.error(
            "Google authentication error:"
        );

        console.error(
            error
        );

        return res.status(401).json({
            success: false,
            message: "Google authentication failed"
        });
    }
};

module.exports = {
    googleLogin
};
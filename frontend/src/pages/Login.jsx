import { useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import { LogIn, Mail, Lock } from "lucide-react";

import {
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

import { auth } from "../firebase";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const navigate = useNavigate();

    // ==========================================
    // EMAIL + PASSWORD LOGIN
    // ==========================================

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await axios.post(
                "https://ai-careermatch-v3d4.onrender.com/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert("Login successful!");

            navigate("/dashboard");

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // GOOGLE LOGIN
    // ==========================================

    const handleGoogleLogin = async () => {

        try {

            setGoogleLoading(true);

            // Create Google provider
            const provider = new GoogleAuthProvider();

            // Open Google sign-in popup
            const result = await signInWithPopup(
                auth,
                provider
            );

            // Firebase user
            const firebaseUser = result.user;

            console.log(
                "Google account:",
                firebaseUser.email
            );

            // Get Firebase ID token
            const firebaseToken =
                await firebaseUser.getIdToken();

            console.log(
                "Firebase token received:",
                !!firebaseToken
            );

            // Send Firebase token
            // to LOCAL Node.js backend
            const response = await axios.post(
                 "https://ai-careermatch-v3d4.onrender.com/api/auth/google",
                {
                    idToken: firebaseToken
                }
            );

            console.log(
                "Backend response:",
                response.data
            );

            // Save YOUR application's JWT
            localStorage.setItem(
                "token",
                response.data.token
            );

            alert("Google login successful!");

            // Go to dashboard
            navigate("/dashboard");

        } catch (error) {

            console.error(
                "Google login error:",
                error
            );

            console.error(
                "Backend response:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                error.message ||
                "Google login failed"
            );

        } finally {

            setGoogleLoading(false);

        }
    };


    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px"
            }}
        >

            <div
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    background: "white",
                    padding: "40px",
                    borderRadius: "16px",
                    boxShadow:
                        "0 10px 35px rgba(0,0,0,0.08)"
                }}
            >

                {/* HEADER */}

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "30px"
                    }}
                >

                    <div
                        style={{
                            display: "inline-flex",
                            padding: "14px",
                            borderRadius: "14px",
                            background: "#172033",
                            color: "white",
                            marginBottom: "15px"
                        }}
                    >

                        <LogIn size={26} />

                    </div>

                    <h1
                        style={{
                            marginBottom: "8px"
                        }}
                    >
                        AI CareerMatch
                    </h1>

                    <p
                        style={{
                            color: "#667085"
                        }}
                    >
                        Sign in to continue your career journey
                    </p>

                </div>


                {/* EMAIL + PASSWORD */}

                <form onSubmit={handleLogin}>

                    {/* EMAIL */}

                    <label>
                        Email
                    </label>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #d0d5dd",
                            borderRadius: "10px",
                            padding: "0 12px",
                            marginTop: "8px",
                            marginBottom: "18px"
                        }}
                    >

                        <Mail
                            size={18}
                            color="#667085"
                        />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            required
                            style={{
                                width: "100%",
                                border: "none",
                                outline: "none",
                                padding: "13px 10px"
                            }}
                        />

                    </div>


                    {/* PASSWORD */}

                    <label>
                        Password
                    </label>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #d0d5dd",
                            borderRadius: "10px",
                            padding: "0 12px",
                            marginTop: "8px",
                            marginBottom: "24px"
                        }}
                    >

                        <Lock
                            size={18}
                            color="#667085"
                        />

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            required
                            style={{
                                width: "100%",
                                border: "none",
                                outline: "none",
                                padding: "13px 10px"
                            }}
                        />

                    </div>


                    {/* SIGN IN */}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "14px",
                            border: "none",
                            borderRadius: "10px",
                            background: "#172033",
                            color: "white",
                            fontWeight: "600",
                            fontSize: "16px",
                            cursor: loading
                                ? "not-allowed"
                                : "pointer"
                        }}
                    >

                        {loading
                            ? "Signing in..."
                            : "Sign In"}

                    </button>

                </form>


                {/* DIVIDER */}

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        margin: "24px 0"
                    }}
                >

                    <div
                        style={{
                            flex: 1,
                            height: "1px",
                            background: "#e4e7ec"
                        }}
                    />

                    <span
                        style={{
                            color: "#667085",
                            fontSize: "14px"
                        }}
                    >
                        OR
                    </span>

                    <div
                        style={{
                            flex: 1,
                            height: "1px",
                            background: "#e4e7ec"
                        }}
                    />

                </div>


                {/* GOOGLE LOGIN */}

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={googleLoading}
                    style={{
                        width: "100%",
                        padding: "13px",
                        border: "1px solid #d0d5dd",
                        borderRadius: "10px",
                        background: "white",
                        color: "#172033",
                        fontWeight: "600",
                        fontSize: "15px",
                        cursor: googleLoading
                            ? "not-allowed"
                            : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px"
                    }}
                >

                    <span
                        style={{
                            fontSize: "20px",
                            fontWeight: "700"
                        }}
                    >
                        G
                    </span>

                    {googleLoading
                        ? "Connecting..."
                        : "Continue with Google"}

                </button>


                {/* REGISTER */}

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "24px",
                        color: "#667085"
                    }}
                >

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        style={{
                            color: "#172033",
                            fontWeight: "600"
                        }}
                    >
                        Create Account
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;
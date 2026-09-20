import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem("token", response.data.token);

            alert("Login successful!");

            navigate("/dashboard");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
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
                    boxShadow: "0 10px 35px rgba(0,0,0,0.08)"
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
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

                    <h1 style={{ marginBottom: "8px" }}>
                        AI CareerMatch
                    </h1>

                    <p style={{ color: "#667085" }}>
                        Sign in to continue your career journey
                    </p>
                </div>

                <form onSubmit={handleLogin}>

                    <label>Email</label>

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
                        <Mail size={18} color="#667085" />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                border: "none",
                                outline: "none",
                                padding: "13px 10px"
                            }}
                        />
                    </div>

                    <label>Password</label>

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
                        <Lock size={18} color="#667085" />

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                border: "none",
                                outline: "none",
                                padding: "13px 10px"
                            }}
                        />
                    </div>

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
                            fontSize: "16px"
                        }}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

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
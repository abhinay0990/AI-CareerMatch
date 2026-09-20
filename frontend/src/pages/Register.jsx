import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus } from "lucide-react";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            console.log(response.data);

            alert("Registration successful!");

            navigate("/login");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Registration failed"
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
                        <UserPlus size={26} />
                    </div>

                    <h1 style={{ marginBottom: "8px" }}>
                        AI CareerMatch
                    </h1>

                    <p style={{ color: "#667085" }}>
                        Create your account and start matching jobs with AI
                    </p>

                </div>


                <form onSubmit={handleRegister}>

                    {/* NAME */}

                    <label>Full Name</label>

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
                        <User size={18} color="#667085" />

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
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


                    {/* EMAIL */}

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
                            onChange={(e) =>
                                setEmail(e.target.value)
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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
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


                    {/* BUTTON */}

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
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>


                {/* LOGIN */}

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "24px",
                        color: "#667085"
                    }}
                >
                    Already have an account?{" "}

                    <Link
                        to="/login"
                        style={{
                            color: "#172033",
                            fontWeight: "600"
                        }}
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;
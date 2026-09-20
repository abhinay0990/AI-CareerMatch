import { Link } from "react-router-dom";
import { BrainCircuit, Home, ArrowLeft } from "lucide-react";

function NotFound() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f5f7fb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "25px"
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "550px",
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "18px",
                    padding: "50px 35px",
                    textAlign: "center",
                    boxShadow:
                        "0 8px 25px rgba(0,0,0,0.05)"
                }}
            >

                {/* LOGO */}

                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "60px",
                        height: "60px",
                        borderRadius: "15px",
                        background: "#eef2ff",
                        color: "#4f46e5",
                        marginBottom: "22px"
                    }}
                >
                    <BrainCircuit size={30} />
                </div>


                {/* 404 */}

                <div
                    style={{
                        fontSize: "72px",
                        fontWeight: "800",
                        color: "#172033",
                        lineHeight: "1",
                        marginBottom: "15px"
                    }}
                >
                    404
                </div>


                <h1
                    style={{
                        fontSize: "25px",
                        color: "#172033",
                        marginBottom: "10px"
                    }}
                >
                    Page not found
                </h1>


                <p
                    style={{
                        color: "#667085",
                        fontSize: "15px",
                        lineHeight: "1.6",
                        maxWidth: "420px",
                        margin: "0 auto 28px"
                    }}
                >
                    The page you're looking for doesn't exist
                    or may have been moved.
                </p>


                {/* BUTTON */}

                <Link to="/">
                    <button
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            border: "none",
                            borderRadius: "9px",
                            background: "#172033",
                            color: "white",
                            padding: "13px 20px",
                            fontWeight: "600",
                            fontSize: "14px",
                            cursor: "pointer"
                        }}
                    >
                        <Home size={17} />
                        Back to Home
                    </button>
                </Link>


                <div
                    style={{
                        marginTop: "18px"
                    }}
                >
                    <Link
                        to="/dashboard"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            color: "#667085",
                            fontSize: "13px",
                            fontWeight: "600"
                        }}
                    >
                        <ArrowLeft size={15} />
                        Go to Dashboard
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default NotFound;
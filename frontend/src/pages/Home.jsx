import { Link } from "react-router-dom";
import {
    BrainCircuit,
    FileText,
    Briefcase,
    Sparkles,
    ArrowRight,
    CheckCircle2
} from "lucide-react";

function Home() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f5f7fb",
                color: "#172033"
            }}
        >

            {/* NAVBAR */}

            <nav
                style={{
                    height: "70px",
                    background: "white",
                    borderBottom: "1px solid #e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 6%"
                }}
            >

                <Link
                    to="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        fontSize: "19px",
                        fontWeight: "700",
                        color: "#172033"
                    }}
                >
                    <BrainCircuit size={25} />
                    AI CareerMatch
                </Link>


                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                    }}
                >

                    <Link
                        to="/login"
                        style={{
                            padding: "9px 16px",
                            color: "#475467",
                            fontWeight: "600",
                            fontSize: "14px"
                        }}
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        style={{
                            padding: "10px 17px",
                            borderRadius: "8px",
                            background: "#172033",
                            color: "white",
                            fontWeight: "600",
                            fontSize: "14px"
                        }}
                    >
                        Get Started
                    </Link>

                </div>

            </nav>


            {/* HERO */}

            <main>

                <section
                    style={{
                        maxWidth: "1100px",
                        margin: "0 auto",
                        padding: "85px 25px 70px",
                        textAlign: "center"
                    }}
                >

                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "7px",
                            padding: "8px 14px",
                            background: "#eef2ff",
                            color: "#4f46e5",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "600",
                            marginBottom: "20px"
                        }}
                    >
                        <Sparkles size={15} />
                        AI-powered career platform
                    </div>


                    <h1
                        style={{
                            fontSize: "48px",
                            lineHeight: "1.15",
                            maxWidth: "800px",
                            margin: "0 auto 20px",
                            letterSpacing: "-1px"
                        }}
                    >
                        Find jobs that match
                        <br />
                        <span style={{ color: "#4f46e5" }}>
                            your skills
                        </span>
                    </h1>


                    <p
                        style={{
                            maxWidth: "650px",
                            margin: "0 auto 30px",
                            color: "#667085",
                            fontSize: "17px",
                            lineHeight: "1.7"
                        }}
                    >
                        Upload your resume, explore job opportunities,
                        and use AI to understand your skills,
                        missing requirements, and job compatibility.
                    </p>


                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "12px",
                            flexWrap: "wrap"
                        }}
                    >

                        <Link to="/register">
                            <button
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "13px 21px",
                                    border: "none",
                                    borderRadius: "9px",
                                    background: "#172033",
                                    color: "white",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    cursor: "pointer"
                                }}
                            >
                                Start Matching
                                <ArrowRight size={17} />
                            </button>
                        </Link>


                        <Link to="/login">
                            <button
                                style={{
                                    padding: "12px 21px",
                                    border: "1px solid #d0d5dd",
                                    borderRadius: "9px",
                                    background: "white",
                                    color: "#475467",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    cursor: "pointer"
                                }}
                            >
                                Sign In
                            </button>
                        </Link>

                    </div>

                </section>


                {/* FEATURES */}

                <section
                    style={{
                        maxWidth: "1100px",
                        margin: "0 auto",
                        padding: "20px 25px 80px"
                    }}
                >

                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "35px"
                        }}
                    >

                        <h2
                            style={{
                                fontSize: "28px",
                                marginBottom: "9px"
                            }}
                        >
                            Everything you need for smarter job matching
                        </h2>

                        <p
                            style={{
                                color: "#667085",
                                fontSize: "15px"
                            }}
                        >
                            One platform to connect your resume
                            with the right opportunities.
                        </p>

                    </div>


                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "20px"
                        }}
                    >

                        {/* FEATURE 1 */}

                        <div
                            style={{
                                background: "white",
                                border: "1px solid #e5e7eb",
                                borderRadius: "16px",
                                padding: "28px",
                                boxShadow:
                                    "0 4px 15px rgba(0,0,0,0.04)"
                            }}
                        >

                            <div
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "12px",
                                    background: "#eef2ff",
                                    color: "#4f46e5",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "20px"
                                }}
                            >
                                <FileText size={24} />
                            </div>

                            <h3
                                style={{
                                    marginBottom: "10px"
                                }}
                            >
                                Resume Analysis
                            </h3>

                            <p
                                style={{
                                    color: "#667085",
                                    fontSize: "14px",
                                    lineHeight: "1.6"
                                }}
                            >
                                Upload your PDF resume and extract
                                your skills and experience automatically.
                            </p>

                        </div>


                        {/* FEATURE 2 */}

                        <div
                            style={{
                                background: "white",
                                border: "1px solid #e5e7eb",
                                borderRadius: "16px",
                                padding: "28px",
                                boxShadow:
                                    "0 4px 15px rgba(0,0,0,0.04)"
                            }}
                        >

                            <div
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "12px",
                                    background: "#ecfdf3",
                                    color: "#039855",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "20px"
                                }}
                            >
                                <Briefcase size={24} />
                            </div>

                            <h3
                                style={{
                                    marginBottom: "10px"
                                }}
                            >
                                Job Discovery
                            </h3>

                            <p
                                style={{
                                    color: "#667085",
                                    fontSize: "14px",
                                    lineHeight: "1.6"
                                }}
                            >
                                Browse available job opportunities
                                and search by skills, company, or location.
                            </p>

                        </div>


                        {/* FEATURE 3 */}

                        <div
                            style={{
                                background: "white",
                                border: "1px solid #e5e7eb",
                                borderRadius: "16px",
                                padding: "28px",
                                boxShadow:
                                    "0 4px 15px rgba(0,0,0,0.04)"
                            }}
                        >

                            <div
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "12px",
                                    background: "#fff7ed",
                                    color: "#ea580c",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "20px"
                                }}
                            >
                                <Sparkles size={24} />
                            </div>

                            <h3
                                style={{
                                    marginBottom: "10px"
                                }}
                            >
                                AI Job Matching
                            </h3>

                            <p
                                style={{
                                    color: "#667085",
                                    fontSize: "14px",
                                    lineHeight: "1.6"
                                }}
                            >
                                Get a match score, matched skills,
                                missing skills, and practical recommendations.
                            </p>

                        </div>

                    </div>

                </section>


                {/* HOW IT WORKS */}

                <section
                    style={{
                        background: "white",
                        borderTop: "1px solid #e5e7eb",
                        borderBottom: "1px solid #e5e7eb"
                    }}
                >

                    <div
                        style={{
                            maxWidth: "1000px",
                            margin: "0 auto",
                            padding: "65px 25px"
                        }}
                    >

                        <div
                            style={{
                                textAlign: "center",
                                marginBottom: "40px"
                            }}
                        >

                            <h2
                                style={{
                                    fontSize: "28px",
                                    marginBottom: "9px"
                                }}
                            >
                                How it works
                            </h2>

                            <p
                                style={{
                                    color: "#667085"
                                }}
                            >
                                Three simple steps to analyze your
                                career opportunities.
                            </p>

                        </div>


                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(240px, 1fr))",
                                gap: "25px"
                            }}
                        >

                            <div>
                                <CheckCircle2
                                    size={24}
                                    color="#4f46e5"
                                />

                                <h3
                                    style={{
                                        marginTop: "15px",
                                        marginBottom: "8px"
                                    }}
                                >
                                    1. Upload
                                </h3>

                                <p
                                    style={{
                                        color: "#667085",
                                        fontSize: "14px",
                                        lineHeight: "1.6"
                                    }}
                                >
                                    Upload your latest resume as a PDF.
                                </p>
                            </div>


                            <div>
                                <CheckCircle2
                                    size={24}
                                    color="#4f46e5"
                                />

                                <h3
                                    style={{
                                        marginTop: "15px",
                                        marginBottom: "8px"
                                    }}
                                >
                                    2. Choose a job
                                </h3>

                                <p
                                    style={{
                                        color: "#667085",
                                        fontSize: "14px",
                                        lineHeight: "1.6"
                                    }}
                                >
                                    Browse jobs and select an opportunity
                                    you want to analyze.
                                </p>
                            </div>


                            <div>
                                <CheckCircle2
                                    size={24}
                                    color="#4f46e5"
                                />

                                <h3
                                    style={{
                                        marginTop: "15px",
                                        marginBottom: "8px"
                                    }}
                                >
                                    3. Get AI insights
                                </h3>

                                <p
                                    style={{
                                        color: "#667085",
                                        fontSize: "14px",
                                        lineHeight: "1.6"
                                    }}
                                >
                                    See your match score, skill gaps,
                                    and recommendations.
                                </p>
                            </div>

                        </div>

                    </div>

                </section>


                {/* FOOTER */}

                <footer
                    style={{
                        padding: "30px 25px",
                        textAlign: "center",
                        color: "#667085",
                        fontSize: "13px"
                    }}
                >
                    © 2026 AI CareerMatch. Built with React,
                    Node.js, MongoDB and AI.
                </footer>

            </main>

        </div>
    );
}

export default Home;
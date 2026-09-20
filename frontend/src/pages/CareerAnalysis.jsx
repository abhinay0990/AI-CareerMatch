import { useState } from "react";
import {
    Sparkles,
    BrainCircuit,
    CheckCircle2,
    AlertTriangle,
    BookOpen,
    Briefcase,
    Target,
    Loader2,
    ArrowLeft
} from "lucide-react";

import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function CareerAnalysis() {
    const [analysis, setAnalysis] = useState(null);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleAnalyze = async () => {
        try {
            setLoading(true);
            setMessage("");

            const response = await api.get(
                "/career/analyze"
            );

            setAnalysis(response.data.analysis);
            setResume(response.data.resume);

        } catch (error) {
            console.error(
                "Career analysis error:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Career analysis failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f5f7fb"
            }}
        >
            <Navbar />

            <main
                style={{
                    maxWidth: "1050px",
                    margin: "0 auto",
                    padding: "45px 25px"
                }}
            >
                <Link
                    to="/dashboard"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        color: "#667085",
                        fontSize: "13px",
                        fontWeight: "600",
                        marginBottom: "25px"
                    }}
                >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Link>

                {/* Header */}

                <div
                    style={{
                        marginBottom: "30px"
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "7px",
                            padding: "7px 12px",
                            background: "#eef2ff",
                            color: "#4f46e5",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "600",
                            marginBottom: "14px"
                        }}
                    >
                        <BrainCircuit size={15} />
                        AI Career Intelligence
                    </div>

                    <h1
                        style={{
                            fontSize: "32px",
                            color: "#172033",
                            marginBottom: "8px"
                        }}
                    >
                        Career Analysis
                    </h1>

                    <p
                        style={{
                            color: "#667085",
                            fontSize: "15px",
                            lineHeight: "1.6"
                        }}
                    >
                        Discover your current skills, identify
                        skill gaps and get AI-powered career
                        guidance based on your resume.
                    </p>
                </div>

                {/* Analyze Card */}

                {!analysis && (
                    <div
                        style={{
                            background: "white",
                            border:
                                "1px solid #e5e7eb",
                            borderRadius: "16px",
                            padding: "45px 30px",
                            textAlign: "center",
                            boxShadow:
                                "0 4px 15px rgba(0,0,0,0.04)",
                            marginBottom: "20px"
                        }}
                    >
                        <div
                            style={{
                                width: "72px",
                                height: "72px",
                                margin: "0 auto 20px",
                                borderRadius: "18px",
                                background: "#eef2ff",
                                color: "#4f46e5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Sparkles size={35} />
                        </div>

                        <h2
                            style={{
                                color: "#172033",
                                marginBottom: "10px"
                            }}
                        >
                            Analyze your career profile
                        </h2>

                        <p
                            style={{
                                color: "#667085",
                                maxWidth: "520px",
                                margin:
                                    "0 auto 25px",
                                lineHeight: "1.6",
                                fontSize: "14px"
                            }}
                        >
                            AI will analyze your latest uploaded
                            resume and identify your strengths,
                            skill gaps, suitable roles and
                            learning priorities.
                        </p>

                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            style={{
                                border: "none",
                                borderRadius: "10px",
                                background: "#172033",
                                color: "white",
                                padding: "13px 23px",
                                fontWeight: "600",
                                fontSize: "14px",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                opacity: loading
                                    ? 0.7
                                    : 1
                            }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} />
                                    Analyzing Career...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    Analyze My Career
                                </>
                            )}
                        </button>

                        {message && (
                            <div
                                style={{
                                    marginTop: "20px",
                                    padding: "13px",
                                    background: "#fef3f2",
                                    border:
                                        "1px solid #fecdca",
                                    borderRadius: "9px",
                                    color: "#b42318",
                                    fontSize: "13px"
                                }}
                            >
                                {message}
                            </div>
                        )}
                    </div>
                )}

                {/* Results */}

                {analysis && (
                    <>
                        {/* Resume Used */}

                        {resume && (
                            <div
                                style={{
                                    background: "white",
                                    border:
                                        "1px solid #e5e7eb",
                                    borderRadius: "12px",
                                    padding: "15px 18px",
                                    marginBottom: "20px",
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    gap: "10px"
                                }}
                            >
                                <CheckCircle2
                                    size={18}
                                    color="#039855"
                                />

                                <span
                                    style={{
                                        color: "#475467",
                                        fontSize: "13px"
                                    }}
                                >
                                    Analysis based on{" "}
                                    <strong>
                                        {resume.fileName}
                                    </strong>
                                </span>
                            </div>
                        )}

                        {/* Existing Skills */}

                        <div
                            style={{
                                background: "white",
                                border:
                                    "1px solid #e5e7eb",
                                borderRadius: "16px",
                                padding: "25px",
                                marginBottom: "20px"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    gap: "9px",
                                    marginBottom:
                                        "18px"
                                }}
                            >
                                <CheckCircle2
                                    size={21}
                                    color="#039855"
                                />

                                <h2
                                    style={{
                                        fontSize: "18px",
                                        color: "#172033"
                                    }}
                                >
                                    Your Existing Skills
                                </h2>
                            </div>

                            {analysis.existingSkills
                                ?.length > 0 ? (
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap:
                                            "wrap",
                                        gap: "8px"
                                    }}
                                >
                                    {analysis.existingSkills.map(
                                        (
                                            skill,
                                            index
                                        ) => (
                                            <span
                                                key={
                                                    index
                                                }
                                                style={{
                                                    padding:
                                                        "7px 11px",
                                                    background:
                                                        "#ecfdf3",
                                                    color:
                                                        "#027a48",
                                                    borderRadius:
                                                        "8px",
                                                    fontSize:
                                                        "13px",
                                                    fontWeight:
                                                        "500"
                                                }}
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p
                                    style={{
                                        color:
                                            "#98a2b3",
                                        fontSize:
                                            "13px"
                                    }}
                                >
                                    No existing skills
                                    identified.
                                </p>
                            )}
                        </div>

                        {/* Skill Gaps + Recommended Skills */}

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(320px, 1fr))",
                                gap: "20px",
                                marginBottom: "20px"
                            }}
                        >
                            {/* Skill Gaps */}

                            <div
                                style={{
                                    background:
                                        "white",
                                    border:
                                        "1px solid #e5e7eb",
                                    borderRadius:
                                        "16px",
                                    padding:
                                        "25px"
                                }}
                            >
                                <div
                                    style={{
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        gap: "9px",
                                        marginBottom:
                                            "18px"
                                    }}
                                >
                                    <AlertTriangle
                                        size={21}
                                        color="#d92d20"
                                    />

                                    <h2
                                        style={{
                                            fontSize:
                                                "18px",
                                            color:
                                                "#172033"
                                        }}
                                    >
                                        Skill Gaps
                                    </h2>
                                </div>

                                {analysis.skillGaps
                                    ?.length > 0 ? (
                                    <ul
                                        style={{
                                            paddingLeft:
                                                "20px",
                                            color:
                                                "#475467",
                                            fontSize:
                                                "13px",
                                            lineHeight:
                                                "1.7"
                                        }}
                                    >
                                        {analysis.skillGaps.map(
                                            (
                                                skill,
                                                index
                                            ) => (
                                                <li
                                                    key={
                                                        index
                                                    }
                                                >
                                                    {skill}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                ) : (
                                    <p
                                        style={{
                                            color:
                                                "#027a48",
                                            fontSize:
                                                "13px"
                                        }}
                                    >
                                        No major skill
                                        gaps identified.
                                    </p>
                                )}
                            </div>

                            {/* Recommended Skills */}

                            <div
                                style={{
                                    background:
                                        "white",
                                    border:
                                        "1px solid #e5e7eb",
                                    borderRadius:
                                        "16px",
                                    padding:
                                        "25px"
                                }}
                            >
                                <div
                                    style={{
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        gap: "9px",
                                        marginBottom:
                                            "18px"
                                    }}
                                >
                                    <BookOpen
                                        size={21}
                                        color="#4f46e5"
                                    />

                                    <h2
                                        style={{
                                            fontSize:
                                                "18px",
                                            color:
                                                "#172033"
                                        }}
                                    >
                                        Skills to Learn
                                    </h2>
                                </div>

                                {analysis.recommendedSkills
                                    ?.length > 0 ? (
                                    <div
                                        style={{
                                            display:
                                                "flex",
                                            flexWrap:
                                                "wrap",
                                            gap: "8px"
                                        }}
                                    >
                                        {analysis.recommendedSkills.map(
                                            (
                                                skill,
                                                index
                                            ) => (
                                                <span
                                                    key={
                                                        index
                                                    }
                                                    style={{
                                                        padding:
                                                            "7px 11px",
                                                        background:
                                                            "#eef2ff",
                                                        color:
                                                            "#4f46e5",
                                                        borderRadius:
                                                            "8px",
                                                        fontSize:
                                                            "13px",
                                                        fontWeight:
                                                            "500"
                                                    }}
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <p
                                        style={{
                                            color:
                                                "#98a2b3",
                                            fontSize:
                                                "13px"
                                        }}
                                    >
                                        No additional
                                        skills suggested.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Career Roles */}

                        <div
                            style={{
                                background: "white",
                                border:
                                    "1px solid #e5e7eb",
                                borderRadius: "16px",
                                padding: "25px",
                                marginBottom: "20px"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    gap: "9px",
                                    marginBottom:
                                        "18px"
                                }}
                            >
                                <Briefcase
                                    size={21}
                                    color="#039855"
                                />

                                <h2
                                    style={{
                                        fontSize: "18px",
                                        color: "#172033"
                                    }}
                                >
                                    Suitable Career Roles
                                </h2>
                            </div>

                            {analysis.careerRoles
                                ?.length > 0 ? (
                                <div
                                    style={{
                                        display:
                                            "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fit, minmax(220px, 1fr))",
                                        gap: "10px"
                                    }}
                                >
                                    {analysis.careerRoles.map(
                                        (
                                            role,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    index
                                                }
                                                style={{
                                                    padding:
                                                        "14px",
                                                    background:
                                                        "#f8fafc",
                                                    borderRadius:
                                                        "9px",
                                                    border:
                                                        "1px solid #eaecf0",
                                                    fontSize:
                                                        "14px",
                                                    fontWeight:
                                                        "600",
                                                    color:
                                                        "#344054"
                                                }}
                                            >
                                                {role}
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p
                                    style={{
                                        color:
                                            "#98a2b3",
                                        fontSize:
                                            "13px"
                                    }}
                                >
                                    No career roles
                                    identified.
                                </p>
                            )}
                        </div>

                        {/* Learning Priorities */}

                        <div
                            style={{
                                background: "white",
                                border:
                                    "1px solid #e5e7eb",
                                borderRadius: "16px",
                                padding: "25px",
                                marginBottom: "20px"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    gap: "9px",
                                    marginBottom:
                                        "20px"
                                }}
                            >
                                <Target
                                    size={21}
                                    color="#ea580c"
                                />

                                <h2
                                    style={{
                                        fontSize: "18px",
                                        color: "#172033"
                                    }}
                                >
                                    Learning Priorities
                                </h2>
                            </div>

                            {analysis.learningPriorities
                                ?.length > 0 ? (
                                analysis.learningPriorities.map(
                                    (
                                        priority,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                index
                                            }
                                            style={{
                                                display:
                                                    "flex",
                                                gap:
                                                    "12px",
                                                padding:
                                                    "14px 0",
                                                borderBottom:
                                                    index !==
                                                    analysis
                                                        .learningPriorities
                                                        .length -
                                                        1
                                                        ? "1px solid #f0f2f5"
                                                        : "none"
                                            }}
                                        >
                                            <span
                                                style={{
                                                    minWidth:
                                                        "28px",
                                                    height:
                                                        "28px",
                                                    borderRadius:
                                                        "50%",
                                                    background:
                                                        "#fff7ed",
                                                    color:
                                                        "#ea580c",
                                                    display:
                                                        "flex",
                                                    alignItems:
                                                        "center",
                                                    justifyContent:
                                                        "center",
                                                    fontSize:
                                                        "12px",
                                                    fontWeight:
                                                        "700"
                                                }}
                                            >
                                                {index +
                                                    1}
                                            </span>

                                            <p
                                                style={{
                                                    color:
                                                        "#475467",
                                                    fontSize:
                                                        "14px",
                                                    lineHeight:
                                                        "1.6"
                                                }}
                                            >
                                                {
                                                    priority
                                                }
                                            </p>
                                        </div>
                                    )
                                )
                            ) : (
                                <p
                                    style={{
                                        color:
                                            "#98a2b3",
                                        fontSize:
                                            "13px"
                                    }}
                                >
                                    No learning priorities
                                    available.
                                </p>
                            )}
                        </div>

                        {/* Analyze Again */}

                        <div
                            style={{
                                textAlign: "center",
                                paddingBottom: "20px"
                            }}
                        >
                            <button
                                onClick={() => {
                                    setAnalysis(null);
                                    setResume(null);
                                    setMessage("");
                                }}
                                style={{
                                    display:
                                        "inline-flex",
                                    alignItems:
                                        "center",
                                    gap: "8px",
                                    border:
                                        "1px solid #d0d5dd",
                                    borderRadius:
                                        "9px",
                                    background:
                                        "white",
                                    color:
                                        "#344054",
                                    padding:
                                        "11px 17px",
                                    fontWeight:
                                        "600",
                                    fontSize:
                                        "13px"
                                }}
                            >
                                Analyze Again
                            </button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default CareerAnalysis;
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

import {
    Sparkles,
    CheckCircle2,
    AlertCircle,
    Lightbulb,
    Briefcase,
    Loader2,
    Target,
    ArrowLeft,
    History,
    RotateCcw
} from "lucide-react";

function Match() {
    const { jobId } = useParams();

    const [resume, setResume] = useState(null);
    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const analyzeMatch = async () => {
        try {
            setLoading(true);
            setError("");
            setResult(null);

            const resumeResponse = await api.get(
                "/resumes/my-resume"
            );

            const latestResume =
                resumeResponse.data.resume;

            setResume(latestResume);

            const matchResponse = await api.post(
                "/matches",
                {
                    resumeId: latestResume._id,
                    jobId: jobId
                }
            );

            setResult(matchResponse.data);
        } catch (err) {
            console.error(
                "Match analysis error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to analyze resume."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        analyzeMatch();
    }, [jobId]);

    const getScoreLabel = (score) => {
        if (score >= 90) return "Excellent Match";
        if (score >= 75) return "Strong Match";
        if (score >= 60) return "Moderate Match";
        if (score >= 40) return "Partial Match";
        return "Low Match";
    };

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#f5f7fb"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        minHeight: "70vh",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "15px"
                    }}
                >
                    <Loader2
                        size={38}
                        color="#4f46e5"
                        style={{
                            animation:
                                "spin 1s linear infinite"
                        }}
                    />

                    <h2 style={{ color: "#172033" }}>
                        AI is analyzing your resume...
                    </h2>

                    <p
                        style={{
                            color: "#667085",
                            fontSize: "14px"
                        }}
                    >
                        Please wait while we compare your
                        skills with this job.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#f5f7fb"
                }}
            >
                <main
                    style={{
                        maxWidth: "700px",
                        margin: "0 auto",
                        padding: "80px 20px",
                        textAlign: "center"
                    }}
                >
                    <AlertCircle
                        size={50}
                        color="#d92d20"
                    />

                    <h2
                        style={{
                            marginTop: "18px",
                            color: "#172033"
                        }}
                    >
                        Analysis Failed
                    </h2>

                    <p
                        style={{
                            marginTop: "10px",
                            color: "#667085"
                        }}
                    >
                        {error}
                    </p>

                    <div
                        style={{
                            marginTop: "25px",
                            display: "flex",
                            justifyContent: "center",
                            gap: "12px",
                            flexWrap: "wrap"
                        }}
                    >
                        <button
                            onClick={analyzeMatch}
                            style={{
                                border: "none",
                                background: "#172033",
                                color: "white",
                                padding: "12px 20px",
                                borderRadius: "9px",
                                fontWeight: "600"
                            }}
                        >
                            Try Again
                        </button>

                        <Link
                            to="/jobs"
                            style={{
                                border:
                                    "1px solid #d0d5dd",
                                background: "white",
                                padding: "12px 20px",
                                borderRadius: "9px",
                                fontWeight: "600",
                                color: "#344054"
                            }}
                        >
                            Back to Jobs
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    const analysis = result?.analysis;

    if (!analysis) {
        return null;
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f5f7fb"
            }}
        >
            <main
                style={{
                    maxWidth: "1050px",
                    margin: "0 auto",
                    padding: "45px 25px"
                }}
            >
                <Link
                    to="/jobs"
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
                    Back to Jobs
                </Link>

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
                        <Sparkles size={15} />
                        AI Resume Match
                    </div>

                    <h1
                        style={{
                            fontSize: "32px",
                            color: "#172033",
                            marginBottom: "8px"
                        }}
                    >
                        Resume Match Analysis
                    </h1>

                    <p
                        style={{
                            color: "#667085",
                            fontSize: "15px"
                        }}
                    >
                        AI-powered comparison between your
                        resume and the selected job.
                    </p>
                </div>

                {/* Job Information */}

                {result.job && (
                    <div
                        style={{
                            background: "white",
                            border:
                                "1px solid #e5e7eb",
                            borderRadius: "16px",
                            padding: "22px",
                            marginBottom: "20px"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}
                        >
                            <Briefcase
                                size={21}
                                color="#4f46e5"
                            />

                            <div>
                                <h2
                                    style={{
                                        fontSize: "19px",
                                        color: "#172033"
                                    }}
                                >
                                    {result.job.title}
                                </h2>

                                <p
                                    style={{
                                        color: "#667085",
                                        marginTop: "4px",
                                        fontSize: "14px"
                                    }}
                                >
                                    {result.job.company}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Score */}

                <div
                    style={{
                        background: "white",
                        border:
                            "1px solid #e5e7eb",
                        borderRadius: "16px",
                        padding: "35px",
                        marginBottom: "20px",
                        textAlign: "center"
                    }}
                >
                    <div
                        style={{
                            width: "145px",
                            height: "145px",
                            borderRadius: "50%",
                            border:
                                "10px solid #eef2ff",
                            margin: "0 auto 20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column"
                        }}
                    >
                        <strong
                            style={{
                                fontSize: "40px",
                                color: "#4f46e5"
                            }}
                        >
                            {analysis.matchScore}
                        </strong>

                        <span
                            style={{
                                fontSize: "12px",
                                color: "#667085"
                            }}
                        >
                            / 100
                        </span>
                    </div>

                    <h2
                        style={{
                            color: "#172033",
                            marginBottom: "8px"
                        }}
                    >
                        {getScoreLabel(
                            analysis.matchScore
                        )}
                    </h2>

                    <p
                        style={{
                            color: "#667085",
                            fontSize: "14px"
                        }}
                    >
                        Based on the skills and requirements
                        found in your resume.
                    </p>
                </div>

                {/* Skills */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "20px",
                        marginBottom: "20px"
                    }}
                >
                    <SkillCard
                        title="Matched Skills"
                        icon={
                            <CheckCircle2
                                size={21}
                                color="#039855"
                            />
                        }
                        skills={
                            analysis.matchedSkills
                        }
                        type="matched"
                    />

                    <SkillCard
                        title="Missing Skills"
                        icon={
                            <Target
                                size={21}
                                color="#d92d20"
                            />
                        }
                        skills={
                            analysis.missingSkills
                        }
                        type="missing"
                    />
                </div>

                {/* Recommendations */}

                <div
                    style={{
                        background: "white",
                        border:
                            "1px solid #e5e7eb",
                        borderRadius: "16px",
                        padding: "25px",
                        marginBottom: "25px"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "9px",
                            marginBottom: "18px"
                        }}
                    >
                        <Lightbulb
                            size={21}
                            color="#ea580c"
                        />

                        <h2
                            style={{
                                fontSize: "18px",
                                color: "#172033"
                            }}
                        >
                            AI Recommendations
                        </h2>
                    </div>

                    {analysis.recommendations?.length >
                    0 ? (
                        analysis.recommendations.map(
                            (recommendation, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        gap: "12px",
                                        padding: "13px 0",
                                        borderBottom:
                                            index !==
                                            analysis
                                                .recommendations
                                                .length -
                                                1
                                                ? "1px solid #f0f2f5"
                                                : "none"
                                    }}
                                >
                                    <span
                                        style={{
                                            minWidth: "28px",
                                            height: "28px",
                                            borderRadius:
                                                "50%",
                                            background:
                                                "#fff7ed",
                                            color: "#ea580c",
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "center",
                                            fontSize: "12px",
                                            fontWeight: "700"
                                        }}
                                    >
                                        {index + 1}
                                    </span>

                                    <p
                                        style={{
                                            color: "#475467",
                                            fontSize: "14px",
                                            lineHeight:
                                                "1.6"
                                        }}
                                    >
                                        {recommendation}
                                    </p>
                                </div>
                            )
                        )
                    ) : (
                        <p
                            style={{
                                color: "#98a2b3",
                                fontSize: "13px"
                            }}
                        >
                            No recommendations available.
                        </p>
                    )}
                </div>

                {/* Actions */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "12px",
                        flexWrap: "wrap"
                    }}
                >
                    <button
                        onClick={analyzeMatch}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                            border: "none",
                            background: "#172033",
                            color: "white",
                            padding: "12px 19px",
                            borderRadius: "9px",
                            fontWeight: "600"
                        }}
                    >
                        <RotateCcw size={16} />
                        Analyze Again
                    </button>

                    <Link
                        to="/match-history"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                            border:
                                "1px solid #d0d5dd",
                            background: "white",
                            color: "#344054",
                            padding: "12px 19px",
                            borderRadius: "9px",
                            fontWeight: "600"
                        }}
                    >
                        <History size={16} />
                        View Match History
                    </Link>
                </div>
            </main>
        </div>
    );
}

function SkillCard({
    title,
    icon,
    skills,
    type
}) {
    return (
        <div
            style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "25px"
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    marginBottom: "18px"
                }}
            >
                {icon}

                <h2
                    style={{
                        fontSize: "18px",
                        color: "#172033"
                    }}
                >
                    {title}
                </h2>
            </div>

            {skills?.length > 0 ? (
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px"
                    }}
                >
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            style={{
                                padding: "7px 11px",
                                borderRadius: "20px",
                                fontSize: "12px",
                                fontWeight: "600",
                                background:
                                    type === "matched"
                                        ? "#ecfdf3"
                                        : "#fef3f2",
                                color:
                                    type === "matched"
                                        ? "#027a48"
                                        : "#b42318"
                            }}
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            ) : (
                <p
                    style={{
                        color: "#98a2b3",
                        fontSize: "13px"
                    }}
                >
                    No skills found.
                </p>
            )}
        </div>
    );
}

export default Match;
import { useState } from "react";
import { Link } from "react-router-dom";

import {
    Sparkles,
    FileText,
    Lightbulb,
    Target,
    Briefcase,
    CheckCircle2,
    ArrowLeft,
    Loader2
} from "lucide-react";

import Navbar from "../components/Navbar";
import api from "../api/axios";

function ResumeImprovement() {
    const [analysis, setAnalysis] = useState(null);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleAnalyze = async () => {
        try {
            setLoading(true);
            setMessage("");

            const response = await api.get(
                "/resume-improvement/analyze"
            );

            setAnalysis(response.data.analysis);
            setResume(response.data.resume);

        } catch (error) {
            console.error(
                "Resume improvement error:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Resume analysis failed. Please try again."
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

                {/* HEADER */}

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
                        AI Resume Coach
                    </div>

                    <h1
                        style={{
                            fontSize: "32px",
                            color: "#172033",
                            marginBottom: "8px"
                        }}
                    >
                        Improve Your Resume
                    </h1>

                    <p
                        style={{
                            color: "#667085",
                            fontSize: "15px",
                            lineHeight: "1.6"
                        }}
                    >
                        Get AI-powered suggestions to make your
                        resume clearer, stronger and more
                        ATS-friendly.
                    </p>
                </div>

                {/* START ANALYSIS */}

                {!analysis && (
                    <div
                        style={{
                            background: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "16px",
                            padding: "45px 30px",
                            textAlign: "center",
                            boxShadow:
                                "0 4px 15px rgba(0,0,0,0.04)"
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
                            Make Your Resume Stronger
                        </h2>

                        <p
                            style={{
                                color: "#667085",
                                maxWidth: "520px",
                                margin: "0 auto 25px",
                                lineHeight: "1.6",
                                fontSize: "14px"
                            }}
                        >
                            AI will review your latest resume and
                            suggest improvements without inventing
                            skills, experience or achievements.
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
                                cursor: "pointer",
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} />
                                    Analyzing Resume...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    Improve My Resume
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

                {/* RESULTS */}

                {analysis && (
                    <>
                        {/* RESUME USED */}

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
                                    alignItems: "center",
                                    gap: "10px"
                                }}
                            >
                                <FileText
                                    size={18}
                                    color="#4f46e5"
                                />

                                <span
                                    style={{
                                        color: "#475467",
                                        fontSize: "13px"
                                    }}
                                >
                                    Analyzed resume:{" "}
                                    <strong>
                                        {resume.fileName}
                                    </strong>
                                </span>
                            </div>
                        )}

                        {/* SUMMARY */}

                        <SuggestionBox
                            icon={
                                <FileText
                                    size={21}
                                    color="#4f46e5"
                                />
                            }
                            title="Professional Summary"
                        >
                            <div
                                style={{
                                    padding: "17px",
                                    background: "#f8fafc",
                                    borderRadius: "10px",
                                    border:
                                        "1px solid #eaecf0",
                                    color: "#475467",
                                    fontSize: "14px",
                                    lineHeight: "1.7"
                                }}
                            >
                                {analysis.summarySuggestion ||
                                    "No summary suggestion available."}
                            </div>
                        </SuggestionBox>

                        {/* SKILLS + PROJECTS */}

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(320px, 1fr))",
                                gap: "20px",
                                marginBottom: "20px"
                            }}
                        >
                            <SuggestionCard
                                icon={
                                    <Target
                                        size={21}
                                        color="#4f46e5"
                                    />
                                }
                                title="Skill Improvements"
                                items={
                                    analysis.skillImprovements
                                }
                            />

                            <SuggestionCard
                                icon={
                                    <Briefcase
                                        size={21}
                                        color="#039855"
                                    />
                                }
                                title="Project Improvements"
                                items={
                                    analysis.projectImprovements
                                }
                            />
                        </div>

                        {/* ATS + JOB */}

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(320px, 1fr))",
                                gap: "20px",
                                marginBottom: "20px"
                            }}
                        >
                            <SuggestionCard
                                icon={
                                    <CheckCircle2
                                        size={21}
                                        color="#039855"
                                    />
                                }
                                title="ATS Improvements"
                                items={
                                    analysis.atsImprovements
                                }
                            />

                            <SuggestionCard
                                icon={
                                    <Sparkles
                                        size={21}
                                        color="#ea580c"
                                    />
                                }
                                title="Job-Focused Suggestions"
                                items={
                                    analysis.jobFocusedSuggestions
                                }
                            />
                        </div>

                        {/* OVERALL */}

                        <SuggestionBox
                            icon={
                                <Lightbulb
                                    size={21}
                                    color="#ea580c"
                                />
                            }
                            title="Overall Improvements"
                        >
                            <SuggestionList
                                items={
                                    analysis.overallSuggestions
                                }
                            />
                        </SuggestionBox>

                        {/* ANALYZE AGAIN */}

                        <div
                            style={{
                                textAlign: "center",
                                paddingBottom: "30px"
                            }}
                        >
                            <button
                                onClick={() => {
                                    setAnalysis(null);
                                    setResume(null);
                                    setMessage("");
                                }}
                                style={{
                                    border:
                                        "1px solid #d0d5dd",
                                    borderRadius: "9px",
                                    background: "white",
                                    color: "#344054",
                                    padding: "11px 20px",
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    cursor: "pointer"
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

function SuggestionBox({
    icon,
    title,
    children
}) {
    return (
        <div
            style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "25px",
                marginBottom: "20px"
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

            {children}
        </div>
    );
}

function SuggestionCard({
    icon,
    title,
    items
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

            <SuggestionList items={items} />
        </div>
    );
}

function SuggestionList({ items }) {
    if (!items || items.length === 0) {
        return (
            <p
                style={{
                    color: "#98a2b3",
                    fontSize: "13px"
                }}
            >
                No suggestions available.
            </p>
        );
    }

    return (
        <div>
            {items.map((item, index) => (
                <div
                    key={index}
                    style={{
                        display: "flex",
                        gap: "12px",
                        padding: "13px 0",
                        borderBottom:
                            index !== items.length - 1
                                ? "1px solid #f0f2f5"
                                : "none"
                    }}
                >
                    <span
                        style={{
                            minWidth: "27px",
                            height: "27px",
                            borderRadius: "50%",
                            background: "#f8fafc",
                            color: "#475467",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: "700"
                        }}
                    >
                        {index + 1}
                    </span>

                    <p
                        style={{
                            color: "#475467",
                            fontSize: "13px",
                            lineHeight: "1.6"
                        }}
                    >
                        {item}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default ResumeImprovement;
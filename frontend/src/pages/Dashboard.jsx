import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FileText,
    Briefcase,
    Sparkles,
    ArrowRight,
    History,
    Target,
    TrendingUp,
    Loader2,
    CheckCircle2
} from "lucide-react";

import Navbar from "../components/Navbar";
import api from "../api/axios";

function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get(
                    "/dashboard/stats"
                );

                setData(response.data);
            } catch (error) {
                console.error(
                    "Dashboard loading error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load dashboard"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#f5f7fb"
                }}
            >
                <Navbar />

                <div
                    style={{
                        minHeight:
                            "calc(100vh - 70px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        color: "#667085"
                    }}
                >
                    <Loader2 size={20} />
                    Loading dashboard...
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
                <Navbar />

                <main
                    style={{
                        maxWidth: "1100px",
                        margin: "0 auto",
                        padding: "50px 25px"
                    }}
                >
                    <div
                        style={{
                            background: "#fef3f2",
                            border: "1px solid #fecdca",
                            borderRadius: "12px",
                            padding: "18px",
                            color: "#b42318"
                        }}
                    >
                        {error}
                    </div>
                </main>
            </div>
        );
    }

    const stats = data?.stats || {};
    const recentMatches = data?.recentMatches || [];
    const latestResume = data?.latestResume;

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
                    maxWidth: "1100px",
                    margin: "0 auto",
                    padding: "45px 25px"
                }}
            >
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
                        <Sparkles size={15} />
                        AI-powered career platform
                    </div>

                    <h1
                        style={{
                            fontSize: "34px",
                            color: "#172033",
                            marginBottom: "8px"
                        }}
                    >
                        Welcome back 👋
                    </h1>

                    <p
                        style={{
                            color: "#667085",
                            fontSize: "15px"
                        }}
                    >
                        Track your resume, job matches and
                        AI-powered career insights.
                    </p>
                </div>

                {/* Statistics */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(210px, 1fr))",
                        gap: "16px",
                        marginBottom: "30px"
                    }}
                >
                    {/* Resumes */}

                    <div
                        style={{
                            background: "white",
                            border:
                                "1px solid #e5e7eb",
                            borderRadius: "14px",
                            padding: "22px",
                            boxShadow:
                                "0 4px 15px rgba(0,0,0,0.03)"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems: "center"
                            }}
                        >
                            <div>
                                <p
                                    style={{
                                        color: "#667085",
                                        fontSize: "13px",
                                        marginBottom: "8px"
                                    }}
                                >
                                    Resumes
                                </p>

                                <h2
                                    style={{
                                        fontSize: "28px",
                                        color: "#172033"
                                    }}
                                >
                                    {stats.resumeCount || 0}
                                </h2>
                            </div>

                            <div
                                style={{
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "11px",
                                    background: "#eef2ff",
                                    color: "#4f46e5",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent:
                                        "center"
                                }}
                            >
                                <FileText size={22} />
                            </div>
                        </div>
                    </div>

                    {/* Jobs */}

                    <div
                        style={{
                            background: "white",
                            border:
                                "1px solid #e5e7eb",
                            borderRadius: "14px",
                            padding: "22px",
                            boxShadow:
                                "0 4px 15px rgba(0,0,0,0.03)"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems: "center"
                            }}
                        >
                            <div>
                                <p
                                    style={{
                                        color: "#667085",
                                        fontSize: "13px",
                                        marginBottom: "8px"
                                    }}
                                >
                                    Available Jobs
                                </p>

                                <h2
                                    style={{
                                        fontSize: "28px",
                                        color: "#172033"
                                    }}
                                >
                                    {stats.jobCount || 0}
                                </h2>
                            </div>

                            <div
                                style={{
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "11px",
                                    background: "#ecfdf3",
                                    color: "#039855",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent:
                                        "center"
                                }}
                            >
                                <Briefcase size={22} />
                            </div>
                        </div>
                    </div>

                    {/* Matches */}

                    <div
                        style={{
                            background: "white",
                            border:
                                "1px solid #e5e7eb",
                            borderRadius: "14px",
                            padding: "22px",
                            boxShadow:
                                "0 4px 15px rgba(0,0,0,0.03)"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems: "center"
                            }}
                        >
                            <div>
                                <p
                                    style={{
                                        color: "#667085",
                                        fontSize: "13px",
                                        marginBottom: "8px"
                                    }}
                                >
                                    Matches Analyzed
                                </p>

                                <h2
                                    style={{
                                        fontSize: "28px",
                                        color: "#172033"
                                    }}
                                >
                                    {stats.matchCount || 0}
                                </h2>
                            </div>

                            <div
                                style={{
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "11px",
                                    background: "#fff7ed",
                                    color: "#ea580c",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent:
                                        "center"
                                }}
                            >
                                <Sparkles size={22} />
                            </div>
                        </div>
                    </div>

                    {/* Average Score */}

                    <div
                        style={{
                            background: "white",
                            border:
                                "1px solid #e5e7eb",
                            borderRadius: "14px",
                            padding: "22px",
                            boxShadow:
                                "0 4px 15px rgba(0,0,0,0.03)"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems: "center"
                            }}
                        >
                            <div>
                                <p
                                    style={{
                                        color: "#667085",
                                        fontSize: "13px",
                                        marginBottom: "8px"
                                    }}
                                >
                                    Average Match
                                </p>

                                <h2
                                    style={{
                                        fontSize: "28px",
                                        color: "#172033"
                                    }}
                                >
                                    {stats.averageScore || 0}%
                                </h2>
                            </div>

                            <div
                                style={{
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "11px",
                                    background: "#f0fdf4",
                                    color: "#16a34a",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent:
                                        "center"
                                }}
                            >
                                <TrendingUp size={22} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resume + Quick Actions */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "20px",
                        marginBottom: "30px"
                    }}
                >
                    {/* Resume */}

                    <div
                        style={{
                            background: "white",
                            border:
                                "1px solid #e5e7eb",
                            borderRadius: "16px",
                            padding: "25px"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "18px"
                            }}
                        >
                            <FileText
                                size={21}
                                color="#4f46e5"
                            />

                            <h2
                                style={{
                                    fontSize: "18px",
                                    color: "#172033"
                                }}
                            >
                                Your Resume
                            </h2>
                        </div>

                        {latestResume ? (
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems:
                                            "center",
                                        gap: "10px",
                                        padding: "14px",
                                        background:
                                            "#f8fafc",
                                        borderRadius:
                                            "10px",
                                        marginBottom:
                                            "15px"
                                    }}
                                >
                                    <CheckCircle2
                                        size={19}
                                        color="#039855"
                                    />

                                    <div>
                                        <strong
                                            style={{
                                                display:
                                                    "block",
                                                fontSize:
                                                    "14px",
                                                color:
                                                    "#172033"
                                            }}
                                        >
                                            {
                                                latestResume.fileName
                                            }
                                        </strong>

                                        <span
                                            style={{
                                                fontSize:
                                                    "12px",
                                                color:
                                                    "#667085"
                                            }}
                                        >
                                            Resume uploaded
                                            successfully
                                        </span>
                                    </div>
                                </div>

                                <Link to="/upload-resume">
                                    <button
                                        style={{
                                            padding:
                                                "10px 15px",
                                            border:
                                                "1px solid #d0d5dd",
                                            borderRadius:
                                                "8px",
                                            background:
                                                "white",
                                            color:
                                                "#344054",
                                            fontWeight:
                                                "600"
                                        }}
                                    >
                                        Upload New Resume
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <p
                                    style={{
                                        color:
                                            "#667085",
                                        fontSize:
                                            "14px",
                                        lineHeight:
                                            "1.6",
                                        marginBottom:
                                            "18px"
                                    }}
                                >
                                    You haven't uploaded a
                                    resume yet. Upload one to
                                    start using AI matching.
                                </p>

                                <Link to="/upload-resume">
                                    <button
                                        style={{
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            gap: "8px",
                                            border:
                                                "none",
                                            background:
                                                "#172033",
                                            color:
                                                "white",
                                            padding:
                                                "11px 16px",
                                            borderRadius:
                                                "9px",
                                            fontWeight:
                                                "600"
                                        }}
                                    >
                                        Upload Resume
                                        <ArrowRight
                                            size={17}
                                        />
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}

                    <div
                        style={{
                            background: "white",
                            border:
                                "1px solid #e5e7eb",
                            borderRadius: "16px",
                            padding: "25px"
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "18px",
                                color: "#172033",
                                marginBottom: "18px"
                            }}
                        >
                            Quick Actions
                        </h2>

                        <div
                            style={{
                                display: "grid",
                                gap: "10px"
                            }}
                        >
                            <Link to="/jobs">
                                <div
                                    style={{
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        justifyContent:
                                            "space-between",
                                        padding: "13px",
                                        background:
                                            "#f8fafc",
                                        borderRadius:
                                            "9px"
                                    }}
                                >
                                    <span
                                        style={{
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            gap: "9px",
                                            fontSize:
                                                "14px",
                                            fontWeight:
                                                "600"
                                        }}
                                    >
                                        <Briefcase
                                            size={18}
                                        />
                                        Browse Jobs
                                    </span>

                                    <ArrowRight
                                        size={17}
                                    />
                                </div>
                            </Link>

                            <Link to="/match-history">
                                <div
                                    style={{
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        justifyContent:
                                            "space-between",
                                        padding: "13px",
                                        background:
                                            "#f8fafc",
                                        borderRadius:
                                            "9px"
                                    }}
                                >
                                    <span
                                        style={{
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            gap: "9px",
                                            fontSize:
                                                "14px",
                                            fontWeight:
                                                "600"
                                        }}
                                    >
                                        <Link to="/career-analysis">
    <div
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "13px",
            background: "#f8fafc",
            borderRadius: "9px"
        }}
    >
        <span
            style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                fontSize: "14px",
                fontWeight: "600"
            }}
        >
            <Sparkles size={18} />
            AI Career Analysis
        </span>

        <ArrowRight size={17} />
    </div>
</Link>
                                        <History
                                            size={18}
                                        />
                                        View Match History
                                    </span>

                                    <ArrowRight
                                        size={17}
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Matches */}

                <div
                    style={{
                        background: "white",
                        border:
                            "1px solid #e5e7eb",
                        borderRadius: "16px",
                        padding: "25px"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems: "center",
                            marginBottom: "20px",
                            gap: "10px"
                        }}
                    >
                        <div>
                            <h2
                                style={{
                                    fontSize: "18px",
                                    color: "#172033",
                                    marginBottom: "5px"
                                }}
                            >
                                Recent AI Matches
                            </h2>

                            <p
                                style={{
                                    color: "#667085",
                                    fontSize: "13px"
                                }}
                            >
                                Your latest resume analysis
                                results.
                            </p>
                        </div>

                        {recentMatches.length > 0 && (
                            <Link
                                to="/match-history"
                                style={{
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    gap: "5px",
                                    color: "#4f46e5",
                                    fontSize: "13px",
                                    fontWeight: "600"
                                }}
                            >
                                View all
                                <ArrowRight
                                    size={15}
                                />
                            </Link>
                        )}
                    </div>

                    {recentMatches.length === 0 ? (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "30px 15px",
                                color: "#98a2b3"
                            }}
                        >
                            <Target
                                size={35}
                                style={{
                                    marginBottom: "10px"
                                }}
                            />

                            <p
                                style={{
                                    fontSize: "14px"
                                }}
                            >
                                No matches analyzed yet.
                            </p>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                flexDirection:
                                    "column",
                                gap: "10px"
                            }}
                        >
                            {recentMatches.map(
                                (match) => (
                                    <div
                                        key={match._id}
                                        style={{
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "space-between",
                                            gap: "15px",
                                            padding:
                                                "14px",
                                            background:
                                                "#f8fafc",
                                            borderRadius:
                                                "10px"
                                        }}
                                    >
                                        <div
                                            style={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                gap: "11px"
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width:
                                                        "38px",
                                                    height:
                                                        "38px",
                                                    borderRadius:
                                                        "9px",
                                                    background:
                                                        "#eef2ff",
                                                    color:
                                                        "#4f46e5",
                                                    display:
                                                        "flex",
                                                    alignItems:
                                                        "center",
                                                    justifyContent:
                                                        "center"
                                                }}
                                            >
                                                <Briefcase
                                                    size={18}
                                                />
                                            </div>

                                            <div>
                                                <strong
                                                    style={{
                                                        display:
                                                            "block",
                                                        fontSize:
                                                            "14px",
                                                        color:
                                                            "#172033"
                                                    }}
                                                >
                                                    {match
                                                        .jobId
                                                        ?.title ||
                                                        "Job"}
                                                </strong>

                                                <span
                                                    style={{
                                                        fontSize:
                                                            "12px",
                                                        color:
                                                            "#667085"
                                                    }}
                                                >
                                                    {match
                                                        .jobId
                                                        ?.company ||
                                                        "Company"}
                                                </span>
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                gap: "5px",
                                                fontWeight:
                                                    "700",
                                                color:
                                                    "#172033"
                                            }}
                                        >
                                            <Target
                                                size={17}
                                                color="#4f46e5"
                                            />

                                            {match.matchScore}%
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
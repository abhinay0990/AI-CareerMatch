import { useEffect, useState } from "react";
import {
    History,
    Briefcase,
    FileText,
    CheckCircle2,
    XCircle,
    Lightbulb,
    Target,
    Loader2
} from "lucide-react";

import api from "../api/axios";
import Navbar from "../components/Navbar";

function MatchHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get(
                    "/match-history"
                );

                setHistory(response.data.history || []);
            } catch (error) {
                console.error(
                    "Failed to load match history:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

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
                <Navbar />

                <div
                    style={{
                        minHeight: "calc(100vh - 70px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        color: "#667085"
                    }}
                >
                    <Loader2 size={20} />
                    Loading match history...
                </div>
            </div>
        );
    }

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

                <div style={{ marginBottom: "30px" }}>
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
                        <History size={15} />
                        AI Analysis History
                    </div>

                    <h1
                        style={{
                            fontSize: "32px",
                            color: "#172033",
                            marginBottom: "8px"
                        }}
                    >
                        Match History
                    </h1>

                    <p
                        style={{
                            color: "#667085",
                            fontSize: "15px"
                        }}
                    >
                        Review your previous resume and job
                        matching results.
                    </p>
                </div>

                {/* Empty State */}

                {history.length === 0 ? (
                    <div
                        style={{
                            background: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "16px",
                            padding: "60px 30px",
                            textAlign: "center"
                        }}
                    >
                        <History
                            size={45}
                            color="#98a2b3"
                            style={{
                                marginBottom: "15px"
                            }}
                        />

                        <h2
                            style={{
                                color: "#172033",
                                marginBottom: "8px"
                            }}
                        >
                            No match history yet
                        </h2>

                        <p
                            style={{
                                color: "#667085",
                                fontSize: "14px"
                            }}
                        >
                            Analyze your resume against a job
                            to see your results here.
                        </p>
                    </div>
                ) : (
                    /* History List */

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px"
                        }}
                    >
                        {history.map((item) => {
                            const score = item.matchScore || 0;

                            return (
                                <div
                                    key={item._id}
                                    style={{
                                        background: "white",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "16px",
                                        padding: "25px",
                                        boxShadow:
                                            "0 4px 15px rgba(0,0,0,0.04)"
                                    }}
                                >
                                    {/* Top Section */}

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent:
                                                "space-between",
                                            alignItems: "flex-start",
                                            gap: "20px",
                                            flexWrap: "wrap"
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems:
                                                        "center",
                                                    gap: "10px",
                                                    marginBottom:
                                                        "8px"
                                                }}
                                            >
                                                <Briefcase
                                                    size={20}
                                                    color="#4f46e5"
                                                />

                                                <h2
                                                    style={{
                                                        fontSize:
                                                            "20px",
                                                        color:
                                                            "#172033"
                                                    }}
                                                >
                                                    {item.jobId
                                                        ?.title ||
                                                        "Job"}
                                                </h2>
                                            </div>

                                            <p
                                                style={{
                                                    color:
                                                        "#667085",
                                                    fontSize:
                                                        "14px",
                                                    marginBottom:
                                                        "8px"
                                                }}
                                            >
                                                {item.jobId
                                                    ?.company ||
                                                    "Company"}
                                            </p>

                                            <div
                                                style={{
                                                    display:
                                                        "flex",
                                                    alignItems:
                                                        "center",
                                                    gap: "7px",
                                                    color:
                                                        "#98a2b3",
                                                    fontSize:
                                                        "12px"
                                                }}
                                            >
                                                <FileText
                                                    size={15}
                                                />

                                                {item.resumeId
                                                    ?.fileName ||
                                                    "Resume"}
                                            </div>
                                        </div>

                                        {/* Score */}

                                        <div
                                            style={{
                                                minWidth:
                                                    "130px",
                                                textAlign:
                                                    "center",
                                                padding: "14px 18px",
                                                borderRadius:
                                                    "12px",
                                                background:
                                                    "#f8fafc"
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display:
                                                        "flex",
                                                    alignItems:
                                                        "center",
                                                    justifyContent:
                                                        "center",
                                                    gap: "5px",
                                                    color:
                                                        "#4f46e5",
                                                    marginBottom:
                                                        "4px"
                                                }}
                                            >
                                                <Target
                                                    size={18}
                                                />

                                                <strong
                                                    style={{
                                                        fontSize:
                                                            "25px"
                                                    }}
                                                >
                                                    {score}%
                                                </strong>
                                            </div>

                                            <span
                                                style={{
                                                    color:
                                                        "#667085",
                                                    fontSize:
                                                        "12px"
                                                }}
                                            >
                                                {getScoreLabel(
                                                    score
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Divider */}

                                    <div
                                        style={{
                                            height: "1px",
                                            background:
                                                "#eaecf0",
                                            margin:
                                                "22px 0"
                                        }}
                                    />

                                    {/* Matched Skills */}

                                    <div
                                        style={{
                                            marginBottom:
                                                "22px"
                                        }}
                                    >
                                        <div
                                            style={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                gap: "7px",
                                                marginBottom:
                                                    "10px"
                                            }}
                                        >
                                            <CheckCircle2
                                                size={18}
                                                color="#027a48"
                                            />

                                            <h3
                                                style={{
                                                    fontSize:
                                                        "15px",
                                                    color:
                                                        "#172033"
                                                }}
                                            >
                                                Matched Skills
                                            </h3>
                                        </div>

                                        {item.matchedSkills
                                            ?.length >
                                        0 ? (
                                            <div
                                                style={{
                                                    display:
                                                        "flex",
                                                    flexWrap:
                                                        "wrap",
                                                    gap: "7px"
                                                }}
                                            >
                                                {item.matchedSkills.map(
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
                                                                    "6px 10px",
                                                                background:
                                                                    "#ecfdf3",
                                                                color:
                                                                    "#027a48",
                                                                borderRadius:
                                                                    "7px",
                                                                fontSize:
                                                                    "12px",
                                                                fontWeight:
                                                                    "500"
                                                            }}
                                                        >
                                                            {
                                                                skill
                                                            }
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
                                                No matched skills
                                                found.
                                            </p>
                                        )}
                                    </div>

                                    {/* Missing Skills */}

                                    <div
                                        style={{
                                            marginBottom:
                                                "22px"
                                        }}
                                    >
                                        <div
                                            style={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                gap: "7px",
                                                marginBottom:
                                                    "10px"
                                            }}
                                        >
                                            <XCircle
                                                size={18}
                                                color="#b42318"
                                            />

                                            <h3
                                                style={{
                                                    fontSize:
                                                        "15px",
                                                    color:
                                                        "#172033"
                                                }}
                                            >
                                                Missing Skills
                                            </h3>
                                        </div>

                                        {item.missingSkills
                                            ?.length >
                                        0 ? (
                                            <div
                                                style={{
                                                    display:
                                                        "flex",
                                                    flexWrap:
                                                        "wrap",
                                                    gap: "7px"
                                                }}
                                            >
                                                {item.missingSkills.map(
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
                                                                    "6px 10px",
                                                                background:
                                                                    "#fef3f2",
                                                                color:
                                                                    "#b42318",
                                                                borderRadius:
                                                                    "7px",
                                                                fontSize:
                                                                    "12px",
                                                                fontWeight:
                                                                    "500"
                                                            }}
                                                        >
                                                            {
                                                                skill
                                                            }
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            <p
                                                style={{
                                                    color:
                                                        "#027a48",
                                                    fontSize:
                                                        "13px"
                                                }}
                                            >
                                                No major missing
                                                skills identified.
                                            </p>
                                        )}
                                    </div>

                                    {/* Recommendations */}

                                    <div>
                                        <div
                                            style={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                gap: "7px",
                                                marginBottom:
                                                    "10px"
                                            }}
                                        >
                                            <Lightbulb
                                                size={18}
                                                color="#b54708"
                                            />

                                            <h3
                                                style={{
                                                    fontSize:
                                                        "15px",
                                                    color:
                                                        "#172033"
                                                }}
                                            >
                                                AI Recommendations
                                            </h3>
                                        </div>

                                        {item.recommendations
                                            ?.length >
                                        0 ? (
                                            <ul
                                                style={{
                                                    paddingLeft:
                                                        "20px",
                                                    color:
                                                        "#667085",
                                                    fontSize:
                                                        "13px",
                                                    lineHeight:
                                                        "1.7"
                                                }}
                                            >
                                                {item.recommendations.map(
                                                    (
                                                        recommendation,
                                                        index
                                                    ) => (
                                                        <li
                                                            key={
                                                                index
                                                            }
                                                        >
                                                            {
                                                                recommendation
                                                            }
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        ) : (
                                            <p
                                                style={{
                                                    color:
                                                        "#98a2b3",
                                                    fontSize:
                                                        "13px"
                                                }}
                                            >
                                                No recommendations
                                                available.
                                            </p>
                                        )}
                                    </div>

                                    {/* Date */}

                                    <div
                                        style={{
                                            marginTop:
                                                "22px",
                                            paddingTop:
                                                "15px",
                                            borderTop:
                                                "1px solid #f0f2f5",
                                            color:
                                                "#98a2b3",
                                            fontSize:
                                                "12px"
                                        }}
                                    >
                                        Analyzed on{" "}
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleString()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

export default MatchHistory;
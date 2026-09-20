import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
    Search,
    MapPin,
    Briefcase,
    Sparkles,
    Building2
} from "lucide-react";
import Navbar from "../components/Navbar";

function Jobs() {
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.get("/jobs");

                setJobs(response.data.jobs || []);

            } catch (error) {
                console.error("Failed to load jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter((job) => {
        const searchText = search.toLowerCase();

        return (
            job.title?.toLowerCase().includes(searchText) ||
            job.company?.toLowerCase().includes(searchText) ||
            job.location?.toLowerCase().includes(searchText) ||
            job.skills?.some((skill) =>
                skill.toLowerCase().includes(searchText)
            )
        );
    });

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
                        justifyContent: "center"
                    }}
                >
                    <p style={{ color: "#667085" }}>
                        Loading jobs...
                    </p>
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

                {/* HEADER */}

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
                        <Briefcase size={15} />
                        Career opportunities
                    </div>

                    <h1
                        style={{
                            fontSize: "32px",
                            color: "#172033",
                            marginBottom: "8px"
                        }}
                    >
                        Find your next opportunity
                    </h1>

                    <p
                        style={{
                            color: "#667085",
                            fontSize: "15px"
                        }}
                    >
                        Explore jobs and use AI to understand
                        how well your resume matches.
                    </p>

                </div>


                {/* SEARCH */}

                <div
                    style={{
                        position: "relative",
                        marginBottom: "30px"
                    }}
                >
                    <Search
                        size={19}
                        style={{
                            position: "absolute",
                            left: "16px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#98a2b3"
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Search jobs, companies, locations or skills..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        style={{
                            width: "100%",
                            height: "52px",
                            border: "1px solid #dbe1ea",
                            borderRadius: "11px",
                            outline: "none",
                            padding: "0 18px 0 48px",
                            background: "white",
                            fontSize: "14px"
                        }}
                    />
                </div>


                {/* RESULT COUNT */}

                <div
                    style={{
                        marginBottom: "18px",
                        color: "#667085",
                        fontSize: "14px"
                    }}
                >
                    {filteredJobs.length}{" "}
                    {filteredJobs.length === 1
                        ? "job"
                        : "jobs"}{" "}
                    found
                </div>


                {/* NO JOBS */}

                {filteredJobs.length === 0 ? (

                    <div
                        style={{
                            background: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "16px",
                            padding: "50px",
                            textAlign: "center"
                        }}
                    >
                        <Briefcase
                            size={40}
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
                            No jobs found
                        </h2>

                        <p style={{ color: "#667085" }}>
                            Try a different search term.
                        </p>
                    </div>

                ) : (

                    /* JOB CARDS */

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(320px, 1fr))",
                            gap: "20px"
                        }}
                    >

                        {filteredJobs.map((job) => (

                            <div
                                key={job._id}
                                style={{
                                    background: "white",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "16px",
                                    padding: "25px",
                                    boxShadow:
                                        "0 4px 15px rgba(0,0,0,0.04)"
                                }}
                            >

                                {/* JOB TITLE */}

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        marginBottom: "20px"
                                    }}
                                >

                                    <div
                                        style={{
                                            width: "46px",
                                            height: "46px",
                                            borderRadius: "11px",
                                            background: "#f1f5f9",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#475569"
                                        }}
                                    >
                                        <Building2 size={23} />
                                    </div>

                                    <div>

                                        <h2
                                            style={{
                                                fontSize: "19px",
                                                color: "#172033",
                                                marginBottom: "4px"
                                            }}
                                        >
                                            {job.title}
                                        </h2>

                                        <p
                                            style={{
                                                color: "#667085",
                                                fontSize: "13px"
                                            }}
                                        >
                                            {job.company}
                                        </p>

                                    </div>

                                </div>


                                {/* JOB DETAILS */}

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "18px",
                                        flexWrap: "wrap",
                                        marginBottom: "18px",
                                        color: "#667085",
                                        fontSize: "13px"
                                    }}
                                >

                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px"
                                        }}
                                    >
                                        <MapPin size={15} />
                                        {job.location}
                                    </span>

                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px"
                                        }}
                                    >
                                        <Briefcase size={15} />
                                        {job.experience}
                                    </span>

                                </div>


                                {/* DESCRIPTION */}

                                <p
                                    style={{
                                        color: "#667085",
                                        fontSize: "14px",
                                        lineHeight: "1.6",
                                        marginBottom: "20px"
                                    }}
                                >
                                    {job.description}
                                </p>


                                {/* SKILLS */}

                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "7px",
                                        marginBottom: "24px"
                                    }}
                                >

                                    {job.skills?.map(
                                        (skill, index) => (
                                            <span
                                                key={index}
                                                style={{
                                                    padding: "6px 10px",
                                                    background: "#f1f5f9",
                                                    color: "#475467",
                                                    borderRadius: "7px",
                                                    fontSize: "12px",
                                                    fontWeight: "500"
                                                }}
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )}

                                </div>


                                {/* MATCH BUTTON */}

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/match/${job._id}`
                                        )
                                    }
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        padding: "12px",
                                        border: "none",
                                        borderRadius: "9px",
                                        background: "#172033",
                                        color: "white",
                                        fontWeight: "600",
                                        fontSize: "14px"
                                    }}
                                >
                                    <Sparkles size={17} />
                                    Match My Resume
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </main>
        </div>
    );
}

export default Jobs;
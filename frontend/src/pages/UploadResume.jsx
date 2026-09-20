import { useState } from "react";
import api from "../api/axios";
import {
    Upload,
    FileText,
    CheckCircle2,
    Loader2
} from "lucide-react";
import Navbar from "../components/Navbar";

function UploadResume() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage("Please select a PDF resume.");
            setSuccess(false);
            return;
        }

        const formData = new FormData();

        formData.append("resume", file);

        try {
            setUploading(true);
            setMessage("");
            setSuccess(false);

            const response = await api.post(
                "/resumes/upload",
                formData
            );

            setMessage(response.data.message);
            setSuccess(true);

        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Resume upload failed."
            );

            setSuccess(false);

        } finally {
            setUploading(false);
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
                    maxWidth: "800px",
                    margin: "0 auto",
                    padding: "55px 25px"
                }}
            >

                <div style={{ marginBottom: "30px" }}>

                    <h1
                        style={{
                            fontSize: "32px",
                            color: "#172033",
                            marginBottom: "10px"
                        }}
                    >
                        Upload your resume
                    </h1>

                    <p
                        style={{
                            color: "#667085",
                            fontSize: "16px"
                        }}
                    >
                        Upload your PDF resume and let AI analyze
                        your skills and experience.
                    </p>

                </div>

                <div
                    style={{
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "16px",
                        padding: "35px",
                        boxShadow:
                            "0 5px 20px rgba(0,0,0,0.04)"
                    }}
                >

                    <form onSubmit={handleUpload}>

                        <label
                            htmlFor="resume"
                            style={{
                                minHeight: "250px",
                                border: "2px dashed #cbd5e1",
                                borderRadius: "14px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                padding: "30px",
                                cursor: "pointer",
                                background: "#fafbff"
                            }}
                        >

                            <div
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "15px",
                                    background: "#eef2ff",
                                    color: "#4f46e5",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "18px"
                                }}
                            >
                                <Upload size={28} />
                            </div>

                            <h3
                                style={{
                                    color: "#172033",
                                    marginBottom: "8px"
                                }}
                            >
                                {file
                                    ? file.name
                                    : "Choose your resume"}
                            </h3>

                            <p
                                style={{
                                    color: "#667085",
                                    fontSize: "14px"
                                }}
                            >
                                Click here to select a PDF file
                            </p>

                            <span
                                style={{
                                    marginTop: "12px",
                                    fontSize: "12px",
                                    color: "#98a2b3"
                                }}
                            >
                                PDF files only
                            </span>

                            <input
                                id="resume"
                                type="file"
                                accept=".pdf,application/pdf"
                                hidden
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                    setMessage("");
                                    setSuccess(false);
                                }}
                            />

                        </label>

                        {file && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    marginTop: "20px",
                                    padding: "14px",
                                    borderRadius: "10px",
                                    background: "#f8fafc",
                                    border: "1px solid #e5e7eb"
                                }}
                            >

                                <FileText
                                    size={22}
                                    color="#4f46e5"
                                />

                                <div>

                                    <strong
                                        style={{
                                            display: "block",
                                            fontSize: "14px"
                                        }}
                                    >
                                        {file.name}
                                    </strong>

                                    <span
                                        style={{
                                            fontSize: "12px",
                                            color: "#667085"
                                        }}
                                    >
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </span>

                                </div>

                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={uploading}
                            style={{
                                width: "100%",
                                marginTop: "24px",
                                padding: "14px",
                                border: "none",
                                borderRadius: "10px",
                                background: "#172033",
                                color: "white",
                                fontWeight: "600",
                                fontSize: "15px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px"
                            }}
                        >

                            {uploading ? (
                                <>
                                    <Loader2 size={18} />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload size={18} />
                                    Upload Resume
                                </>
                            )}

                        </button>

                    </form>

                    {message && (
                        <div
                            style={{
                                marginTop: "20px",
                                padding: "14px",
                                borderRadius: "10px",
                                background: success
                                    ? "#ecfdf3"
                                    : "#fef3f2",
                                color: success
                                    ? "#027a48"
                                    : "#b42318",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "14px"
                            }}
                        >

                            {success && (
                                <CheckCircle2 size={18} />
                            )}

                            {message}

                        </div>
                    )}

                </div>

                <div
                    style={{
                        marginTop: "22px",
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                        color: "#667085",
                        fontSize: "13px",
                        lineHeight: "1.6"
                    }}
                >

                    <FileText
                        size={18}
                        style={{ flexShrink: 0 }}
                    />

                    <p>
                        Your resume text is extracted and used by
                        the AI matching system to compare your
                        skills with available jobs.
                    </p>

                </div>

            </main>
        </div>
    );
}

export default UploadResume;
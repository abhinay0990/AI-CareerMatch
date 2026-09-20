import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    BrainCircuit,
    LayoutDashboard,
    Briefcase,
    Upload,
    History,
    LogOut,
    Menu,
    X
} from "lucide-react";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setMenuOpen(false);
        navigate("/login");
    };

    const navItem = (path) => ({
        display: "flex",
        alignItems: "center",
        gap: "7px",
        padding: "9px 12px",
        borderRadius: "8px",
        color:
            location.pathname === path
                ? "#4f46e5"
                : "#667085",
        backgroundColor:
            location.pathname === path
                ? "#eef2ff"
                : "transparent",
        fontWeight: "600",
        fontSize: "14px"
    });

    const mobileNavItem = (path) => ({
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px",
        borderRadius: "8px",
        color:
            location.pathname === path
                ? "#4f46e5"
                : "#475467",
        backgroundColor:
            location.pathname === path
                ? "#eef2ff"
                : "transparent",
        fontWeight: "600",
        fontSize: "14px"
    });

    return (
        <nav
            style={{
                position: "relative",
                minHeight: "70px",
                background: "white",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 35px"
            }}
        >
            {/* Logo */}

            <Link
                to="/dashboard"
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

            {/* Desktop Navigation */}

            <div
                className="desktop-nav"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px"
                }}
            >
                <Link
                    to="/dashboard"
                    style={navItem("/dashboard")}
                >
                    <LayoutDashboard size={17} />
                    Dashboard
                </Link>

                <Link
                    to="/jobs"
                    style={navItem("/jobs")}
                >
                    <Briefcase size={17} />
                    Jobs
                </Link>

                <Link
                    to="/upload-resume"
                    style={navItem("/upload-resume")}
                >
                    <Upload size={17} />
                    Resume
                </Link>

                <Link
                    to="/match-history"
                    style={navItem("/match-history")}
                >
                    <History size={17} />
                    History
                </Link>

                <button
                    onClick={handleLogout}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        marginLeft: "8px",
                        padding: "9px 13px",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        background: "white",
                        color: "#475467",
                        fontWeight: "600",
                        fontSize: "14px",
                        cursor: "pointer"
                    }}
                >
                    <LogOut size={17} />
                    Logout
                </button>
            </div>

            {/* Mobile Menu Button */}

            <button
                className="mobile-menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    display: "none",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "42px",
                    height: "42px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    background: "white",
                    color: "#475467",
                    cursor: "pointer"
                }}
            >
                {menuOpen ? (
                    <X size={21} />
                ) : (
                    <Menu size={21} />
                )}
            </button>

            {/* Mobile Menu */}

            {menuOpen && (
                <div
                    className="mobile-menu"
                    style={{
                        position: "absolute",
                        top: "70px",
                        left: "0",
                        right: "0",
                        background: "white",
                        borderBottom: "1px solid #e5e7eb",
                        boxShadow:
                            "0 8px 20px rgba(0,0,0,0.08)",
                        padding: "15px",
                        zIndex: 1000
                    }}
                >
                    <Link
                        to="/dashboard"
                        onClick={() => setMenuOpen(false)}
                        style={mobileNavItem("/dashboard")}
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>

                    <Link
                        to="/jobs"
                        onClick={() => setMenuOpen(false)}
                        style={mobileNavItem("/jobs")}
                    >
                        <Briefcase size={18} />
                        Jobs
                    </Link>

                    <Link
                        to="/upload-resume"
                        onClick={() => setMenuOpen(false)}
                        style={mobileNavItem("/upload-resume")}
                    >
                        <Upload size={18} />
                        Resume
                    </Link>

                    <Link
                        to="/match-history"
                        onClick={() => setMenuOpen(false)}
                        style={mobileNavItem("/match-history")}
                    >
                        <History size={18} />
                        History
                    </Link>

                    <button
                        onClick={handleLogout}
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginTop: "5px",
                            padding: "12px",
                            border: "none",
                            borderRadius: "8px",
                            background: "#f8fafc",
                            color: "#475467",
                            fontWeight: "600",
                            fontSize: "14px",
                            cursor: "pointer",
                            textAlign: "left"
                        }}
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
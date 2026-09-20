import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import Jobs from "./pages/Jobs";
import Match from "./pages/Match";
import MatchHistory from "./pages/MatchHistory";
import ResumeImprovement from "./pages/ResumeImprovement";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
              <Route
    path="/"
    element={<Home />}
/>

                {/* Public Routes */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Protected Routes */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/upload-resume"
                    element={
                        <ProtectedRoute>
                            <UploadResume />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/jobs"
                    element={
                        <ProtectedRoute>
                            <Jobs />
                        </ProtectedRoute>
                    }
                />
                    <Route
    path="/resume-improvement"
    element={
        <ProtectedRoute>
            <ResumeImprovement />
        </ProtectedRoute>
    }
/>
                <Route
    path="/match-history"
    element={
        <ProtectedRoute>
            <MatchHistory />
        </ProtectedRoute>
    }
/>

                <Route
                    path="/match/:jobId"
                    element={
                        <ProtectedRoute>
                            <Match />
                        </ProtectedRoute>
                    }
                />
            
                <Route
    path="*"
    element={<NotFound />}
/>
    

            </Routes>
        </BrowserRouter>
    );
}

export default App;
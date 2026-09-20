# AI CareerMatch 🤖

AI CareerMatch is a full-stack AI-powered career platform that analyzes resumes, matches candidates with job requirements, identifies skill gaps, and provides personalized resume improvement suggestions.

## 🚀 Features

- 🔐 User Registration & Login
- 🔑 JWT Authentication
- 📄 Resume PDF Upload
- 📝 Automatic Resume Text Extraction
- 💼 Job Listings
- 🤖 AI Resume-to-Job Matching
- 📊 Resume Match Score
- ✅ Matched Skills Detection
- ❌ Missing Skills Detection
- 💡 AI Job Recommendations
- 🧠 AI Career & Skill-Gap Analysis
- ✨ AI Resume Improvement
- 📈 User Dashboard
- 🕘 Match History
- 🛡️ API Security & Rate Limiting
- 🗄️ MongoDB Database
- 🦙 Local AI using Ollama + Llama 3.2

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- pdf-parse
- Express Validator
- Helmet
- Express Rate Limit

### AI

- Ollama
- Llama 3.2

## 🏗️ Project Structure

```text
AI Career Resume/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
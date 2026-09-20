\# AI CareerMatch 🤖



AI CareerMatch is a full-stack AI-powered career platform that helps students and job seekers analyze their resumes, match them with job requirements, identify skill gaps, and improve their resumes using AI.



\## 🚀 Features



\- 🔐 User Registration \& Login

\- 🔑 JWT Authentication

\- 📄 Resume PDF Upload

\- 📝 Automatic Resume Text Extraction

\- 💼 Job Listings

\- 🤖 AI Resume-to-Job Matching

\- 📊 Resume Match Score

\- ✅ Matched Skills Detection

\- ❌ Missing Skills Detection

\- 💡 AI Job Recommendations

\- 🧠 AI Career \& Skill-Gap Analysis

\- ✨ AI Resume Improvement

\- 📈 User Dashboard

\- 🕘 Match History

\- 🛡️ API Security \& Rate Limiting

\- 🗄️ MongoDB Database

\- 🦙 Local AI using Ollama + Llama 3.2



\## 🛠️ Tech Stack



\### Frontend



\- React

\- Vite

\- React Router

\- Axios

\- Lucide React



\### Backend



\- Node.js

\- Express.js

\- MongoDB

\- Mongoose

\- JWT

\- bcryptjs

\- Multer

\- pdf-parse

\- Express Validator

\- Helmet

\- Express Rate Limit



\### AI



\- Ollama

\- Llama 3.2



\## 🏗️ Project Structure



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

│   ├── Server.js

│   └── package.json

│

└── README.md





User

&#x20; ↓

Register / Login

&#x20; ↓

Upload Resume

&#x20; ↓

PDF Text Extraction

&#x20; ↓

MongoDB

&#x20; ↓

Select Job

&#x20; ↓

AI Resume ↔ Job Analysis

&#x20; ↓

Match Score

&#x20; ↓

Matched Skills

Missing Skills

Recommendations

&#x20; ↓

Match History







Resume

&#x20; ↓

AI Career Analysis

&#x20; ↓

Existing Skills

Skill Gaps

Recommended Skills

Career Roles

Learning Priorities



Resume

&#x20; ↓

AI Resume Improvement

&#x20; ↓

Professional Summary

Skill Improvements

Project Improvements

ATS Improvements

Job-Focused Suggestions

Overall Suggestions





git clone https://github.com/abhinay0990/AI-CareerMatch.git





cd frontend

npm install







cd "C:\\Users\\DELL\\OneDrive\\Desktop\\AI Career Resume\\backend"

npm install





PORT=5000

MONGODB\_URI=your\_mongodb\_connection\_string

JWT\_SECRET=your\_jwt\_secret





ollama pull llama3.2

ollama list



cd "C:\\Users\\DELL\\OneDrive\\Desktop\\AI Career Resume\\backend"

npm run dev





cd "C:\\Users\\DELL\\OneDrive\\Desktop\\AI Career Resume\\frontend"

npm run dev








const axios = require("axios");

const analyzeResume = async (resumeText, jobDescription) => {
    try {
        const prompt = `
You are an expert AI resume matching system.

Your task is to compare a candidate's resume with a job requirement.

IMPORTANT RULES:

1. Use ONLY information explicitly present in the resume.
2. NEVER invent skills, experience, achievements, percentages, CGPA, projects, or technologies.
3. Treat uppercase/lowercase variations as the same skill.
4. Treat common variations as equivalent:
   - REST API = REST APIs
   - JavaScript = JS
   - HTML5 = HTML
   - CSS3 = CSS
   - MySQL database = MySQL
   - Data Structures and Algorithms = DSA
5. Consider skills mentioned inside projects as valid skills.
6. Consider technologies mentioned in project descriptions as valid skills.
7. Give a realistic score based on the overall match.
8. Do not give a score of 0 unless there is almost no relationship between the resume and job.
9. Recommendations must be based ONLY on genuine gaps found in the resume.
10. Never create a fake achievement such as "improved accuracy by 25%".
11. If a skill is already present in the resume, DO NOT put it in missingSkills.
12. Do not recommend adding a skill that is already clearly present in the resume.

RESUME:

${resumeText}

JOB REQUIREMENTS:

${jobDescription}

SCORING GUIDELINE:

90-100 = Excellent match
75-89 = Strong match
60-74 = Moderate match
40-59 = Partial match
0-39 = Low match

Analyze:

- Programming languages
- Frameworks
- APIs
- Databases
- Web technologies
- Data structures and algorithms
- Development tools
- Projects
- Education
- Overall relevance

Return ONLY valid JSON.

Use exactly this structure:

{
    "matchScore": 0,
    "matchedSkills": [],
    "missingSkills": [],
    "recommendations": []
}

Make sure:

- matchScore is a number from 0 to 100.
- matchedSkills contains skills found in both the resume and job requirements.
- missingSkills contains important job requirements that are genuinely absent from the resume.
- recommendations contains practical improvements based only on the actual resume and job requirements.
`;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-oss-20b",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.2
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const content =
            response.data?.choices?.[0]?.message?.content || "";

        console.log("AI RAW RESPONSE:", content);

        const cleanedContent = content
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        const result = JSON.parse(cleanedContent);

        result.matchScore = Math.max(
            0,
            Math.min(100, Number(result.matchScore) || 0)
        );

        result.matchedSkills = Array.isArray(result.matchedSkills)
            ? result.matchedSkills
            : [];

        result.missingSkills = Array.isArray(result.missingSkills)
            ? result.missingSkills
            : [];

        result.recommendations = Array.isArray(result.recommendations)
            ? result.recommendations
            : [];

        return result;

    } catch (error) {
        console.error(
            "AI analysis error:",
            error.response?.data || error.message
        );

        throw new Error("AI analysis failed");
    }
};

module.exports = {
    analyzeResume
};
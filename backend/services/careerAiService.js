const axios = require("axios");

const analyzeCareer = async (resumeText) => {
    try {
        const prompt = `
You are an AI career analysis assistant.

Analyze the candidate's resume and provide useful career guidance.

IMPORTANT RULES:

1. Use ONLY information explicitly present in the resume.
2. NEVER invent skills, projects, experience, achievements,
   education, certifications, or technologies.
3. Separate existing skills from skills that should be learned.
4. Do not claim the candidate knows a technology unless it
   is clearly mentioned in the resume.
5. Recommended skills must be relevant to the candidate's
   existing background.
6. Career roles must be based on the skills and education
   actually present in the resume.
7. Keep recommendations practical for a student/fresher.
8. Do not create fake statistics or achievements.

RESUME:
${resumeText}

Analyze:

- Existing technical skills
- Existing development skills
- Existing AI/ML skills
- Skill gaps
- Recommended skills to learn
- Suitable entry-level career roles
- Learning priorities

Return ONLY valid JSON.

Use exactly this structure:

{
    "existingSkills": [],
    "skillGaps": [],
    "recommendedSkills": [],
    "careerRoles": [],
    "learningPriorities": []
}

Rules for the JSON:

existingSkills:
Skills clearly present in the resume.

skillGaps:
Important skills that would improve the candidate's
career opportunities but are not clearly present.

recommendedSkills:
Specific technologies, concepts, or tools worth learning.

careerRoles:
Suitable entry-level roles based only on the resume.

learningPriorities:
Practical learning priorities ordered from most useful
to less urgent.

Do not include explanations outside the JSON.
`;

        const response = await axios.post(
            "http://localhost:11434/api/generate",
            {
                model: "llama3.2",
                prompt: prompt,
                stream: false,
                format: "json"
            }
        );

        console.log(
            "CAREER AI RAW RESPONSE:",
            response.data.response
        );

        const result = JSON.parse(
            response.data.response
        );

        return {
            existingSkills: Array.isArray(
                result.existingSkills
            )
                ? result.existingSkills
                : [],

            skillGaps: Array.isArray(
                result.skillGaps
            )
                ? result.skillGaps
                : [],

            recommendedSkills: Array.isArray(
                result.recommendedSkills
            )
                ? result.recommendedSkills
                : [],

            careerRoles: Array.isArray(
                result.careerRoles
            )
                ? result.careerRoles
                : [],

            learningPriorities: Array.isArray(
                result.learningPriorities
            )
                ? result.learningPriorities
                : []
        };

    } catch (error) {
        console.error(
            "Career AI error:",
            error.response?.data ||
            error.message
        );

        throw new Error(
            "Career analysis failed"
        );
    }
};

module.exports = {
    analyzeCareer
};
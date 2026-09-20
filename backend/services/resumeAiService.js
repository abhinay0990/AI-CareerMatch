const axios = require("axios");

const improveResume = async (resumeText) => {
    try {
        const prompt = `
You are an expert AI resume improvement assistant.

Analyze the candidate's resume and provide practical,
truthful improvements.

IMPORTANT RULES:

1. Use ONLY information explicitly present in the resume.
2. NEVER invent skills, projects, experience, achievements,
   certifications, technologies, percentages, metrics,
   companies, or responsibilities.
3. Do not add fake numbers or achievements.
4. Do not claim the candidate has experience they do not have.
5. Improvements should make the resume clearer,
   more professional and ATS-friendly.
6. Preserve the candidate's actual background.
7. If something is already good, do not recommend changing
   it unnecessarily.
8. Recommendations must be specific and actionable.
9. Suggested keywords must be relevant to the candidate's
   existing background.
10. Do not recommend a technology as an existing skill unless
    it is already clearly present in the resume.

RESUME:
${resumeText}

Analyze these areas:

- Professional summary
- Technical skills
- Projects
- Education
- ATS optimization
- Overall presentation
- Job-focused improvements

Return ONLY valid JSON.

Use exactly this structure:

{
    "summarySuggestion": "",
    "skillImprovements": [],
    "projectImprovements": [],
    "atsImprovements": [],
    "jobFocusedSuggestions": [],
    "overallSuggestions": []
}

Rules:

summarySuggestion:
Give an improved professional summary based ONLY on the
candidate's actual resume information.

skillImprovements:
Suggest ways to organize, clarify or improve the skills
section without inventing skills.

projectImprovements:
Suggest ways to make existing project descriptions clearer
and stronger without creating fake achievements.

atsImprovements:
Give practical ATS-friendly formatting and keyword advice.

jobFocusedSuggestions:
Suggest improvements that can help the resume target
software/technology roles based on the actual resume.

overallSuggestions:
Give the most important practical improvements to make
the resume stronger.

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
            "RESUME AI RAW RESPONSE:",
            response.data.response
        );

        const result = JSON.parse(
            response.data.response
        );

        return {
            summarySuggestion:
                typeof result.summarySuggestion === "string"
                    ? result.summarySuggestion
                    : "",

            skillImprovements:
                Array.isArray(result.skillImprovements)
                    ? result.skillImprovements
                    : [],

            projectImprovements:
                Array.isArray(result.projectImprovements)
                    ? result.projectImprovements
                    : [],

            atsImprovements:
                Array.isArray(result.atsImprovements)
                    ? result.atsImprovements
                    : [],

            jobFocusedSuggestions:
                Array.isArray(
                    result.jobFocusedSuggestions
                )
                    ? result.jobFocusedSuggestions
                    : [],

            overallSuggestions:
                Array.isArray(result.overallSuggestions)
                    ? result.overallSuggestions
                    : []
        };

    } catch (error) {
        console.error(
            "Resume AI error:",
            error.response?.data ||
            error.message
        );

        throw new Error(
            "Resume improvement analysis failed"
        );
    }
};

module.exports = {
    improveResume
};
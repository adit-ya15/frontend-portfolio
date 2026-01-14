import Groq from "groq-sdk";

const groqClient = () => new Groq({
    apiKey: process.env.GROQ_API_KEY || "dummy-key-for-build",
});

export async function getGroqChatCompletion(
    messages: Groq.Chat.Completions.ChatCompletionMessageParam[]
) {
    const groq = groqClient();
    return await groq.chat.completions.create({
        model: "openai/gpt-oss-120b", // OpenAI GPT-OSS 120B via Groq
        messages,
        temperature: 0.7,
        tool_choice: "auto",
        tools: [
            {
                type: "function",
                function: {
                    name: "getOverview",
                    description:
                        "Provides a welcome message and explains what Aditya Verma’s portfolio assistant can help with, including example questions.",
                },
            },
            {
                type: "function",
                function: {
                    name: "getSkillsOverview",
                    description:
                        "Returns Aditya Verma’s frontend-focused technical skills, including languages, frameworks, state management, UI tools, and platforms.",
                },
            },
            {
                type: "function",
                function: {
                    name: "getExperienceOverview",
                    description:
                        "Gives an overview of Aditya Verma’s frontend experience, areas of focus, and internship-oriented profile.",
                },
            },
            {
                type: "function",
                function: {
                    name: "getProjectsOverview",
                    description:
                        "Lists Aditya Verma’s featured frontend projects such as InsightDash, AI Movie Recommendation App, and Spylt Milk with brief descriptions.",
                },
            },
            {
                type: "function",
                function: {
                    name: "getInsightDashDetails",
                    description:
                        "Provides detailed information about the InsightDash project including role-based access control, protected routes, UI components, and routing setup.",
                },
            },
            {
                type: "function",
                function: {
                    name: "getContactInfo",
                    description:
                        "Returns ways to contact Aditya Verma including GitHub, LinkedIn, portfolio website, and resume access.",
                },
            },
            {
                type: "function",
                function: {
                    name: "getGitHubStats",
                    description:
                        "Explains Aditya Verma’s GitHub activity, contribution stats, and where they are displayed in the portfolio.",
                },
            },
            {
                type: "function",
                function: {
                    name: "getArchitectureOverview",
                    description:
                        "Describes frontend architecture concepts used by Aditya Verma such as component architecture, protected routes, lazy loading, and performance optimization.",
                },
            },
            {
                type: "function",
                function: {
                    name: "getEducationOverview",
                    description:
                        "Provides an overview of Aditya Verma’s education including college, degree, CGPA, and academic background.",
                },
            },
        ],
    });
}

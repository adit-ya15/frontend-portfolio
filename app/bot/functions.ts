// =======================
// Portfolio AI Assistant
// =======================

export function getOverview(): string {
  return [
    "👋 Welcome! I'm Aditya Verma’s Portfolio AI Assistant.",
    "",
    "I can help you explore:",
    "• 💼 Frontend Experience & Background",
    "• 💻 Technical Skills & Tools",
    "• 🚀 Projects & Case Studies",
    "• 📊 GitHub & Coding Activity",
    "• 🧠 UI Architecture & Performance Concepts",
    "",
    "Try asking:",
    '• "What are Aditya’s skills?"',
    '• "Tell me about his projects"',
    '• "How does he optimize performance?"',
    '• "Show GitHub stats"',
    "",
    "Feel free to ask anything about Aditya’s frontend journey!",
  ].join("\n");
}

// ---- Skills ----

export function getSkillsOverview(): string {
  return [
    "🛠️ Aditya’s Technical Skillset:",
    "",
    "**Languages:**",
    "JavaScript (ES6+), TypeScript, HTML5, CSS3",
    "",
    "**Frontend Frameworks & Libraries:**",
    "React, React Router, Tailwind CSS, SCSS, Framer Motion, GSAP",
    "",
    "**State Management:**",
    "Redux Toolkit, Context API",
    "",
    "**Authentication & Services:**",
    "Firebase Authentication",
    "",
    "**Performance & UI Concepts:**",
    "Lazy Loading, Code Splitting, Protected Routes, RBAC, Component Architecture",
    "",
    "**Tools & Platforms:**",
    "Git, GitHub, Netlify, Vercel, VS Code",
  ].join("\n");
}

// ---- Experience ----

export function getExperienceOverview(): string {
  return [
    "💼 Professional Overview:",
    "",
    "Aditya is a **Frontend Developer** focused on:",
    "• Building scalable React applications",
    "• Designing role-based dashboards (Admin / User)",
    "• Implementing protected routes & authentication",
    "• Writing clean, reusable component architecture",
    "• Optimizing UI performance and Lighthouse scores",
    "",
    "He is actively seeking **frontend internship opportunities**.",
  ].join("\n");
}

// ---- Projects ----

export function getProjectsOverview(): string {
  return [
    "🚀 Featured Projects:",
    "",
    "1. **InsightDash – Role-Based Dashboard**",
    "   Frontend-focused admin & user dashboard with protected routes",
    "   Tech: React, Context API, React Router, SCSS, Netlify",
    "",
    "2. **AI-Powered Movie Recommendation App**",
    "   Netflix-style UI with AI-based movie suggestions",
    "   Tech: React, Redux, Firebase Auth, Gemini AI",
    "",
    "3. **Spylt Milk – Animated Brand Website**",
    "   Animation-heavy marketing site inspired by modern brand pages",
    "   Tech: React, Tailwind CSS, GSAP, ScrollTrigger",
    "",
    "Each project includes live demos, source code, and UI breakdowns.",
  ].join("\n");
}

// ---- InsightDash Details ----

export function getInsightDashDetails(): string {
  return [
    "📊 **InsightDash – Role-Based Admin & User Dashboard**",
    "",
    "**Overview:**",
    "A frontend-focused SaaS-style dashboard demonstrating real-world UI patterns.",
    "",
    "**Key Features:**",
    "• 🔐 Role-Based Access Control (Admin / User)",
    "• 🚦 Protected routes using React Router",
    "• 📊 Dashboard widgets, tables & summaries",
    "• ♻️ Reusable and scalable component structure",
    "• 🌐 Netlify redirect handling for SPA routing",
    "",
    "**Tech Stack:**",
    "React, Context API, React Router, SCSS, Netlify",
    "",
    "This project showcases real-world frontend architecture decisions.",
  ].join("\n");
}

// ---- Contact ----

export function getContactInfo(): string {
  return [
    "📬 Contact Aditya Verma:",
    "",
    "• 💼 LinkedIn: Available in Social Profiles section",
    "• 🐙 GitHub: github.com/adit-ya15",
    "• 🌐 Portfolio: Live portfolio website",
    "• 📄 Resume: Downloadable from hero section",
    "",
    "You can also reach out using the contact form on the website.",
  ].join("\n");
}

// ---- GitHub Stats ----

export function getGitHubStats(): string {
  return [
    "📊 GitHub Activity:",
    "",
    "Aditya maintains an active GitHub profile with:",
    "• Frontend-focused projects",
    "• Clean commit history",
    "• Practical React implementations",
    "",
    "Stats section includes:",
    "• Contribution graph",
    "• Most-used languages",
    "• Project activity overview",
    "",
    "All stats are displayed dynamically in the portfolio.",
  ].join("\n");
}

// ---- Architecture & UI Concepts ----

export function getArchitectureOverview(): string {
  return [
    "🧠 UI Architecture & Design Concepts:",
    "",
    "Aditya focuses on:",
    "• Component-driven architecture",
    "• Separation of concerns",
    "• Clean folder structure",
    "• Scalable routing patterns",
    "",
    "Key concepts demonstrated:",
    "• Protected Routes",
    "• Role-Based UI rendering",
    "• Lazy Loading & Code Splitting",
    "• Performance-aware rendering",
    "",
    "Architecture visuals are available in the portfolio.",
  ].join("\n");
}

// ---- Education ----

export function getEducationOverview(): string {
  return [
    "🎓 Education:",
    "",
    "• B.Tech in Electrical Engineering (Computer Science)",
    "  Ajay Kumar Garg Engineering College, Ghaziabad",
    "  CGPA: 8.01 | 2023 – 2027",
    "",
    "• CBSE Board (Class XII)",
    "  Green Field Academy, Lakhimpur Kheri",
    "  Percentage: 92%",
    "",
    "Currently focused on frontend development and UI engineering.",
  ].join("\n");
}

export const navLinks = [
	{ id: "about", title: "About" },
	{ id: "work", title: "Experience" },
	{ id: "projects", title: "Projects" },
	{ id: "stats", title: "Stats" },
	{ id: "diagrams", title: "Architecture" },
	{ id: "contact", title: "Contact" },
];

const services = [
	{ title: "Full-Stack Developer", icon: "/web.webp" },
	{ title: "Cloud & DevOps Engineer", icon: "/backend.webp" },
	{ title: "Backend & System Design", icon: "/creator.webp" },
	{ title: "Open Source Contributor", icon: "/mobile.webp" },
];

const technologies = [
	// Languages
	{ name: "JavaScript", icon: "/tech/JavaScript.svg" },
	{ name: "TypeScript", icon: "/tech/TypeScript.svg" },
	{ name: "Go", icon: "/tech/Go.svg" },
	{ name: "Python", icon: "/tech/Python.svg" },
	{ name: "Java", icon: "/tech/Java.svg" },
	{ name: "C", icon: "/tech/C.svg" },
	{ name: "C++", icon: "/tech/C++(CPlusPlus).svg" },

	// Frontend
	{ name: "React", icon: "/tech/React.svg" },
	{ name: "Next.js", icon: "/tech/Next.js.svg" },
	{ name: "HTML5", icon: "/tech/HTML5.svg" },
	{ name: "CSS3", icon: "/tech/CSS3.svg" },
	// removed Three.js by request

	// Backend & APIs
	{ name: "Node.js", icon: "/tech/Node.js.svg" },
	{ name: "Express", icon: "/tech/Express.png" },
	{ name: "GraphQL", icon: "/tech/GraphQL.svg" },
	{ name: "Apache Kafka", icon: "/tech/Apache_Kafka.svg" },

	// Databases & Caches
	{ name: "MongoDB", icon: "/tech/MongoDB.svg" },
	{ name: "PostgreSQL", icon: "/tech/PostgresSQL.svg" },
	{ name: "Redis", icon: "/tech/Redis.svg" },

	// Cloud & DevOps
	{ name: "Docker", icon: "/tech/Docker.svg" },
	{ name: "Kubernetes", icon: "/tech/Kubernetes.svg" },
	{ name: "AWS", icon: "/tech/AWS.svg" },
	{ name: "Google Cloud", icon: "/tech/Google_Cloud.svg" },
	{ name: "Jenkins", icon: "/tech/Jenkins.svg" },
	{ name: "Argo CD", icon: "/tech/Argo_CD.svg" },

	// Tools/Platforms
	{ name: "Firebase", icon: "/tech/Firebase.svg" },
	{ name: "GitHub", icon: "/tech/github.webp" },
	{ name: "Vercel", icon: "/tech/vercel.svg" },
	{ name: "Netlify", icon: "/tech/netlify.webp" },
];

// Grouped skills for consistent UI rendering
const technologyGroups: {
	title: string;
	items: { name: string; icon: string }[];
}[] = [
	{
		title: "Languages",
		items: [
			{ name: "JavaScript", icon: "/tech/JavaScript.svg" },
			{ name: "TypeScript", icon: "/tech/TypeScript.svg" },
			{ name: "Go", icon: "/tech/Go.svg" },
			{ name: "Python", icon: "/tech/Python.svg" },
			{ name: "Java", icon: "/tech/Java.svg" },
			{ name: "C", icon: "/tech/C.svg" },
			{ name: "C++", icon: "/tech/C++(CPlusPlus).svg" },
		],
	},
	{
		title: "Frontend",
		items: [
			{ name: "React", icon: "/tech/React.svg" },
			{ name: "Next.js", icon: "/tech/Next.js.svg" },
			{ name: "HTML5", icon: "/tech/HTML5.svg" },
			{ name: "CSS3", icon: "/tech/CSS3.svg" },
				// removed Three.js by request
		],
	},
	{
		title: "Backend & Messaging",
		items: [
			{ name: "Node.js", icon: "/tech/Node.js.svg" },
			{ name: "Express", icon: "/tech/Express.png" },
			{ name: "GraphQL", icon: "/tech/GraphQL.svg" },
			{ name: "Apache Kafka", icon: "/tech/Apache_Kafka.svg" },
		],
	},
	{
		title: "Databases & Cache",
		items: [
			{ name: "MongoDB", icon: "/tech/MongoDB.svg" },
			{ name: "PostgreSQL", icon: "/tech/PostgresSQL.svg" },
			{ name: "Redis", icon: "/tech/Redis.svg" },
		],
	},
	{
		title: "Cloud & DevOps",
		items: [
			{ name: "Docker", icon: "/tech/Docker.svg" },
			{ name: "Kubernetes", icon: "/tech/Kubernetes.svg" },
			{ name: "AWS", icon: "/tech/AWS.svg" },
			{ name: "Google Cloud", icon: "/tech/Google_Cloud.svg" },
			{ name: "Jenkins", icon: "/tech/Jenkins.svg" },
			{ name: "Argo CD", icon: "/tech/Argo_CD.svg" },
		],
	},
	{
		title: "Tools & Platforms",
		items: [
			{ name: "Firebase", icon: "/tech/Firebase.svg" },
			{ name: "GitHub", icon: "/tech/github.webp" },
			{ name: "Vercel", icon: "/tech/vercel.svg" },
			{ name: "Netlify", icon: "/tech/netlify.webp" },
		],
	},
];

const experiences = [
	{
		title: "B.Tech Electrical Engineering",
		company_name: "NIT Patna",
		icon: "/projectimg/placeholder.svg",
		iconBg: "#383E56",
		date: "2023 – 2027",
		points: [
			"CGPA: 8.26 / 10",
			"Coursework: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, OOPS",
			"Active in Hackslash community & ByteVerse hackathon organization",
		],
	},
	{
		title: "Full Stack Developer",
		company_name: "NASL Lab & Conference Website",
		icon: "/projectimg/nasl-lab.png",
		iconBg: "#E6DEDD",
		date: "Jan 2025 – Present",
		points: [
			"Building and maintaining NASL (Next-Generation Adaptive System Lab) platform with Express TS API, PostgreSQL, Prisma and S3 storage",
			"Developed Conference website (full-stack: frontend + backend) with React + Vite and Node.js",
			"Dockerized and deployed on Vercel and Render ensuring reliable, scalable production hosting",
			"Implemented rapid updates pipeline with automated CI/CD",
		],
	},
	{
		title: "Backend Developer & Open Source Contributor",
		company_name: "Open Source Projects",
		icon: "/tech/github.webp",
		iconBg: "#E6DEDD",
		date: "Jan 2025 – Present",
		points: [
			"Developed and published create-express-mongo-prod CLI tool - 300+ downloads in first month",
			"Bootstrap production-ready Express + MongoDB projects with integrated linting, formatting, and Docker support",
			"1000+ GitHub contributions & 260+ LeetCode problems solved",
			"Published multiple NPM packages: jwt-auth-pack, expresspro",
		],
	},
	{
		title: "Web Team Member",
		company_name: "Hackslash, NITP",
		icon: "/projectimg/hackslash.png",
		iconBg: "#383E56",
		date: "May 2024 – Present",
		points: [
			"Built and optimized Hackslash (NIT Patna) website team page using Next.js, Tailwind CSS, and Framer Motion",
			"Developed ByteVerse hackathon site - reduced navigation bounce rate by 15%",
			"Improved page load speed by 40% with code-splitting and optimization",
			"Delivered responsive, cross-browser UI with accessibility standards",
		],
	},
];

const testimonials = [
	{
		id: 1,
		testimonial: "Connect with me professionally on LinkedIn for experience, achievements & collaboration opportunities.",
		name: "Suryansh Verma",
		image: "/socialmedia/linkedin.svg",
		link: "https://linkedin.com/in/suryanshvermaa",
	},
	{
		id: 2,
		testimonial: "Explore my portfolio showcasing projects, cloud-native tooling & experiments.",
		name: "Suryansh Verma",
		image: "/socialmedia/portfolio.svg",
		link: "https://suryanshverma.vercel.app",
	},
	{
		id: 3,
		testimonial: "Dive into my open-source contributions, NPM packages & backend engineering repos on GitHub.",
		name: "Suryansh Verma",
		image: "/tech/github.webp",
		link: "https://github.com/suryanshvermaa",
	},
];


const projects :{
	name: string;
	description: string;
	tags: {
		name: string;
		color: string;
	}[];
	image: string;
	source_code_link?: string;
	deploy_link: string;
	platform: "Netlify" | "Vercel" | "Figma" | "Wordpress" | "Web"
}[] = [
		{
		name: "3D Interactive Portfolio",
		description: "Personal portfolio website built with Next.js 14, Three.js, Framer Motion, and Tailwind CSS. Features 3D animations, AI chatbot, and responsive design.",
		tags: [
			{ name: "nextjs", color: "blue-text-gradient" },
			{ name: "threejs", color: "pink-text-gradient" },
			{ name: "tailwind", color: "green-text-gradient" },
			{ name: "typescript", color: "blue-text-gradient" },
		],
		image: "/diagrams/HomePage.png",
		source_code_link: "https://github.com/suryanshvermaa/3DPortfolio",
		platform: "Vercel",
		deploy_link: "https://suryanshverma.vercel.app",
	},
	{
		name: "VM Launchpad",
		description: "Ephemeral Kubernetes VM workspaces with TypeScript Express API, React/Vite frontend, WebSocket-ready ingress, and Prisma/PostgreSQL persistence.",
		tags: [
			{ name: "typescript", color: "blue-text-gradient" },
			{ name: "express", color: "orange-text-gradient" },
			{ name: "react", color: "blue-text-gradient" },
			{ name: "vite", color: "pink-text-gradient" },
			{ name: "prisma", color: "green-text-gradient" },
			{ name: "postgresql", color: "green-text-gradient" },
			{ name: "kubernetes", color: "orange-text-gradient" },
			{ name: "docker", color: "green-text-gradient" },
		],
		image: "/projectimg/vm-app.png",
		source_code_link: "https://github.com/suryanshvermaa/VM-Launchpad",
		platform: "Web",
		deploy_link: "https://github.com/suryanshvermaa/VM-Launchpad",
	},
	{
		name: "Hackslash Official Website",
		description: "Community website built with Next.js and TailwindCSS, featuring animations powered by Framer Motion.",
		tags: [
			{ name: "nextjs", color: "blue-text-gradient" },
			{ name: "tailwind", color: "green-text-gradient" },
			{ name: "framer-motion", color: "orange-text-gradient" },
		],
		image: "/projectimg/hackslash.png",
		source_code_link: "https://github.com/HackSlashNITP/hackslash-official-site",
		platform: "Vercel",
		deploy_link: "https://hackslashnitp.vercel.app",
	},
	{
		name: "SCS Cloud Platform",
		description: "Cloud-native platform with HLS transcoding, static hosting, container service, object storage and K8s-ready deployment.",
		tags: [
			{ name: "nodejs", color: "blue-text-gradient" },
			{ name: "go", color: "blue-text-gradient" },
			{ name: "gRPC", color: "blue-text-gradient" },
			{ name: "docker", color: "green-text-gradient" },
			{ name: "kubernetes", color: "orange-text-gradient" },
			{ name: "aws", color: "pink-text-gradient" },
		],
		image: "/projectimg/scsCloud.png",
		source_code_link: "https://github.com/suryanshvermaa/scsCloud",
		platform: "Web",
		deploy_link: "https://github.com/suryanshvermaa/scsCloud",
	},
	{
		name: "Byteverse Hackathon",
		description: "Hackathon site for Byteverse 2025: Next.js, TailwindCSS, animations & contributor-friendly structure.",
		tags: [
			{ name: "nextjs", color: "blue-text-gradient" },
			{ name: "tailwind", color: "green-text-gradient" },
			{ name: "framer-motion", color: "orange-text-gradient" },
			{ name: "hackathon", color: "pink-text-gradient" },
		],
		image: "/projectimg/ByteverseHackathon.png",
		source_code_link: "https://github.com/HackSlashNITP/Byteverse-25",
		platform: "Vercel",
		deploy_link: "https://byteverse2k25.vercel.app/",
	},
	{
		name: "Conference Website",
		description: "Full‑stack conference platform: React + Vite frontend and Node.js API with MongoDB.",
		tags: [
			{ name: "react", color: "blue-text-gradient" },
			{ name: "express", color: "orange-text-gradient" },
			{ name: "mongodb", color: "green-text-gradient" },
			{ name: "vite", color: "pink-text-gradient" },
		],
		image: "/projectimg/conferenceWebsite.png",
		source_code_link: "https://github.com/suryanshvermaa/Conference_website",
		platform: "Vercel",
		deploy_link: "https://icnari26.nasl.in",
	},
	{
		name: "Event Management App",
		description: "Mobile-first app built with React Native + Express, featuring OTP/JWT authentication and fast search.",
		tags: [
			{ name: "react-native", color: "blue-text-gradient" },
			{ name: "express", color: "orange-text-gradient" },
			{ name: "mongodb", color: "green-text-gradient" },
		],
		image: "/projectimg/event-management.svg",
		source_code_link: "https://github.com/suryanshvermaa/eventManagementApp",
		platform: "Web",
		deploy_link: "https://github.com/suryanshvermaa/eventManagementApp",
	},
	
	{
		name: "Two-Tier Node.js Deployment",
		description: "Scalable Node.js + MongoDB stack on AWS EKS with Jenkins CI/CD and ArgoCD.",
		tags: [
			{ name: "kubernetes", color: "orange-text-gradient" },
			{ name: "docker", color: "green-text-gradient" },
			{ name: "aws", color: "blue-text-gradient" },
		],
		image: "/projectimg/two-tier.svg",
		source_code_link: "https://github.com/suryanshvermaa/Two-Tier-Nodejs-MongoDb-App-deployment",
		platform: "Web",
		deploy_link: "https://github.com/suryanshvermaa/Two-Tier-Nodejs-MongoDb-App-deployment",
	},
	{
		name: "create-express-mongo-prod",
		description: "CLI to scaffold production-grade Express + Mongo apps with Docker, ESLint, and Prettier.",
		tags: [
			{ name: "npm", color: "pink-text-gradient" },
			{ name: "express", color: "orange-text-gradient" },
			{ name: "docker", color: "green-text-gradient" },
		],
		image: "/projectimg/create-express-mongo-prod.svg",
		source_code_link: "https://github.com/suryanshvermaa/create-express-mongo-prod",
		platform: "Web",
		deploy_link: "https://www.npmjs.com/package/create-express-mongo-prod",
	},
	{
		name: "jwt-auth-pack",
		description: "Lightweight JWT middleware for Express and TypeScript with a simple API and fast validation.",
		tags: [
			{ name: "express", color: "orange-text-gradient" },
			{ name: "typescript", color: "blue-text-gradient" },
			{ name: "jwt", color: "pink-text-gradient" },
		],
		image: "/projectimg/jwt-auth-pack.svg",
		source_code_link: "https://github.com/suryanshvermaa/jwt-auth-pack",
		platform: "Web",
		deploy_link: "https://www.npmjs.com/package/jwt-auth-pack",
	},
	{
		name: "Go Microservices E-commerce",
		description: "Go microservices e‑commerce: account, catalog (Elasticsearch), orders and a GraphQL gateway over gRPC.",
		tags: [
			{ name: "go", color: "blue-text-gradient" },
			{ name: "grpc", color: "orange-text-gradient" },
			{ name: "graphql", color: "pink-text-gradient" },
			{ name: "postgresql", color: "green-text-gradient" },
			{ name: "elasticsearch", color: "blue-text-gradient" },
			{ name: "docker", color: "green-text-gradient" },
		],
		image: "/projectimg/go-microservices.svg",
		source_code_link: "https://github.com/suryanshvermaa/microservices",
		platform: "Web",
		deploy_link: "https://github.com/suryanshvermaa/microservices",
	},
	{
		name: "ExpressPro",
		description: "Enhanced Express.js with built-in JWT auth, error handling, async utilities, and TypeScript support. Published NPM package.",
		tags: [
			{ name: "express", color: "orange-text-gradient" },
			{ name: "typescript", color: "blue-text-gradient" },
			{ name: "jwt", color: "pink-text-gradient" },
			{ name: "npm", color: "green-text-gradient" },
		],
		image: "/projectimg/expresspro.svg",
		source_code_link: "https://github.com/suryanshvermaa/expresspro",
		platform: "Web",
		deploy_link: "https://www.npmjs.com/package/expresspro",
	},
	{
		name: "C++ Todo API with Full CI/CD",
		description: "C++ web app using Drogon + PostgreSQL with JWT auth and modular middleware.",
		tags: [
			{ name: "cpp", color: "blue-text-gradient" },
			{ name: "postgresql", color: "green-text-gradient" },
			{ name: "docker", color: "pink-text-gradient" },
			{ name: "kubernetes", color: "blue-text-gradient" },
			{name: "jenkins", color: "yellow-text-gradient" },
			{ name: "argo-cd", color: "green-text-gradient" },
		],
		image: "/projectimg/drogonCpp.png",
		source_code_link: "https://github.com/suryanshvermaa/my-fastest-drogon-app-cpp",
		platform: "Web",
		deploy_link: "https://github.com/suryanshvermaa/my-fastest-drogon-app-cpp",
	},
	{
		name: "Automated Tools Platform",
		description: "Full-stack AI-powered automation suite for email generation, data extraction from CSV/PDF/XLSX, and bulk mailing with Google Gemini AI integration.",
		tags: [
			{ name: "react", color: "blue-text-gradient" },
			{ name: "typescript", color: "blue-text-gradient" },
			{ name: "nodejs", color: "green-text-gradient" },
			{ name: "gemini-ai", color: "pink-text-gradient" },
			{ name: "docker", color: "green-text-gradient" },
		],
		image: "/projectimg/automated-tools.png",
		source_code_link: "https://github.com/suryanshvermaa/tools",
		platform: "Web",
		deploy_link: "https://github.com/suryanshvermaa/tools",
	},
	{
		name: "NEXT-GENERATION-ADAPTIVE-SYSTEM-LAB (NASL)",
		description: "Full‑stack lab platform: static site + Express TS API with PostgreSQL, Prisma and S3 storage.",
		tags: [
			{ name: "express", color: "orange-text-gradient" },
			{ name: "typescript", color: "blue-text-gradient" },
			{ name: "postgresql", color: "green-text-gradient" },
			{ name: "prisma", color: "pink-text-gradient" },
			{ name: "s3", color: "blue-text-gradient" },
			{ name: "docker", color: "green-text-gradient" },
		],
		image: "/projectimg/nasl-lab.png",
		source_code_link: "https://github.com/suryanshvermaa/NEXT-GENERATION-ADAPTIVE-SYSTEM-LAB-NASL-",
		platform: "Web",
		deploy_link: "https://lab.nasl.in",
	},
];

export { services, technologies, technologyGroups, experiences, testimonials, projects };

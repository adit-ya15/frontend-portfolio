export const navLinks = [
	{ id: "about", title: "About" },
	{ id: "work", title: "Experience" },
	{ id: "projects", title: "Projects" },
	{ id: "contact", title: "Contact" },
];

const services = [
	{ title: "Full-Stack Developer", icon: "/web.webp" },
	{ title: "Cloud & DevOps Engineer", icon: "/backend.webp" },
	{ title: "Backend & System Design", icon: "/creator.webp" },
	{ title: "Open Source Contributor", icon: "/mobile.webp" },
];

const technologies = [
	{
		name: "HTML 5",
		icon: "/tech/html.webp",
	},
	{
		name: "CSS 3",
		icon: "/tech/css.webp",
	},
	{
		name: "JavaScript",
		icon: "/tech/javascript.webp",
	},
	{
		name: "TypeScript",
		icon: "/tech/typescript.webp",
	},
	{
		name: "React JS",
		icon: "/tech/reactjs.webp",
	},
	{
		name: "Next.JS",
		icon: "/tech/nextjs.svg",
	},
	{
		name: "Redux Toolkit",
		icon: "/tech/redux.webp",
	},
	{
		name: "Tailwind CSS",
		icon: "/tech/tailwind.webp",
	},
	{
		name: "Three JS",
		icon: "/tech/threejs.webp",
	},
	{
		name: "git",
		icon: "/tech/git.webp",
	},
	{
		name: "figma",
		icon: "/tech/figma.webp",
	},
	{
		name: "wordpress",
		icon: "/tech/wordpress.webp",
	},
	{
		name: "bootstrap",
		icon: "/tech/bootstrap.webp",
	},
];

const experiences = [
	{
		title: "B.Tech Electrical Engineering",
		company_name: "NIT Patna",
		icon: "/projectimg/mern.png",
		iconBg: "#383E56",
		date: "2023 – 2027",
		points: [
			"CGPA: 8.26 / 10",
			"Exploring Golang, Microservices & Generative AI",
			"Active in Hackslash community & ByteVerse hackathon organization",
		],
	},
	{
		title: "SCS Cloud Platform (Personal Project)",
		company_name: "SCS Cloud Platform Project",
		icon: "/projectimg/issuetracker.png",
		iconBg: "#E6DEDD",
		date: "2024 – Present",
		points: [
			"HLS transcoding, static hosting & object storage",
			"Kubernetes-ready deployment (NGINX Ingress + Kind)",
			"Payments via Cashfree + Redis BullMQ queue",
			"Integrated AI assistant (Groq) for workflows",
		],
	},
	{
		title: "Open Source & DevOps",
		company_name: "Community & Tooling",
		icon: "/tech/github.webp",
		iconBg: "#E6DEDD",
		date: "Ongoing",
		points: [
			"1000+ GitHub contributions & 250+ LeetCode problems solved",
			"Published NPM packages: create-express-mongo-prod, jwt-auth-pack",
			"CI/CD automation with Jenkins, ArgoCD & Terraform experiments",
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
		name: "SCS Cloud Platform",
		description: "Cloud-native platform for HLS transcoding, static hosting & object storage with Kubernetes-ready deployment & AI assistant integration.",
		tags: [
			{ name: "nodejs", color: "blue-text-gradient" },
			{ name: "docker", color: "green-text-gradient" },
			{ name: "kubernetes", color: "orange-text-gradient" },
			{ name: "aws", color: "pink-text-gradient" },
		],
		image: "/projectimg/mern.png",
		source_code_link: "https://github.com/suryanshvermaa/scsCloud",
		platform: "Web",
		deploy_link: "https://github.com/suryanshvermaa/scsCloud",
	},
	{
		name: "Event Management App",
		description: "Mobile-first event platform with OTP + JWT auth & fast search for discovering and managing events.",
		tags: [
			{ name: "react", color: "blue-text-gradient" },
			{ name: "express", color: "orange-text-gradient" },
			{ name: "mongodb", color: "green-text-gradient" },
		],
		image: "/projectimg/sparkbright.png",
		source_code_link: "https://github.com/suryanshvermaa/eventManagementApp",
		platform: "Web",
		deploy_link: "https://github.com/suryanshvermaa/eventManagementApp",
	},
	{
		name: "Hackslash Official Website",
		description: "Fast, animated community website boosting engagement & navigation performance using Next.js + Tailwind + Framer Motion.",
		tags: [
			{ name: "nextjs", color: "blue-text-gradient" },
			{ name: "tailwind", color: "green-text-gradient" },
			{ name: "framer-motion", color: "orange-text-gradient" },
		],
		image: "/projectimg/metaverse.png",
		platform: "Vercel",
		deploy_link: "https://hackslashnitp.vercel.app",
	},
	{
		name: "Two-Tier Node.js Deployment",
		description: "Highly scalable two-tier Node.js + MongoDB service on AWS EKS with Jenkins CI/CD & ArgoCD GitOps.",
		tags: [
			{ name: "kubernetes", color: "orange-text-gradient" },
			{ name: "docker", color: "green-text-gradient" },
			{ name: "aws", color: "blue-text-gradient" },
		],
		image: "/projectimg/issuetracker.png",
		source_code_link: "https://github.com/suryanshvermaa/Two-Tier-Nodejs-MongoDb-App-deployment",
		platform: "Web",
		deploy_link: "https://github.com/suryanshvermaa/Two-Tier-Nodejs-MongoDb-App-deployment",
	},
	{
		name: "create-express-mongo-prod",
		description: "CLI scaffolder for production-ready Express.js apps with Docker, ESLint, Prettier & Mongo integration (300+ downloads).",
		tags: [
			{ name: "npm", color: "pink-text-gradient" },
			{ name: "express", color: "orange-text-gradient" },
			{ name: "docker", color: "green-text-gradient" },
		],
		image: "/projectimg/hoobank.webp",
		source_code_link: "https://github.com/suryanshvermaa/create-express-mongo-prod",
		platform: "Web",
		deploy_link: "https://www.npmjs.com/package/create-express-mongo-prod",
	},
	{
		name: "My Drogon App (C++)",
		description: "Modern C++ web app with Drogon + PostgreSQL featuring JWT auth, modular middleware & Kubernetes/Jenkins deployment.",
		tags: [
			{ name: "cpp", color: "blue-text-gradient" },
			{ name: "postgresql", color: "green-text-gradient" },
			{ name: "jwt", color: "orange-text-gradient" },
		],
		image: "/projectimg/avm.webp",
		source_code_link: "https://github.com/suryanshvermaa/my-fastest-drogon-app-cpp",
		platform: "Web",
		deploy_link: "https://github.com/suryanshvermaa/my-fastest-drogon-app-cpp",
	},
	{
		name: "jwt-auth-pack",
		description: "Lightweight JWT middleware for Express + TypeScript delivering fast token validation & plug-and-play setup.",
		tags: [
			{ name: "express", color: "orange-text-gradient" },
			{ name: "typescript", color: "blue-text-gradient" },
			{ name: "jwt", color: "pink-text-gradient" },
		],
		image: "/projectimg/sparkbright.png",
		source_code_link: "https://github.com/suryanshvermaa/jwt-auth-pack",
		platform: "Web",
		deploy_link: "https://www.npmjs.com/package/jwt-auth-pack",
	},
];

export { services, technologies, experiences, testimonials, projects };

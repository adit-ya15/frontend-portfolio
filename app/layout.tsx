import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import "@/app/styles/globals.css";
import { Providers } from "./providers";

const fontSans = FontSans({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-sans",
});
export const metadata: Metadata = {
	title: "Aditya Verma | Frontend Developer | React & Modern UI",
	description:
		"Aditya Verma — Frontend Developer skilled in building React-based applications with strong focus on component architecture, state management (Redux, Context API), protected routes, and performance optimization. Experienced in creating responsive, role-based dashboards, implementing lazy loading, and delivering clean, scalable UI.",
	keywords: [
		"Aditya Verma",
		"Frontend Developer",
		"React Developer",
		"JavaScript(ES6 +)",
		"HTML5",
		"CSS3",
		"Responsive Web Design",
		"Single Page Applications(SPA)",
		"Component - Based Architecture",
		"Modern UI Development",
		"MERN",
		"Open Source",
		"Next.js",
		"React",
		"Redux",
		"Context API",
		"Protected Routes",
		"Performance Optimization",
		"Responsive Web Design",
		"Role-based Dashboards",
		"Lazy Loading",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={fontSans.variable}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

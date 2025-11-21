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
	title: "Suryansh Verma | Full-Stack & Cloud / DevOps Portfolio",
	description:
		"Suryansh Verma — Full-Stack Developer & Cloud/DevOps Engineer skilled in Node.js, Golang, Docker, Kubernetes, AWS, and MERN Stack. Building scalable, cloud-native platforms and developer tools. Passionate about open-source, automation, and backend engineering.",
	keywords: [
		"Suryansh Verma",
		"Full-Stack Developer",
		"Cloud Engineer",
		"DevOps Engineer",
		"Backend Developer",
		"Node.js",
		"Golang",
		"Docker",
		"Kubernetes",
		"AWS",
		"MERN",
		"System Design",
		"Microservices",
		"NIT Patna",
		"Open Source",
		"SCS Cloud",
		"Hackslash",
		"ByteVerse",
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

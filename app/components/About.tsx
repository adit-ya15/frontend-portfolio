"use client";

import { SectionWrapper } from "./HigherOrderComponents";
import { motion } from "framer-motion";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { fetchServices } from "@/lib/api";
import { fadeIn, textVariant } from "@/app/utils/motion";
import { useState, useEffect } from "react";

type Service = {
	id: string;
	title: string;
	icon: string;
};

type ServiceCardProps = {
	index: number;
	title: string;
	icon: string;
};

const ServiceCard = ({ index, title, icon }: ServiceCardProps) => {
	return (
		<>
			<Tilt
				options={{ max: 45, scale: 1, speed: 450 }}
				className="xs:w-[250px] w-full"
			>
				<motion.div
					variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
					className="w-full green-pink-gradient p-px rounded-[20px] shadow-card"
				>
					<div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
						<Image
							src={icon}
							width={64}
							height={64}
							alt={title}
							className="w-16 h-16 object-contain"
						/>
						<h3 className="text-white text-[20px] font-bold text-center">
							{title}
						</h3>
					</div>
				</motion.div>
			</Tilt>
		</>
	);
};

const About = ({ services }: { services: Service[] }) => {

	// Removed internal fetching logic as data is now passed from parent

	return (
		<>
			<motion.div variants={textVariant()}>
				<p className="sectionSubText">Introduction</p>
				<h2 className="sectionHeadText">Overview.</h2>
			</motion.div>

			<motion.p
				variants={fadeIn("", "", 0.1, 1)}
				className="mt-4 text-secondary text-[16px] sm:text-[17px] lg:text-[19px] max-w-3xl leading-relaxed"
			>
				I’m <span className="text-white font-semibold">Aditya Verma</span>, a
				<strong className="text-white font-semibold"> frontend-focused developer</strong> who enjoys building <strong className="text-white font-semibold">clean, performant, and scalable web applications</strong> using React and modern frontend tools.
				I have hands-on experience creating <strong className="text-white font-semibold">real-world UI patterns</strong> such as <strong className="text-white font-semibold">role-based dashboards, protected routes, global state management</strong>, and <strong className="text-white font-semibold">animation-heavy interfaces</strong>. My work focuses on <strong className="text-white font-semibold">component architecture, performance optimization, and clean UI/UX</strong>, rather than just making things “work”.
				Through projects like <strong className="text-white font-semibold">InsightDash</strong>, <strong className="text-white font-semibold">AI-Powered Movie Recommendation App</strong>, and <strong className="text-white font-semibold">Spylt Milk</strong>, I’ve worked on problems involving <strong className="text-white font-semibold">authentication flows, conditional rendering, AI integration</strong>, and <strong className="text-white font-semibold">smooth motion design</strong>. I’m actively seeking <strong className="text-white font-semibold">frontend internship opportunities</strong> where I can learn from experienced engineers and contribute to impactful products.
			</motion.p>
			<div className="mt-20 flex flex-wrap gap-10 justify-center">
				{services.map((service, index) => (
					<ServiceCard key={service.title} index={index} {...service} />
				))}
			</div>
		</>
	);
};

export default SectionWrapper(About, "about");

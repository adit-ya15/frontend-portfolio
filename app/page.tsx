"use client";

import {
	About,
	Contact,
	Experience,
	Feedbacks,
	Hero,
	Navbar,
	Tech,
	Works,
	StarsCanvas,
	Stats,
	Diagrams,
	Videos,
	Articles,
} from "./components";
import Chatbot from "./components/Chatbot";
import ShareButtons from "./components/ShareButtons";
import { useEffect, useState } from "react";
import {
	fetchExperiences,
	fetchTechnologies,
	fetchServices,
	fetchProjects,
	fetchTestimonials,
	fetchStats,
} from "@/lib/api";

export default function Home() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [services, setServices] = useState<any[]>([]);

	useEffect(() => {
		async function loadAll() {
			const [
				experiencesData,
				servicesData,
				technologiesData,
				projectsData,
				testimonialsData,
				statsData
			] = await Promise.all([
				fetchExperiences(),
				fetchServices(),
				fetchTechnologies(),
				fetchProjects(),
				fetchTestimonials(),
				fetchStats(),
			]);
			setServices(servicesData);
			setIsLoaded(true);
		}
		loadAll();
	}, []);

	if (!isLoaded) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-primary">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#915EFF]"></div>
			</div>
		);
	}

	return (
		<div className="relative z-0 bg-primary font-sans">
			<div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
				<Navbar />
				<Hero />
			</div>
			<About services={services} />
			<Experience isLoaded={isLoaded} />
			<Tech isLoaded={isLoaded} />
			<Articles />
			<Works />
			<Videos />
			<Stats />
			<Diagrams />
			<Feedbacks />
			<div className="relative z-0">
				<Contact />
				<StarsCanvas />
			</div>
			<Chatbot />
			<ShareButtons />
		</div>
	);
}

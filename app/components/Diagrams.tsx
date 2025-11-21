"use client";
import { SectionWrapper } from "@/app/components/HigherOrderComponents";
import { textVariant, fadeIn } from "@/app/utils/motion";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { DiagramCardSkeleton } from "./SkeletonLoader";

interface Diagram {
	id: string;
	title: string;
	description: string;
	image: string;
}

const Diagrams = () => {
	const [diagrams, setDiagrams] = useState<Diagram[]>([]);
	const [selectedDiagram, setSelectedDiagram] = useState<Diagram | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDiagrams = async () => {
			try {
				const response = await fetch("/api/diagrams");
				const data = await response.json();
				setDiagrams(data);
			} catch (error) {
				console.error("Failed to fetch diagrams:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchDiagrams();
	}, []);

	if (loading) {
		return (
			<div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
				<DiagramCardSkeleton />
				<DiagramCardSkeleton />
				<DiagramCardSkeleton />
			</div>
		);
	}

	return (
		<>
			<motion.div variants={textVariant()}>
				<p className="sectionSubText text-center">System Design & Architecture</p>
				<h2 className="sectionHeadText text-center">Technical Diagrams.</h2>
			</motion.div>

			<div className="w-full flex justify-center">
				<motion.p
					variants={fadeIn("", "", 0.1, 1)}
					className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] text-center"
				>
					Visual representations of my application architectures, system designs, and technical workflows.
					Created with Eraser.io to showcase the thought process behind building scalable applications.
				</motion.p>
			</div>

			<div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
				{diagrams.map((diagram, index) => (
					<motion.div
						key={diagram.id}
						variants={fadeIn("up", "spring", index * 0.1, 0.75)}
						onClick={() => setSelectedDiagram(diagram)}
						className="cursor-pointer"
					>
						<Tilt
							className="bg-tertiary p-5 rounded-2xl w-full h-full"
							tiltMaxAngleX={10}
							tiltMaxAngleY={10}
						>
								<div className="relative w-full h-[230px]">
									<Image src={diagram.image} alt={diagram.title} fill className="object-cover rounded-2xl" />
								</div>
								<div className="absolute inset-0 flex justify-end m-3 card-img_hover">
									<div className="bg-black-100 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
										<svg
											className="w-5 h-5 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
											/>
										</svg>
									</div>
								</div>
							<div className="mt-5">
								<h3 className="text-white font-bold text-[24px]">{diagram.title}</h3>
								<p className="mt-2 text-secondary text-[14px] leading-[22px]">
									{diagram.description}
								</p>
							</div>
						</Tilt>
					</motion.div>
				))}
			</div>

			{/* Lightbox Modal */}
			{selectedDiagram && (
				<div
					className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
					onClick={() => setSelectedDiagram(null)}
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						className="relative max-w-6xl w-full bg-tertiary rounded-2xl p-6"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setSelectedDiagram(null)}
							className="absolute top-4 right-4 bg-black-100 text-white rounded-full p-2 hover:bg-[#915EFF] transition-all z-10"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>

						<div className="max-h-[80vh] overflow-auto">
							<Image src={selectedDiagram.image} alt={selectedDiagram.title} width={1200} height={800} className="w-full h-auto rounded-lg" />
							<div className="mt-6">
								<h2 className="text-white font-bold text-[28px]">
									{selectedDiagram.title}
								</h2>
								<p className="mt-2 text-secondary text-[16px] leading-[26px]">
									{selectedDiagram.description}
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</>
	);
};

export default SectionWrapper(Diagrams, "diagrams");

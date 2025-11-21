"use client";
import { motion } from "framer-motion";
import React from "react";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "./HigherOrderComponents";

type VideoCardProps = {
	index: number;
	name: string;
	description: string;
	video_demo_link: string;
	image: string;
};

const VideoCard = ({
	index,
	name,
	description,
	video_demo_link,
	image,
}: VideoCardProps) => {
	const [isPlaying, setIsPlaying] = React.useState(false);

	return (
		<motion.div
			variants={fadeIn("up", "spring", index * 0.5, 0.75)}
			className="w-full"
		>
			<div className="bg-tertiary p-5 rounded-2xl w-full">
				<div className="flex flex-col lg:flex-row gap-5">
					{/* Video Player */}
					<div className="w-full lg:w-2/3">
						<div className="relative w-full rounded-2xl overflow-hidden aspect-video bg-black">
							{!isPlaying ? (
								<div
									className="relative w-full h-full cursor-pointer group"
									onClick={() => setIsPlaying(true)}
								>
									<img
										src={image}
										alt={name}
										className="w-full h-full object-cover"
									/>
									{/* Play button overlay */}
									<div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
										<div className="bg-white/90 rounded-full p-6 group-hover:scale-110 transition-transform">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="48"
												height="48"
												viewBox="0 0 24 24"
												fill="black"
											>
												<path d="M8 5v14l11-7z" />
											</svg>
										</div>
									</div>
								</div>
							) : (
								<video
									controls
									autoPlay
									className="w-full h-full object-cover"
								>
									<source src={video_demo_link} type="video/mp4" />
									Your browser does not support the video tag.
								</video>
							)}
						</div>
					</div>

					{/* Video Info */}
					<div className="w-full lg:w-1/3 flex flex-col justify-center">
						<h3 className="text-white font-bold text-[24px] mb-3">{name}</h3>
						<p className="text-secondary text-[16px] leading-[24px]">
							{description}
						</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const Videos = () => {
	// Filter projects that have video_demo_link
	const videoDemos = projects.filter((project) => project.video_demo_link);

	if (videoDemos.length === 0) {
		return null; // Don't render the section if there are no videos
	}

	return (
		<>
			<motion.div variants={textVariant()}>
				<p className="sectionSubText">Project Demonstrations</p>
				<h2 className="sectionHeadText">Video Demos.</h2>
			</motion.div>

			<div className="w-full flex">
				<motion.p
					variants={fadeIn("", "", 0.1, 1)}
					className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
				>
					Watch live demonstrations of my projects in action. These videos showcase
					the key features, functionality, and user experience of each application.
				</motion.p>
			</div>

			<div className="mt-14 sm:mt-20 flex flex-col gap-10">
				{videoDemos.map((project, index) => (
					<VideoCard
						key={`video-${index}`}
						index={index}
						name={project.name}
						description={project.description}
						video_demo_link={project.video_demo_link!}
						image={project.image}
					/>
				))}
			</div>
		</>
	);
};

export default SectionWrapper(Videos, "videos");

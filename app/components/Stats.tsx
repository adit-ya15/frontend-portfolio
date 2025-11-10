"use client";
import { SectionWrapper } from "@/app/components/HigherOrderComponents";
import { textVariant, fadeIn } from "@/app/utils/motion";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

const Stats = () => {
	return (
		<>
			<motion.div variants={textVariant()}>
				<p className="sectionSubText text-center">My Coding Journey</p>
				<h2 className="sectionHeadText text-center">GitHub & LeetCode Stats.</h2>
			</motion.div>

			<div className="mt-20 flex flex-col gap-10">
				{/* GitHub Stats */}
				<motion.div variants={fadeIn("up", "spring", 0.1, 0.75)} className="w-full">
					<h3 className="text-white text-[24px] font-bold mb-8 text-center">GitHub Statistics</h3>
					<div className="flex flex-wrap justify-center gap-6">
						{/* GitHub Stats Card */}
						<div className="w-full sm:w-[48%] lg:w-[32%] bg-tertiary rounded-2xl p-1">
							<Image
								src="https://github-readme-stats.vercel.app/api?username=suryanshvermaa&show_icons=true&theme=radical&hide_border=true&bg_color=151030&title_color=915EFF&icon_color=915EFF&text_color=FFFFFF"
								alt="GitHub Stats"
								width={1200}
								height={600}
								className="w-full h-auto rounded-2xl"
							/>
						</div>

						{/* GitHub Streak */}
						<div className="w-full sm:w-[48%] lg:w-[32%] bg-tertiary rounded-2xl p-1">
							<Image
								src="https://github-readme-streak-stats.herokuapp.com/?user=suryanshvermaa&theme=radical&hide_border=true&background=151030&ring=915EFF&fire=915EFF&currStreakLabel=915EFF"
								alt="GitHub Streak"
								width={1200}
								height={600}
								className="w-full h-auto rounded-2xl"
							/>
						</div>

						{/* Most Commit Language */}
						<div className="w-full sm:w-[48%] lg:w-[32%] bg-tertiary rounded-2xl p-1">
							<Image
								src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=suryanshvermaa&theme=tokyonight"
								alt="Most Commit Language"
								width={1200}
								height={600}
								className="w-full h-auto rounded-2xl"
							/>
						</div>

						{/* Repos Per Language */}
						<div className="w-full sm:w-[48%] lg:w-[32%] bg-tertiary rounded-2xl p-1">
							<Image
								src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=suryanshvermaa&theme=tokyonight"
								alt="Repos Per Language"
								width={1200}
								height={600}
								className="w-full h-auto rounded-2xl"
							/>
						</div>
					</div>
				</motion.div>

				{/* LeetCode Stats */}
				<motion.div variants={fadeIn("up", "spring", 0.3, 0.75)} className="w-full">
					<h3 className="text-white text-[24px] font-bold mb-8 text-center">LeetCode Statistics</h3>
					<div className="flex justify-center">
						{/* LeetCode Stats Card */}
							<div className="w-full max-w-[600px] bg-tertiary rounded-2xl p-1">
								<Image
									src="https://leetcard.jacoblin.cool/suryanshverma_1?theme=dark&font=Ubuntu&ext=activity"
									alt="LeetCode Stats"
									width={1000}
									height={450}
									className="w-full h-auto rounded-2xl"
								/>
							</div>
					</div>
				</motion.div>
			</div>
		</>
	);
};

export default SectionWrapper(Stats, "stats");

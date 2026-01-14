"use client";
import { SectionWrapper } from "@/app/components/HigherOrderComponents";
import { textVariant, fadeIn } from "@/app/utils/motion";
import { motion } from "framer-motion";
import React from "react";

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
							<img
								src="https://github-readme-stats-sigma-five.vercel.app/api?username=adit-ya15&show_icons=true&hide_border=true&bg_color=151030&title_color=915EFF&icon_color=915EFF&text_color=ffffff"
								alt="GitHub Stats"
								className="w-full h-auto rounded-2xl"
							/>
						</div>

						{/* GitHub Streak */}
						<div className="w-full sm:w-[48%] lg:w-[32%] bg-tertiary rounded-2xl p-6 flex flex-col justify-center items-center transform transition-all hover:scale-105 duration-300 shadow-card border border-white/5">
							<h4 className="text-[#915EFF] text-[18px] font-bold mb-2">Current Streak</h4>
							<div className="relative">
								<span className="text-white text-[48px] font-black leading-none flex items-center gap-2">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#915EFF] animate-pulse" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
									</svg>
									2 Days
								</span>
							</div>
							<p className="text-secondary text-[14px] mt-2 mb-4">Keep it burning! 🔥</p>

							<div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-2" />

							<div className="flex justify-between w-full mt-2 px-4">
								<div className="flex flex-col items-center">
									<span className="text-[#915EFF] font-bold text-[16px]">150+</span>
									<span className="text-secondary text-[12px]">Total Contribs</span>
								</div>
								<div className="w-[1px] bg-white/10 h-10" />
								<div className="flex flex-col items-center">
									<span className="text-green-400 font-bold text-[16px]">5 Days</span>
									<span className="text-secondary text-[12px]">Longest Streak</span>
								</div>
							</div>
						</div>

						{/* Most Commit Language */}
						<div className="w-full sm:w-[48%] lg:w-[32%] bg-tertiary rounded-2xl p-1">
							<img
								src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=adit-ya15&theme=tokyonight"
								alt="Most Commit Language"
								className="w-full h-auto rounded-2xl"
							/>
						</div>

						{/* Repos Per Language */}
						<div className="w-full sm:w-[48%] lg:w-[32%] bg-tertiary rounded-2xl p-1">
							<img
								src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=adit-ya15&theme=tokyonight"
								alt="Repos Per Language"
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
							<img
								src="https://leetcard.jacoblin.cool/aditya262701?theme=dark&font=Ubuntu&ext=activity"
								alt="LeetCode Stats"
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

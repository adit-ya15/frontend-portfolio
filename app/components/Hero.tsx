"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
	const [isMobile, setIsMobile] = useState<boolean | null>(null);

	useEffect(() => {
		// Detect mobile screens where navbar collapses (below 640px / sm breakpoint)
		const mq = window.matchMedia("(max-width: 639px)");
		const apply = () => setIsMobile(mq.matches);
		apply();

		// Some browsers (older mobile webviews) don't implement
		// MediaQueryList.addEventListener/removeEventListener. Fallback to
		// addListener/removeListener when necessary.
		if (typeof mq.addEventListener === "function") {
			mq.addEventListener("change", apply);
			return () => mq.removeEventListener("change", apply);
		} else if (typeof (mq as any).addListener === "function") {
			(mq as any).addListener(apply);
			return () => (mq as any).removeListener(apply);
		}
	}, []);

	return (
		<section className="relative w-full h-[calc(100svh-0px)] mx-auto">
			<div className={`paddingX absolute inset-0 top-24 sm:top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
				<div className="flex flex-col justify-center items-center mt-5">
					<div className="w-5 h-5 rounded-full bg-[#915EFF] " />
					<div className="w-1 sm:h-80 h-40 violet-gradient" />
				</div>
				<div>
					<div className="flex items-center gap-6 flex-wrap">
						<Image
							src="https://avatars.githubusercontent.com/u/154125921"
							alt="Suryansh Verma"
							width={96}
							height={96}
							priority
							className="rounded-full ring-2 ring-[#915EFF] shadow-lg shadow-[#915EFF]/40"
						/>
						<div>
							<h1 className="heroHeadText text-white leading-tight">
								Hi, I&apos;m <span className="text-[#915EFF] ">Aditya Verma</span>
							</h1>
							<p className="heroSubText mt-2">
								React Frontend Developer · Cloud & DevOps Engineer
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* Only render 3D on medium screens and up for better mobile performance */}
			{isMobile === false && <ComputersCanvas />}
			<div className="absolute xs:bottom-3 bottom-24 w-full flex justify-center items-center">
				<a href="#about">
					<div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
						<motion.div
							animate={{ y: [0, 24, 0] }}
							transition={{
								duration: 1.5,
								repeat: Number.POSITIVE_INFINITY,
								repeatType: "loop",
							}}
							className="w-3 h-3 rounded-full bg-secondary mb-1"
						/>
					</div>
				</a>
			</div>
		</section>
	);
};

export default Hero;

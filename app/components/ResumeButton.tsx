"use client";

import Image from "next/image";
import React, { useState } from "react";

const ResumeButton = () => {
	const [isLoading, setIsLoading] = useState(false);

	const handleDownload = async () => {
		try {
			setIsLoading(true);
			// Fetch the signed URL from the API
			const response = await fetch("/api/resume?type=professional");
			const data = await response.json();

			if (data.url) {
				// Open the signed URL in a new tab
				window.open(data.url, "_blank");
			}
		} catch (error) {
			console.error("Error downloading resume:", error);
			alert("Failed to download resume. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<button
			type="button"
			onClick={handleDownload}
			disabled={isLoading}
			className="font-medium text-center px-3 py-3 flex gap-1 justify-center rounded-md transition ease-in-out delay-150 bg-[#915EFF] hover:-translate-y-1 hover:scale-110 hover:bg-purple-600 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			<Image
				src="/resume.svg"
				width={24}
				height={24}
				alt="resume"
				className="object-contain animate-pulse"
			/>
			<span className="lg:block hidden text-white">
				{isLoading ? "Loading..." : "Download Resume"}
			</span>
		</button>
	);
};

export default ResumeButton;

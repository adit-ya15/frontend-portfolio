"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "./HigherOrderComponents";

type Video = {
	id: string;
	title: string;
	description: string;
	videoUrl: string;
	thumbnail: string | null;
	tags: { name: string }[];
	order: number;
};

type VideoCardProps = {
	index: number;
	title: string;
	description: string;
	videoUrl: string;
	thumbnail: string | null;
	tags: { name: string }[];
};

const VideoCard = ({
	index,
	title,
	description,
	videoUrl,
	thumbnail,
	tags,
}: VideoCardProps) => {
	const [isPlaying, setIsPlaying] = React.useState(false);
	const [thumbnailError, setThumbnailError] = React.useState(false);

	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		if (isPlaying && videoRef.current) {
			videoRef.current
				.play()
				.then(() => {
					// playback started
				})
				.catch((err) => {
					console.warn('Video play prevented or failed:', err);
				});
		}
	}, [isPlaying]);

	useEffect(() => {
		if (thumbnail) {
			console.log('Thumbnail URL:', thumbnail);
		}
		if (videoUrl) {
			console.log('Video URL:', videoUrl);
		}
	}, [thumbnail, videoUrl]);

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
									{thumbnail && !thumbnailError ? (
										<img
											src={thumbnail}
											alt={title}
											style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, borderRadius: 'inherit' }}
											crossOrigin="anonymous"
											referrerPolicy="no-referrer"
											onError={() => {
												console.error('Failed to load thumbnail:', thumbnail);
												setThumbnailError(true);
											}}
											loading={index === 0 ? 'eager' : 'lazy'}
										/>
									) : (
										<div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
											<svg
												className="w-24 h-24 text-white/50"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
											</svg>
										</div>
									)}
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
									ref={videoRef}
									controls
									playsInline
									crossOrigin="anonymous"
									preload="metadata"
									className="w-full h-full object-cover"
									onError={(e) => {
										console.error('Failed to load video:', videoUrl);
									}}
								>
									<source src={videoUrl} type="video/mp4" />
									Your browser does not support the video tag.
								</video>
							)}
						</div>
					</div>

					{/* Video Info */}
					<div className="w-full lg:w-1/3 flex flex-col justify-center">
						<h3 className="text-white font-bold text-[24px] mb-3">{title}</h3>
						<p className="text-secondary text-[16px] leading-[24px] mb-4">
							{description}
						</p>
						{tags && tags.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{tags.map((tag, idx) => (
									<span
										key={idx}
										className="px-3 py-1 bg-[#915EFF]/20 text-[#915EFF] rounded-full text-xs font-semibold border border-[#915EFF]/30"
									>
										#{tag.name}
									</span>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const Videos = () => {
	const [videos, setVideos] = useState<Video[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadVideos = async () => {
			try {
				const response = await fetch(`/api/videos?ts=${Date.now()}` , { cache: 'no-store' });
				if (response.ok) {
					const data = await response.json();
					setVideos(data);
				} else {
					console.error('Failed to fetch videos');
					setVideos([]);
				}
			} catch (error) {
				console.error('Failed to load videos:', error);
				setVideos([]);
			} finally {
				setLoading(false);
			}
		};
		loadVideos();
	}, []);

	if (loading) {
		return (
			<div className="min-h-[200px] flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#915EFF]"></div>
			</div>
		);
	}

	if (videos.length === 0) {
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
				{videos.map((video: Video, index: number) => (
					<VideoCard
						key={`video-${video.id}`}
						index={index}
						title={video.title}
						description={video.description}
						videoUrl={video.videoUrl}
						thumbnail={video.thumbnail}
						tags={video.tags}
					/>
				))}
			</div>
		</>
	);
};

export default SectionWrapper(Videos, "videos");

"use client";
import { SectionWrapper } from "@/app/components/HigherOrderComponents";
import { textVariant, fadeIn } from "@/app/utils/motion";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

interface GitHubEvent {
	id: string;
	type: string;
	actor: {
		display_login: string;
	};
	repo: {
		name: string;
	};
	payload: {
		action?: string;
		ref?: string;
		ref_type?: string;
		commits?: Array<{ message: string }>;
		pull_request?: {
			title: string;
			html_url: string;
		};
		issue?: {
			title: string;
			html_url: string;
		};
	};
	created_at: string;
}

const GitHubActivity = () => {
	const [events, setEvents] = useState<GitHubEvent[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchGitHubActivity = async () => {
			try {
				const response = await fetch(
					"https://api.github.com/users/suryanshvermaa/events/public?per_page=10"
				);
				const data = await response.json();
				setEvents(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching GitHub activity:", error);
				setLoading(false);
			}
		};

		fetchGitHubActivity();
	}, []);

	const getEventIcon = (type: string) => {
		switch (type) {
			case "PushEvent":
				return "📝";
			case "PullRequestEvent":
				return "🔀";
			case "IssuesEvent":
				return "🐛";
			case "CreateEvent":
				return "✨";
			case "ForkEvent":
				return "🍴";
			case "WatchEvent":
				return "⭐";
			default:
				return "📌";
		}
	};

	const getEventDescription = (event: GitHubEvent) => {
		const repo = event.repo.name.split("/")[1];
		switch (event.type) {
			case "PushEvent":
				const commitCount = event.payload.commits?.length || 0;
				const commitMsg = event.payload.commits?.[0]?.message || "";
				return `Pushed ${commitCount} commit${commitCount > 1 ? "s" : ""} to ${repo}${commitMsg ? `: "${commitMsg.substring(0, 50)}${commitMsg.length > 50 ? "..." : ""}"` : ""}`;
			case "PullRequestEvent":
				return `${event.payload.action} PR in ${repo}: ${event.payload.pull_request?.title}`;
			case "IssuesEvent":
				return `${event.payload.action} issue in ${repo}: ${event.payload.issue?.title}`;
			case "CreateEvent":
				return `Created ${event.payload.ref_type} in ${repo}`;
			case "ForkEvent":
				return `Forked ${repo}`;
			case "WatchEvent":
				return `Starred ${repo}`;
			default:
				return `Activity in ${repo}`;
		}
	};

	const getTimeAgo = (dateString: string) => {
		const date = new Date(dateString);
		const now = new Date();
		const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

		if (seconds < 60) return `${seconds}s ago`;
		if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
		if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
		return `${Math.floor(seconds / 86400)}d ago`;
	};

	return (
		<>
			<motion.div variants={textVariant()}>
				<p className="sectionSubText text-center">What I&apos;m Working On</p>
				<h2 className="sectionHeadText text-center">GitHub Activity.</h2>
			</motion.div>

			<motion.div
				variants={fadeIn("up", "spring", 0.1, 0.75)}
				className="mt-12 bg-tertiary rounded-2xl p-8"
			>
				{loading ? (
					<div className="flex justify-center items-center h-40">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#915EFF]"></div>
					</div>
				) : (
					<div className="space-y-4">
						{events.slice(0, 8).map((event) => (
							<div
								key={event.id}
								className="flex items-start gap-4 p-4 bg-black-200 rounded-xl hover:bg-black-100 transition-all"
							>
								<div className="text-3xl">{getEventIcon(event.type)}</div>
								<div className="flex-1">
									<p className="text-white text-[16px]">{getEventDescription(event)}</p>
									<div className="flex items-center gap-2 mt-2">
										<span className="text-secondary text-[14px]">
											{getTimeAgo(event.created_at)}
										</span>
										<span className="text-secondary text-[14px]">•</span>
										<a
											href={`https://github.com/${event.repo.name}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-[#915EFF] text-[14px] hover:underline"
										>
											View Repository
										</a>
									</div>
								</div>
							</div>
						))}
						<div className="text-center mt-6">
							<a
								href="https://github.com/suryanshvermaa"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-[#915EFF] hover:bg-[#7c4fd8] text-white py-3 px-8 rounded-xl font-bold transition-all inline-block"
							>
								View All Activity on GitHub
							</a>
						</div>
					</div>
				)}
			</motion.div>
		</>
	);
};

export default SectionWrapper(GitHubActivity, "activity");

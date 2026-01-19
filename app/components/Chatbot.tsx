"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
	id: string;
	text: string;
	sender: "user" | "bot";
	timestamp: Date;
}

const processContent = (content: React.ReactNode): React.ReactNode => {
	if (typeof content === "string") {
		return content.split(/<br\s*\/?>/gi).map((part, index, array) => (
			<React.Fragment key={index}>
				{part}
				{index < array.length - 1 && <br />}
			</React.Fragment>
		));
	}
	if (Array.isArray(content)) {
		return content.map((child, i) => <React.Fragment key={i}>{processContent(child)}</React.Fragment>);
	}
	return content;
};

const Chatbot = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			text: "Hi! I'm Aditya's AI assistant. Ask me anything about his skills, experience, or projects!",
			sender: "bot",
			timestamp: new Date(),
		},
	]);
	const [inputMessage, setInputMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!inputMessage.trim() || isLoading) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			text: inputMessage,
			sender: "user",
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputMessage("");
		setIsLoading(true);

		try {
			const response = await fetch("/api/chatbot", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: inputMessage,
					sessionId: sessionId
				}),
			});

			const data = await response.json();

			const botMessage: Message = {
				id: (Date.now() + 1).toString(),
				text: data.response || "Sorry, I couldn't process that request.",
				sender: "bot",
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, botMessage]);
		} catch (error) {
			const errorMessage: Message = {
				id: (Date.now() + 1).toString(),
				text: "Sorry, I'm having trouble connecting. Please try again later.",
				sender: "bot",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{/* Chatbot Toggle Button */}
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className="fixed bottom-8 right-8 z-50 bg-[#915EFF] hover:bg-[#7c4fd8] text-white rounded-full p-4 shadow-lg transition-all"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				aria-label="Toggle chatbot"
			>
				{isOpen ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
						/>
					</svg>
				)}
			</motion.button>

			{/* Chatbot Window */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						className="fixed bottom-24 right-8 z-50 w-[90vw] sm:w-96 h-[500px] bg-tertiary rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#915EFF]/20"
					>
						{/* Header */}
						<div className="bg-[#915EFF] p-4 text-white">
							<h3 className="font-bold text-lg">AI Assistant</h3>
							<p className="text-xs opacity-90">Ask me about Aditya</p>
						</div>

						{/* Messages Container */}
						<div className="flex-1 overflow-y-auto p-4 space-y-4">
							{messages.map((message) => (
								<div
									key={message.id}
									className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
								>
									<div
										className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.sender === "user"
											? "bg-[#915EFF] text-white"
											: "bg-[#1d1836] text-white border border-white/10"
											}`}
									>
										{message.sender === "bot" ? (
											<div className="text-sm prose prose-invert prose-sm max-w-none break-words overflow-x-auto">
												<ReactMarkdown
													remarkPlugins={[remarkGfm]}
													components={{
														p: ({ node, children, ...props }) => <p className="mb-2 last:mb-0" {...props}>{processContent(children)}</p>,
														ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2" {...props} />,
														ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-2" {...props} />,
														li: ({ node, children, ...props }) => <li className="mb-1 [&>p]:inline" {...props}>{processContent(children)}</li>,
														strong: ({ node, ...props }) => <strong className="font-bold text-[#915EFF]" {...props} />,
														code: ({ node, inline, ...props }: any) =>
															inline ? (
																<code className="bg-black/30 px-1.5 py-0.5 rounded text-xs" {...props} />
															) : (
																<code className="block bg-black/30 p-2 rounded my-2 text-xs overflow-x-auto" {...props} />
															),
														a: ({ node, ...props }) => (
															<a className="text-[#915EFF] hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
														),
														h1: ({ node, ...props }) => <h1 className="text-lg font-bold mb-2" {...props} />,
														h2: ({ node, ...props }) => <h2 className="text-base font-bold mb-2" {...props} />,
														h3: ({ node, ...props }) => <h3 className="text-sm font-bold mb-1" {...props} />,
														table: ({ node, ...props }) => <table className="min-w-full border-collapse border border-white/20 my-2" {...props} />,
														thead: ({ node, ...props }) => <thead className="bg-white/10" {...props} />,
														tbody: ({ node, ...props }) => <tbody className="bg-transparent" {...props} />,
														tr: ({ node, ...props }) => <tr className="border-b border-white/10" {...props} />,
														th: ({ node, children, ...props }) => <th className="border border-white/20 p-2 text-left font-bold" {...props}>{processContent(children)}</th>,
														td: ({ node, children, ...props }) => <td className="border border-white/20 p-2 align-top" {...props}>{processContent(children)}</td>,
													}}
												>
													{message.text}
												</ReactMarkdown>
											</div>
										) : (
											<p className="text-sm">{message.text}</p>
										)}
										<p className="text-xs opacity-60 mt-1">
											{message.timestamp.toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})}
										</p>
									</div>
								</div>
							))}
							{isLoading && (
								<div className="flex justify-start">
									<div className="bg-[#1d1836] text-white border border-white/10 rounded-2xl px-4 py-2">
										<div className="flex space-x-2">
											<div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
											<div
												className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
												style={{ animationDelay: "0.2s" }}
											></div>
											<div
												className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
												style={{ animationDelay: "0.4s" }}
											></div>
										</div>
									</div>
								</div>
							)}
							<div ref={messagesEndRef} />
						</div>

						{/* Input Form */}
						<form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
							<div className="flex gap-2">
								<input
									type="text"
									value={inputMessage}
									onChange={(e) => setInputMessage(e.target.value)}
									placeholder="Ask me anything..."
									className="flex-1 bg-[#1d1836] text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#915EFF] border border-white/10"
									disabled={isLoading}
								/>
								<button
									type="submit"
									disabled={isLoading || !inputMessage.trim()}
									className="bg-[#915EFF] hover:bg-[#7c4fd8] disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full p-2 transition-all"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
										/>
									</svg>
								</button>
							</div>
						</form>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Chatbot;

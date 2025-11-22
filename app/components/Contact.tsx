"use client";
import { slideIn } from "@/app/utils/motion";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { SectionWrapper } from "./HigherOrderComponents";
import { EarthCanvas } from "./canvas";

const Contact = () => {
	const formRef = useRef<HTMLFormElement>(null);

	const [form, setForm] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [loading, setLoading] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch("/api/mail", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: form.name,
					email: form.email,
					message: form.message,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				setLoading(false);
				setShowSuccess(true);
				setForm({
					name: "",
					email: "",
					message: "",
				});
				setTimeout(() => setShowSuccess(false), 5000);
			} else {
				setLoading(false);
				alert(data.error || "Sorry!! Something went wrong!!");
			}
		} catch (error) {
			setLoading(false);
			alert("Sorry!! Something went wrong!!");
		}
	};

	return (
		<>
			{/* Success Modal */}
			<AnimatePresence>
				{showSuccess && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
						onClick={() => setShowSuccess(false)}
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.8, opacity: 0, y: 20 }}
							transition={{ type: "spring", duration: 0.5 }}
							className="bg-tertiary rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-[#915EFF]/20"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Success Icon */}
							<div className="flex justify-center mb-6">
								<div className="w-20 h-20 bg-[#915EFF]/20 rounded-full flex items-center justify-center">
									<svg
										className="w-10 h-10 text-[#915EFF]"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
							</div>

							{/* Message */}
							<h3 className="text-white text-2xl font-bold text-center mb-3">
								Thank You!
							</h3>
							<p className="text-secondary text-center text-[16px] mb-6">
								A humble thanks for reaching me out. I will respond to you as soon as possible.
							</p>

							{/* OK Button */}
							<button
								onClick={() => setShowSuccess(false)}
								className="w-full bg-[#915EFF] hover:bg-[#7c4fd8] text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
							>
								OK
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
			<motion.div
				variants={slideIn("left", "tween", 0.2, 1)}
				className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
			>
				<p className="heroSubText">Get in Touch</p>
				<h3 className="heroHeadText">Contact.</h3>
				<form
					ref={formRef}
					onSubmit={handleSubmit}
					className="mt-12 flex flex-col gap-8"
				>
					<label className="flex flex-col">
						<span className="text-white font-medium mb-4">Your Name.</span>
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={handleChange}
							placeholder="Whats's your name?"
							className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
						/>
					</label>
					<label className="flex flex-col">
						<span className="text-white font-medium mb-4">Your Email.</span>
						<input
							type="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							placeholder="Whats's your email?"
							className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
						/>
					</label>
					<label className="flex flex-col">
						<span className="text-white font-medium mb-4">Your Message.</span>
						<textarea
							rows={7}
							name="message"
							value={form.message}
							onChange={handleChange}
							placeholder="What do you want to say?"
							className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
						/>
					</label>
					<button
						type="submit"
						className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
					>
						{loading ? "Sending..." : "Send"}
					</button>
				</form>
			</motion.div>
			<motion.div
				variants={slideIn("right", "tween", 0.2, 1)}
				className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] hidden md:block"
			>
				{/* Only render 3D Earth on medium screens and up for better mobile performance */}
				<EarthCanvas />
			</motion.div>
		</div>
	</>
	);
};

export default SectionWrapper(Contact, "contact");

"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ResumeButton from "./ResumeButton";

const navLinks = [
	{ id: "about", title: "About" },
	{ id: "work", title: "Experience" },
	{ id: "projects", title: "Projects" },
	{ id: "videos", title: "Videos" },
	{ id: "stats", title: "Stats" },
	// { id: "diagrams", title: "Architecture" },
	{ id: "contact", title: "Contact" },
];

const Navbar = () => {
	const [active, setActive] = useState("");
	const [toggle, setToggle] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			if (scrollTop > 100) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`paddingX w-full flex items-center py-4 fixed top-0 z-40 transition-colors duration-300 ${scrolled
				? "bg-primary/90 backdrop-blur-md border-b border-white/5"
				: "bg-transparent"
				}`}
		>
			<div className="w-full flex justify-between items-center max-w-7xl mx-auto min-h-[56px]">
				{/* Brand */}
				<button
					aria-label="Scroll to top"
					className="flex items-center gap-3"
					onClick={() => {
						setActive("");
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				>
					<Link href="https://github.com/adit-ya15" className="shrink-0">
						<Image
							src="https://avatars.githubusercontent.com/u/209531231?v=4"
							width={56}
							height={56}
							alt="Aditya Verma avatar"
							priority
							className="object-cover rounded-full ring-2 ring-[#915EFF] shadow-sm"
						/>
					</Link>
					<p className="text-white text-base sm:text-2xl font-bold cursor-pointer flex flex-wrap leading-tight">
						Aditya <span className="hidden xs:inline sm:inline">&nbsp;|&nbsp;adit-ya15</span>
					</p>
				</button>

				{/* Desktop Navigation */}
				<ul className="list-none hidden sm:flex flex-row gap-8">
					{navLinks.map((nav) => (
						<li key={nav.id}>
							<Link
								href={`#${nav.id}`}
								className={`${active === nav.title ? "text-white" : "text-secondary"} hover:text-white text-sm md:text-base font-medium transition-colors`}
								onClick={(e) => {
									e.preventDefault();
									setActive(nav.title);
									const el = document.getElementById(nav.id);
									if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
									// Update hash without jumping
									history.replaceState(null, "", `#${nav.id}`);
								}}
							>
								{nav.title}
							</Link>
						</li>
					))}
				</ul>
				<div className="hidden lg:block ml-4">
					<ResumeButton />
				</div>

				{/* Mobile Menu Toggle */}
				<div className="sm:hidden flex items-center gap-2">
					<button
						aria-label={toggle ? "Close menu" : "Open menu"}
						className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#915EFF]"
						onClick={() => setToggle((p) => !p)}
					>
						<Image
							src={toggle ? "/close.svg" : "/menu.svg"}
							width={28}
							height={28}
							alt="menu"
							className="w-7 h-7 object-contain"
						/>
					</button>
				</div>
			</div>

			{/* Mobile Overlay Menu */}
			<div
				className={`${toggle ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} fixed inset-0 top-0 z-40 bg-primary/95 backdrop-blur-lg transition-opacity duration-300 flex flex-col`}
			>
				<div className="flex justify-between items-center paddingX py-4">
					<p className="text-white font-semibold text-lg">Menu</p>
					<button
						aria-label="Close menu"
						className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#915EFF]"
						onClick={() => setToggle(false)}
					>
						<Image src="/close.svg" width={24} height={24} alt="close" />
					</button>
				</div>
				<ul className="flex-1 flex flex-col gap-6 px-8 mt-4">
					{navLinks.map((nav) => (
						<li key={nav.id}>
							<Link
								href={`#${nav.id}`}
								className={`block py-2 text-lg font-medium rounded-md ${active === nav.title ? "text-white" : "text-secondary"} hover:text-white focus:text-white focus:outline-none`}
								onClick={(e) => {
									e.preventDefault();
									setActive(nav.title);
									setToggle(false);
									// Smooth scroll after overlay closes
									requestAnimationFrame(() => {
										const el = document.getElementById(nav.id);
										if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
										history.replaceState(null, "", `#${nav.id}`);
									});
								}}
							>
								{nav.title}
							</Link>
						</li>
					))}
				</ul>
				<div className="px-8 pb-10">
					<ResumeButton />
					<p className="text-center text-xs text-secondary mt-4">© {new Date().getFullYear()} Suryansh Verma</p>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

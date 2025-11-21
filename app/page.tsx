import {
	About,
	Contact,
	Experience,
	Feedbacks,
	Hero,
	Navbar,
	Tech,
	Works,
	StarsCanvas,
	Stats,
	Diagrams,
	Videos,
} from "./components";
import Chatbot from "./components/Chatbot";
import ShareButtons from "./components/ShareButtons";

export default function Home() {
	return (
		<div className="relative z-0 bg-primary font-sans">
			<div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
				<Navbar />
				<Hero />
			</div>
			<About />
			<Experience />
			<Tech />
			<Works />
			<Videos />
			<Stats />
			<Diagrams />
			<Feedbacks />
			<div className="relative z-0">
				<Contact />
				<StarsCanvas />
			</div>
			<Chatbot />
			<ShareButtons />
		</div>
	);
}

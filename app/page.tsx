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
} from "./components";
import Chatbot from "./components/Chatbot";

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
			<Stats />
			<Feedbacks />
			<div className="relative z-0">
				<Contact />
				<StarsCanvas />
			</div>
			<Chatbot />
		</div>
	);
}

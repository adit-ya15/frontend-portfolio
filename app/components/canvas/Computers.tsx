"use client";
import CanvasLoader from "@/app/components/Loader";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

const Computers = ({ isMobile }: { isMobile: boolean }) => {
	const computer = useGLTF("/desktop_pc/scene.gltf");
	return (
		<mesh>
			<hemisphereLight intensity={0.15} groundColor="black" />
			<pointLight intensity={1} />
			<spotLight
				position={[-20, 50, 10]}
				angle={0.12}
				penumbra={1}
				intensity={1}
				castShadow
				shadow-mapSize={1024}
			/>
			<primitive
				object={computer.scene}
				scale={isMobile ? 0.7 : 0.75}
				position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
				rotation={[-0.01, -0.2, -0.1]}
			/>
		</mesh>
	);
};

const ComputersCanvas = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 500px)");
		setIsMobile(mediaQuery.matches);
		const handleMediaQueryChange = (event: MediaQueryListEvent | MediaQueryList) => {
			// event may be a MediaQueryListEvent (modern) or MediaQueryList (legacy listener params)
			if (typeof (event as MediaQueryListEvent).matches === "boolean") {
				setIsMobile((event as MediaQueryListEvent).matches);
			} else {
				setIsMobile((event as MediaQueryList).matches);
			}
		};

		if (typeof mediaQuery.addEventListener === "function") {
			mediaQuery.addEventListener("change", handleMediaQueryChange as any);
			return () => mediaQuery.removeEventListener("change", handleMediaQueryChange as any);
		} else if (typeof (mediaQuery as any).addListener === "function") {
			(mediaQuery as any).addListener(handleMediaQueryChange);
			return () => (mediaQuery as any).removeListener(handleMediaQueryChange);
		}
	}, []);

	return (
		<Canvas
			frameloop="demand"
			shadows
			camera={{ position: [20, 3, 5], fov: 25 }}
			gl={{ preserveDrawingBuffer: true }}
		>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls
					enableZoom={false}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>
				<Computers isMobile={isMobile} />
			</Suspense>
			<Preload all />
		</Canvas>
	);
};

export default ComputersCanvas;

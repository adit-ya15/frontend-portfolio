/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Allow external SVG widgets (github-readme-stats, leetcard, etc.)
		// These widgets serve SVG; enabling dangerouslyAllowSVG prevents Next.js
		// from blocking them during image optimization in dev/production.
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'cdn.hashnode.com',
			},
			{
				protocol: 'https',
				hostname: 'github-readme-stats.vercel.app',
			},
			{
				protocol: 'https',
				hostname: 'github-readme-streak-stats.herokuapp.com',
			},
			{
				protocol: 'https',
				hostname: 'github-readme-activity-graph.vercel.app',
			},
			{
				protocol: 'https',
				hostname: 'leetcard.jacoblin.cool',
			},
			{
				protocol: 'https',
				hostname: 'github-profile-summary-cards.vercel.app',
			},
			{
				protocol: 'https',
				hostname: 's3.tebi.io',
			},
			{
				protocol: 'https',
				hostname: '**.s3.tebi.io', // Allow all subdomains for Tebi S3
			},
			{
				protocol: 'https',
				hostname: '**.s3.amazonaws.com', // Allow AWS S3 buckets
			},
			{
				protocol: 'https',
				hostname: '**.s3.*.amazonaws.com', // Allow regional AWS S3 buckets
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com', // Allow Cloudinary images
			},
		],
	},
};

export default nextConfig;

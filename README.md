# ✨ 3D Portfolio (Next.js 14)

A modern developer portfolio built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion. It features a clean hero section, grouped skills grid, experience timeline, projects gallery, and a contact form powered by EmailJS. Optional 3D backgrounds and models are available via React Three Fiber.

## 🔥 Highlights

- Next.js 14 App Router with static prerendering
- Responsive UI with Tailwind CSS
- Smooth section entrance and hover animations using Framer Motion
- Grouped, uniform Skills grid (consistent look for all icons)
- Experience timeline (react-vertical-timeline-component)
- Projects section with source/demo links
- Contact form using EmailJS
- Optional 3D canvases (Computer/Earth/Stars) using react-three-fiber + drei
- SEO metadata configured in `app/layout.tsx`

## 🧰 Tech Stack

- Framework: Next.js 14, React 18
- Styling: Tailwind CSS
- Motion: Framer Motion
- Timeline: react-vertical-timeline-component
- 3D (optional): three, @react-three/fiber, @react-three/drei, maath

## 🗂️ Project Structure

```
app/
  layout.tsx                 # Global layout + metadata
  page.tsx                   # Home page sections
  components/
    Hero.tsx                 # Intro header (uses ComputersCanvas)
    About.tsx                # About section
    Experience.tsx           # Timeline
    Tech.tsx                 # Grouped skills grid
    Works.tsx                # Projects grid
    Contact.tsx              # EmailJS contact form (uses EarthCanvas)
    Navbar.tsx               # Top navigation
    HigherOrderComponents/   # Section wrapper
    canvas/                  # Optional 3D canvases: Ball, Computers, Earth, Stars
  constants/index.ts         # All portfolio content in one place
public/
  projectimg/                # Project images
  tech/                      # Technology icons
  company/..., planet/...    # 3D textures (with license files)
```

## 🚀 Getting Started

Prerequisites: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the site.

## 🎨 Personalize Your Portfolio

Most content is centralized in `app/constants/index.ts`:

- `navLinks`: navigation menu
- `services`: top “what I do” badges
- `technologyGroups` and `technologies`: grouped skills and flat list
- `experiences`: timeline cards (icon, title, points)
- `testimonials`: social/links cards
- `projects`: project cards (image, tags, source/deploy links)

Images live in `public/`:

- Project images: `public/projectimg`
- Skill icons: `public/tech`

If an icon image isn’t available, use `public/projectimg/placeholder.svg` as a safe fallback (already used in Experience where needed).

### 🧑‍🚀 Avatar and Remote Images

Remote avatars from GitHub are allowed by `next.config.mjs`:

```js
images: {
  remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }]
}
```

Use Next/Image in `Hero.tsx` or `Navbar.tsx`:

```tsx
<Image src="https://avatars.githubusercontent.com/u/<your_id>" alt="Your Name" width={96} height={96} className="rounded-full" />
```

### ✉️ EmailJS (Contact form)

Replace the placeholders in `app/components/Contact.tsx` with your own EmailJS credentials:

```ts
emailjs.send(
  "<service_id>",
  "<template_id>",
  { from_name, to_name, from_email, to_email, message },
  "<public_key>"
)
```

Tip: For better security, you can move these values into environment variables and read them via `process.env`.

## 🧹 Optional: Remove 3D Completely

Three.js is used only for the background models/canvases. If you prefer a purely 2D site:

1. In `Hero.tsx`, remove `<ComputersCanvas />` and adjust spacing.
2. In `Contact.tsx`, remove the `<EarthCanvas />` section (right side) or replace it with a static image.
3. Optionally delete `app/components/canvas/*` and their export usages.
4. Remove these dependencies from `package.json` and reinstall:
   - `three`, `@react-three/fiber`, `@react-three/drei`, `maath`.

The Skills section already uses a consistent flat grid, so no changes are required there.

## ☁️ Deploy

### ▲ Vercel

1. Push to GitHub.
2. Import the repo in Vercel and deploy. No special build settings are required.

### 🔷 Netlify

Use the following:

- Build command: `next build`
- Publish directory: `.next`

Ensure Next.js runtime support is enabled (Netlify Next.js adapter or Edge functions as needed).

## ♿ Accessibility & Performance

- All icons render via Next/Image for optimized loading.
- Hover and motion are subtle; reduce motion can be respected with CSS if you choose to add it.
- Asset sizes: prefer SVG for logos, PNG/WebP for photos.

## 📄 Assets & Licenses

- Logos and trademarks belong to their respective owners; used here for identification.
- 3D textures include license files under `public/company/desktop_pc/license.txt` and `public/planet/license.txt`.
- Provide attribution for any third‑party images you add.

## 🤝 Contributing

Issues and PRs are welcome for general improvements. For personal forks, just update the constants and images to match your profile.


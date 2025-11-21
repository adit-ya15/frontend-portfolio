# 🚀 Suryansh Verma — 3D Portfolio with Full-Stack Admin Panel

Welcome to the source code of **Suryansh Verma's interactive developer portfolio** — a production-ready, full-stack application with a comprehensive **admin panel**, **database management**, and **cloud storage integration**. Built with **Next.js 14 (App Router)**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, **AWS S3**, and featuring stunning **3D visuals powered by Three.js**.

This is not just a portfolio — it's a **complete content management system** that allows you to manage all your portfolio content dynamically through a secure admin interface.

---

## 🎯 **Key Features**

### 🌟 **Frontend**
- ⚡ **Next.js 14 App Router** with TypeScript
- 🎨 **Tailwind CSS** utility-first styling
- 🌀 **Framer Motion** smooth animations
- 🌍 **3D Interactive Scenes** — Computer, Earth, and Stars using Three.js
- 📱 **Fully Responsive** with mobile-first design
- 🤖 **AI Assistant Chatbot** powered by Groq API
- 📬 **Contact Form** with EmailJS integration
- 🎬 **Video Demos Section** with thumbnail previews
- 📊 **Dynamic Stats & Architecture Diagrams**
- ⚡ **Optimized Performance** with Next.js Image & lazy loading

### 🔐 **Admin Panel**
- 🔒 **Secure Authentication** with NextAuth.js
- 📝 **Content Management** for all sections:
  - **Projects** — Manage project portfolio with images, links, tags
  - **Experiences** — Work history with company details and points
  - **Technologies** — Tech stack grouped by categories
  - **Testimonials** — Client feedback and reviews
  - **Services** — What you offer/specialize in
  - **Stats** — Achievement metrics and numbers
  - **Diagrams** — Architecture and system design diagrams
  - **Videos** — Project demos with thumbnails and tags
  - **Resume** — Upload and manage resume files
  - **Navigation** — Customize navbar links
- 📤 **File Upload** to AWS S3-compatible storage (Tebi.io)
- 🔐 **Signed URLs** for secure image/video access (1-hour expiration)
- ✏️ **Full CRUD Operations** for all content types
- 🎨 **Modern Admin UI** with responsive design
- 📊 **Dashboard** with content overview

### 🗄️ **Database & Storage**
- 🐘 **PostgreSQL** database (Neon hosting recommended)
- 🔧 **Prisma ORM** for type-safe database access
- ☁️ **AWS S3-compatible storage** (Tebi.io / AWS S3)
- 🔒 **Signed URLs** with automatic expiration
- 📦 **Automatic Prisma Client** generation on build  

---

## 🏠 **Live Demo**

🌐 **Visit:** [suryanshverma.vercel.app](https://suryanshverma.vercel.app)

![Portfolio Preview](https://suryanshvermaa.s3.ap-south-1.amazonaws.com/HomePage.png)

---

## 🧰 **Tech Stack**

### Frontend
- **Framework:** Next.js 14.2.3 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, @react-three/fiber, @react-three/drei
- **Forms:** React Hook Form + Zod validation
- **UI Components:** Custom components with Tailwind

### Backend
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma 5.22.0
- **Authentication:** NextAuth.js v4
- **File Storage:** AWS S3 SDK (Tebi.io compatible)
- **Email:** Nodemailer + EmailJS
- **AI Chatbot:** Groq SDK
- **Caching:** Upstash Redis (optional)

### DevOps
- **Deployment:** Vercel
- **Version Control:** Git & GitHub
- **Package Manager:** npm / Bun  

---

## ⚙️ **Local Setup**

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/suryanshvermaa/3DPortfolio.git
cd 3DPortfolio
```

### 2️⃣ **Install Dependencies**
```bash
npm install
# or
bun install
```

### 3️⃣ **Configure Environment Variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# AWS S3 / Tebi.io Storage
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="ap-south-1"
AWS_BUCKET_NAME="your-bucket-name"
AWS_S3_ENDPOINT="https://s3.tebi.io"  # For Tebi.io, remove for AWS S3

# Email (Nodemailer)
MY_EMAIL="your-email@gmail.com"
MY_PASSWORD="your-app-password"

# Groq API (Chatbot)
GROQ_API_KEY="your-groq-api-key"

# Upstash Redis (Optional)
UPSTASH_URL="your-upstash-url"
UPSTASH_TOKEN="your-upstash-token"
```

### 4️⃣ **Setup Database**

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 5️⃣ **Create Admin User**

```bash
npx tsx scripts/create-admin.ts
```

Follow the prompts to create your admin account.

### 6️⃣ **Run Development Server**

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

### 7️⃣ **Access Admin Panel**

Navigate to: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Login with your admin credentials to manage content.  

---

## 🛠️ **Available Scripts**

```bash
# Development
npm run dev              # Start development server

# Production
npm run build            # Build for production
npm start                # Start production server

# Database
npx prisma generate      # Generate Prisma Client
npx prisma db push       # Push schema to database
npx prisma studio        # Open Prisma Studio (GUI)

# Admin Management
npx tsx scripts/create-admin.ts    # Create admin user
npx tsx scripts/delete-admin.ts    # Delete admin user

# Linting
npm run lint             # Run ESLint
```

---

## 🏗️ **Project Structure**

```
3DPortfolio/
├── app/                     # Next.js App Router
│   ├── admin/               # Admin panel pages
│   │   ├── dashboard/       # Admin dashboard
│   │   ├── projects/        # Manage projects
│   │   ├── experiences/     # Manage work experience
│   │   ├── technologies/    # Manage tech stack
│   │   ├── testimonials/    # Manage testimonials
│   │   ├── services/        # Manage services
│   │   ├── stats/           # Manage statistics
│   │   ├── diagrams/        # Manage architecture diagrams
│   │   ├── videos/          # Manage video demos
│   │   ├── resume/          # Manage resume files
│   │   ├── navlinks/        # Manage navigation
│   │   └── login/           # Admin login page
│   ├── api/                 # API routes
│   │   ├── admin/           # Admin CRUD APIs
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── chatbot/         # AI chatbot API
│   │   ├── mail/            # Contact form API
│   │   ├── upload/          # File upload API
│   │   ├── projects/        # Projects API
│   │   ├── experiences/     # Experiences API
│   │   ├── technologies/    # Technologies API
│   │   ├── testimonials/    # Testimonials API
│   │   ├── services/        # Services API
│   │   ├── stats/           # Stats API
│   │   ├── diagrams/        # Diagrams API
│   │   ├── videos/          # Videos API
│   │   └── navlinks/        # NavLinks API
│   ├── components/          # React components
│   │   ├── canvas/          # 3D components
│   │   │   ├── Computers.tsx
│   │   │   ├── Earth.tsx
│   │   │   └── Stars.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Works.tsx
│   │   ├── Videos.tsx
│   │   ├── Stats.tsx
│   │   └── ... (more components)
│   ├── bot/                 # Chatbot logic
│   │   ├── functions.ts     # Bot functions
│   │   ├── index.ts         # Bot handler
│   │   └── system_prompt.ts # Bot configuration
│   ├── styles/              # Global CSS
│   │   └── globals.css
│   ├── utils/               # Utility functions
│   │   └── motion.ts        # Framer Motion variants
│   ├── error.tsx            # Error boundary
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── providers.tsx        # Context providers
├── lib/                     # Shared libraries
│   ├── api.ts               # API fetch functions
│   ├── auth.ts              # NextAuth configuration
│   ├── prisma.ts            # Prisma client instance
│   └── s3.ts                # S3 upload/signed URL functions
├── prisma/                  # Database
│   └── schema.prisma        # Prisma schema (11 models)
├── public/                  # Static assets
│   ├── company/             # Company logos
│   ├── desktop_pc/          # 3D computer model
│   ├── diagrams/            # Architecture diagrams
│   ├── planet/              # 3D Earth model
│   ├── projectimg/          # Project images
│   ├── socialmedia/         # Social icons
│   └── tech/                # Technology icons
├── scripts/                 # Utility scripts
│   ├── create-admin.ts      # Create admin user
│   ├── delete-admin.ts      # Delete admin user
│   └── migrate-diagrams.ts  # Migrate static diagrams
├── types/                   # TypeScript definitions
├── .env                     # Environment variables (local)
├── .env.example             # Environment template
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS config
├── tsconfig.json            # TypeScript config
├── package.json             # Dependencies & scripts
└── README.md                # This file
```

---

## 📝 **Database Models**

The application uses Prisma ORM with the following models:

- **Admin** — Admin user authentication
- **Project** — Portfolio projects with images and links
- **Experience** — Work experience timeline
- **Technology** — Tech stack (grouped by category)
- **Testimonial** — Client testimonials
- **Service** — Services offered
- **Stat** — Achievement statistics
- **Diagram** — Architecture diagrams
- **Video** — Video demos with thumbnails
- **Resume** — Resume file management
- **NavLink** — Navigation menu links

All models include:
- Unique ID (CUID)
- Order field for sorting
- IsActive flag for visibility
- Timestamps (createdAt, updatedAt)  

---

## 🔐 **Admin Panel Usage**

### Access Admin Panel
1. Navigate to `/admin/login`
2. Enter your admin credentials
3. Access the dashboard at `/admin/dashboard`

### Manage Content
Each admin section provides:
- **List View** — See all items with edit/delete options
- **Add New** — Create new content with form validation
- **Edit** — Update existing content
- **Delete** — Remove content (with confirmation)
- **Toggle Active** — Show/hide content on public site
- **Reorder** — Drag to reorder items (some sections)

### File Upload
- Upload images/videos directly to S3-compatible storage
- Automatic file validation
- Progress indicators
- Generates secure signed URLs

---

## 🎨 **Customization Guide**

### 1️⃣ **Update Personal Information**
- Edit admin panel content through web interface
- Upload your own images/videos to S3
- Update social links in components

### 2️⃣ **Modify Theme Colors**
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: "#050816",      // Background color
  secondary: "#aaa6c3",    // Text color
  tertiary: "#151030",     // Card background
  "black-100": "#100d25",
  "black-200": "#090325",
  "white-100": "#f3f3f3",
}
```

### 3️⃣ **Remove 3D Elements**
To create a fully 2D portfolio:

1. Remove 3D components from pages:
```typescript
// In app/page.tsx, remove:
<ComputersCanvas />
<EarthCanvas />
<StarsCanvas />
```

2. Uninstall 3D dependencies:
```bash
npm uninstall three @react-three/fiber @react-three/drei maath
```

### 4️⃣ **Customize Chatbot**
Edit `app/api/chatbot/route.ts` and `app/bot/system_prompt.ts`

### 5️⃣ **Add New Content Types**
1. Add model to `prisma/schema.prisma`
2. Run `npx prisma db push`
3. Create admin page in `app/admin/`
4. Create API routes in `app/api/admin/`
5. Add public API in `app/api/`
6. Create component in `app/components/`

---

## ☁️ **Deployment**

### Vercel (Recommended)

1. **Import Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Configure Environment Variables**
   - Add all variables from `.env` in Vercel dashboard
   - Settings → Environment Variables

3. **Deploy**
   - Vercel auto-detects Next.js
   - Automatic deployments on git push

### Other Platforms

For other platforms (Railway, Render, etc.):

```bash
# Build the application
npm run build

# Start production server
npm start
```

Ensure:
- Environment variables are set
- PostgreSQL database is accessible
- Port is configured (default: 3000)

---

## 🚨 **Troubleshooting**

### Build Errors

**Error:** `Prisma Client not generated`
```bash
npx prisma generate
```

**Error:** `Database connection failed`
- Check `DATABASE_URL` in `.env`
- Ensure database is accessible
- Verify SSL mode if required

### Upload Errors

**Error:** `Failed to upload file`
- Verify AWS credentials in `.env`
- Check bucket permissions
- Ensure bucket name is correct

### Authentication Issues

**Error:** `Unauthorized`
- Ensure admin user exists
- Check `NEXTAUTH_SECRET` is set
- Clear browser cookies

### 3D Model Not Loading
- Check `/public/desktop_pc/scene.gltf` exists
- Verify browser supports WebGL
- Check browser console for errors  

---

## 📚 **Documentation**

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Three.js Docs](https://threejs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 🤝 **Contributing**

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENCE](LICENCE) file for details.  

---

## 💖 **Acknowledgements**

Built with passion using:
- **Next.js** — React framework
- **Prisma** — Next-generation ORM
- **Three.js** — 3D graphics library
- **Tailwind CSS** — Utility-first CSS
- **Framer Motion** — Animation library
- **NextAuth.js** — Authentication
- **AWS S3** — Cloud storage

---

## 📧 **Contact**

**Suryansh Verma**
- Portfolio: [suryanshverma.vercel.app](https://suryanshverma.vercel.app)
- GitHub: [@suryanshvermaa](https://github.com/suryanshvermaa)
- LinkedIn: [Suryansh Verma](https://www.linkedin.com/in/suryanshvermaa)

---

### 🕓 **Last Updated:** November 21, 2025  
Made with ❤️ by **Suryansh Verma**

---

## ⭐ **Star This Repository**

If you find this project helpful, please give it a star! It helps others discover this template.

[![GitHub stars](https://img.shields.io/github/stars/suryanshvermaa/3DPortfolio?style=social)](https://github.com/suryanshvermaa/3DPortfolio)
# Admin Panel Navigation Guide

## ✅ Complete Admin Panel Sections

### Main Navigation Sidebar

1. **Dashboard** (`/admin/dashboard`)
   - Overview of all sections
   - Quick Stats (dynamic counts)
   - Cards for all admin sections

2. **Projects** (`/admin/projects`)
   - ✅ **VIDEO DEMOS ARE HERE!**
   - Manage portfolio projects
   - Add/Edit/Delete projects
   - Upload project images
   - **Upload video demos** (URL or file upload)
   - Manage tags, descriptions, links

3. **Experiences** (`/admin/experiences`)
   - Manage work history
   - Education background
   - Timeline entries

4. **Technologies** (`/admin/technologies`)
   - Manage tech stack
   - 6 categories: Languages, Frontend, Backend & Messaging, Databases & Cache, Cloud & DevOps, Tools & Platforms
   - Technology icons

5. **Testimonials** (`/admin/testimonials`)
   - Manage testimonials
   - Social media links
   - Profile images

6. **Services** (`/admin/services`)
   - Service offerings
   - Service icons and descriptions

7. **Diagrams** (`/admin/diagrams`)
   - Architecture diagrams
   - Technical diagrams
   - Upload diagram images

8. **Stats** (`/admin/stats`)
   - Custom dashboard statistics
   - NOT the same as Quick Stats
   - Manage custom stat entries

9. **Navigation** (`/admin/navlinks`)
   - Manage navigation menu
   - Menu links and structure

10. **Resume** (`/admin/resume`)
    - Resume file management
    - Upload resume PDFs

---

## 🎥 HOW TO ADD VIDEO DEMOS

### Location: Projects Section

**Step-by-Step:**

1. **Navigate to Projects**
   - Click "Projects" in the left sidebar
   - OR go to `http://localhost:3000/admin/projects`

2. **Edit Existing Project**
   - Find the project card
   - Click the blue "Edit" button

3. **Scroll to Video Demo Section**
   - It's below "Deploy Link" field
   - You'll see: "Video Demo Link (optional)"

4. **Add Video - Two Methods:**

   **Method A: External URL**
   - Paste YouTube/Vimeo/any video URL
   - Example: `https://youtube.com/watch?v=...`
   - Example: `https://vimeo.com/...`

   **Method B: Upload File**
   - Click "Or Upload Video" file input
   - Select video file (MP4, WebM, MOV)
   - Wait for upload (shows progress)
   - URL auto-fills when complete

5. **Save Changes**
   - Click "Update Project" button
   - Video demo indicator (🎥) will appear on card

### Visual Indicators:

- **Admin Panel**: Projects with videos show 🎥 icon + "Video Demo" label
- **Public Site**: Video camera button appears on project cards

---

## 📊 DASHBOARD STATS

### Quick Stats (Bottom of Dashboard)

The numbers shown ARE dynamic and update automatically:

- **Total Projects**: Fetched from database
- **Experiences**: Fetched from database  
- **Technologies**: Fetched from database
- **Testimonials**: Fetched from database

**How it works:**
- Stats load when you open the dashboard
- Fetches from `/api/projects`, `/api/experiences`, etc.
- Updates automatically (no caching)
- If you see old numbers, refresh the page

**Current Stats (from your screenshot):**
- 15 Projects ✅
- 4 Experiences ✅
- 28 Technologies ✅
- 3 Testimonials ✅

These numbers are correct and dynamic!

---

## 🔧 Troubleshooting

### "I don't see video demo field"
- Make sure you're on the Projects page
- Click "Add Project" or "Edit" on existing project
- Scroll down past "Deploy Link"
- Field label: "Video Demo Link (optional)"

### "Upload not working"
- Check S3 credentials in `.env`
- Verify file is a video (MP4, WebM, MOV)
- Check browser console for errors

### "Stats not updating"
- Refresh the dashboard page
- Stats fetch on component mount
- Check browser console for API errors
- Verify database connection

---

## 📁 File Locations

- Dashboard: `/app/admin/dashboard/page.tsx`
- Projects (with video upload): `/app/admin/projects/page.tsx`
- Sidebar Layout: `/app/admin/dashboard/layout.tsx`

---

**Summary:**
- ✅ All admin sections are in the sidebar
- ✅ Video demos are in Projects section
- ✅ Dashboard stats are dynamic
- ✅ Everything is working as designed

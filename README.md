# ✦ ASTRA — 3D Freelancer Portfolio + Admin Dashboard
> **"Ideas Beyond Limits."** — Founded by Sunny Pendela. Premium Digital Experiences, Bespoke Web Architecture & Content Management System.

ASTRA is an award-winning, immersive 3D personal digital brand and portfolio founded and developed by **Sunny Pendela**, built with a **MERN-ready architecture** (React, Node.js, Express, MongoDB/JSON Storage Engine, Three.js, React Three Fiber, Tailwind CSS).

---

## 🌟 Brand & Founder Identity: ASTRA

- **Brand Name:** ASTRA
- **Founder:** Sunny Pendela (Principal Architect & Full-Stack Engineer)
- **Positioning:** Premium Digital Experiences & Bespoke Web Architecture
- **Tagline:** *"Ideas Beyond Limits."*
- **Visual Aesthetic:** Deep midnight navy background (`#02040a`, `#040816`), electric cyan (`#00f5ff`) and vivid violet (`#8b5cf6`) lighting, glassmorphism panels, cosmic stardust particles, and reflective 3D celestial materials.
- **ASTRA Geometric Logo:** Modern geometric 4-point celestial star prism with electric cyan-violet gradient and subtle founder attribution.
- **Hero 3D Celestial Core:** An interactive, mouse-responsive celestial core featuring a faceted refractive icosahedron, counter-rotating quantum core, nested astrolabe orbit rings, and floating cosmic shards.

---

## 🚀 Getting Started

### 1. Environment Configuration
Copy the sample environment file and configure your credentials:
```bash
cp .env.example .env
```

### 2. Concurrent Development Mode (Frontend + Backend)
Run both the React frontend (`localhost:5173`) and Node/Express backend (`localhost:5000`) simultaneously with one command:
```bash
npm run dev
```

### 3. Independent Services
```bash
# Run Frontend only (Vite @ http://localhost:5173)
npm run dev:client

# Run Backend only (Express @ http://localhost:5000)
npm run dev:server

# Clean any stale background project processes
npm run clean
```

### 4. Production Build & Preview
```bash
# Compile optimized TypeScript and Vite production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🔐 Private Admin Dashboard

Accessible at **`http://localhost:5173/admin/login`** or via the lock icon in the navigation bar.

### Administrator Credentials:
- Configure `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your private `.env` file (copied from `.env.example`).
- Password and email can also be updated directly from the Admin Dashboard under **Website Settings**.

### Admin Modules Included:
1. **Overview Dashboard:** Total projects, published vs drafts, active services, contact enquiries tally (new/read/completed), and quick action shortcuts.
2. **Profile Management:** Edit display name, professional title, bio, education, location, avatar photograph upload, social links, and WhatsApp number.
3. **Hero Management:** Edit brand tagline, description, CTA button text/links, and toggle 3D celestial canvas and cosmic stardust particles.
4. **Project Management:** Full CRUD with screenshot upload, category selection, tech tags, demo & GitHub URLs, featured flag, publish/draft toggle, and display order.
5. **Services Management:** Full CRUD for 6 specialized offerings with icon selection, deliverables, target audience, and visibility toggles.
6. **Skills & Stack Management:** Manage technologies categorized across Frontend, Backend, Database, and Tooling.
7. **Testimonials Management:** Add, edit, delete genuine client feedback, star ratings, and control visibility.
8. **Contact Enquiries & Leads:** Review submitted client messages, sender details, filter by status (New, Read, Completed), reply directly, and delete with confirmation.
9. **Website Settings:** Site SEO meta title, meta description, wordmark logo, footer copyright notice, and secure password change.

---

## 🗄️ Database Architecture

- **Persistent JSON Engine (Out-of-the-box):** Works automatically without requiring any local database installation or service setup. All admin modifications are saved to `server/data/astra_db.json`.
- **MongoDB Atlas Support (Optional):** To connect to MongoDB Atlas or an external MongoDB instance, simply define `MONGO_URI` in `.env`:
  ```env
  MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/astra_portfolio?retryWrites=true&w=majority
  ```

---

## 📁 Project Structure

```
├── server/
│   ├── config/
│   │   ├── db.js                # Dual-engine database persistence (MongoDB + JSON)
│   │   └── defaultData.js       # Seed dataset for ASTRA portfolio
│   ├── middleware/
│   │   ├── auth.js              # JWT bearer token verification
│   │   ├── rateLimiter.js       # Brute-force & spam protection
│   │   └── upload.js            # Multer image upload handling
│   ├── routes/
│   │   ├── authRoutes.js        # Admin login, verification, password change
│   │   ├── publicRoutes.js      # Public portfolio API & contact submissions
│   │   └── adminRoutes.js       # Protected CRUD endpoints
│   ├── uploads/                 # Uploaded screenshots and media files
│   └── index.js                 # Express server entry point
│
├── src/
│   ├── components/
│   │   ├── admin/               # 8 Admin Management Modules + ConfirmModal
│   │   ├── common/              # AstraLogo, Navbar, Footer, CustomCursor, etc.
│   │   ├── hero/                # HeroSection, HeroCanvas (ASTRA 3D Celestial Core)
│   │   ├── about/               # AboutSection, ProfileCard3D
│   │   ├── services/            # ServicesSection, ServiceCard, ServiceModal
│   │   ├── projects/            # ProjectsSection, ProjectCard, ProjectLiveSimulator
│   │   ├── skills/              # SkillsSection, SkillItemCard
│   │   ├── process/             # 5-Stage Methodology (Discover to Launch)
│   │   ├── why/                 # WhyChooseMeSection
│   │   ├── testimonials/        # TestimonialsSection
│   │   └── contact/             # ContactSection (Direct API submission)
│   ├── context/
│   │   ├── AuthContext.tsx      # Admin authentication state management
│   │   └── PortfolioContext.tsx # Global dynamic portfolio data layer
│   ├── pages/
│   │   ├── PortfolioHome.tsx    # Public ASTRA Portfolio Homepage
│   │   ├── AdminLogin.tsx       # Secure Admin Login Portal
│   │   └── AdminDashboard.tsx   # Private Admin Command Center
│   ├── types/
│   │   └── index.ts             # Comprehensive TypeScript definitions
│   ├── App.tsx                  # Client router (/ and /admin/*)
│   └── main.tsx
```

---

## 🔒 Security Measures

- **No Public Registration:** Admin accounts can only be initialized via seed / environment configuration.
- **Server-Side Authorization:** Every admin API route is guarded by JWT authentication middleware (`Bearer <token>`).
- **Password Hashing:** Passwords are encrypted using `bcryptjs` with salt work factor 10.
- **Rate Limiting:** Protects `/api/auth/login` (anti brute-force) and `/api/public/contact` (anti-spam).
- **File Upload Security:** Validates MIME types (PNG, JPG, WEBP, SVG) with 5MB file-size limits.
- **Honeypot Protection:** Silently deflects automated spam bots on the contact form.
- **Environment Isolation:** Secrets (`JWT_SECRET`, credentials) are managed strictly on the backend.

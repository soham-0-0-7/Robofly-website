# 🚁 Robofly Website & Secure Admin Dashboard

A production-grade Next.js application for Robofly’s services with a protected admin panel, secure inquiry workflow (CAPTCHA + OTP), and optimized performance.

## ⚙️ Tech Stack
- Frontend: Next.js 15 (App Router), React, TypeScript, Tailwind CSS, Framer Motion
- Backend: Next.js Route Handlers (API), Node.js
- Database: MongoDB + Mongoose
- Auth & Sessions: HttpOnly Cookies + server-side validation
- Queue/Cache (optional): Redis (e.g., Upstash) for OTP/session/temp data
- Email: Nodemailer (SMTP) for OTP and notifications
- Media: next/image (CDN-ready), Cloudinary (optional)

## 🔐 Security & Safety
- Protected Admin Panel (/robofly-admin)
  - Session-based authentication (HttpOnly, SameSite cookies)
  - Server-side session validation and permission checks
  - Fine-grained role/permission gates on all admin actions
  - Activity logs for sensitive operations
- Form Hardening
  - Google reCAPTCHA verification on all public forms
  - Email OTP verification (6-digit, time-bound) before submission
  - Input validation and sanitation on server
- API & Ops
  - Route-level guards; uniform error handling
  - Optional rate limiting on auth/OTP endpoints
  - No secrets in client bundles; env-only configuration

## 🧑‍✈️ Admin Panel Highlights
- Users: create/update/delete, password and permission management
- Content: blogs/products/services CRUD
- Queries: manage service inquiries with status updates
- Logs: track admin actions for auditability

## 📨 Secure Inquiry Flow (All 7 Service Forms)
1) User fills form → 2) reCAPTCHA → 3) OTP sent via email → 4) OTP verified → 5) Persist to DB  
Endpoints: /api/verify-captcha, /api/send-otp, /api/verify-otp, /api/query/services/*

Forms included:
- Agricultural Analysis
- Drone Mapping & Surveying
- Dam Surveillance
- Industrial Inspection
- Forest Fire Management
- Post-Wildfire Assessment
- General Services

## 🚀 Performance & Optimization
- next/image with responsive, lazy-loaded media
- Code-splitting and route-level chunking
- Static rendering/ISR where applicable
- Minimal client bundles; server-first data fetching
- Indexed MongoDB collections (where relevant)

## 🛠️ Development
```bash
# Install
npm install

# Dev
npm run dev

# Lint & Type Check
npm run lint

# Production build
npm run build
npm start
```

## 🔧 Environment (.env.local)
```bash
# Database
MONGODB_URI=your_mongodb_uri

# Email (SMTP)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
FROM_EMAIL=your_from_email

# CAPTCHA
RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key

# OTP/Cache (optional)
REDIS_URL=your_redis_url
REDIS_TOKEN=your_redis_token

# Images (optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

## 📁 Structure (simplified)
```
src/
├─ app/                    # App Router pages & API routes
│  ├─ api/                 # Route Handlers (server)
│  └─ robofly-admin/       # Protected admin UI
├─ components/             # Reusable UI (forms, modals, OTPModal, ReCaptcha)
├─ lib/                    # DB/connectors
├─ models/                 # Mongoose schemas
├─ utils/                  # Validators, helpers (session validation, etc.)
└─ middleware.ts           # Edge/middleware (guards, headers)
```

## ✅ Notes & Conventions
- Dynamic API routes in Next.js 15: await params (e.g., `{ params }: { params: Promise<{ id: string }> }`)
- Always verify session and permissions server-side for admin endpoints
- OTP is required before persisting any public form submission

---
Built for reliability and security.

Video link - https://drive.google.com/drive/folders/1buOj110stCccYNs7rphy8Wilj05Cb3Xt?usp=sharing



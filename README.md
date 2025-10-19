# BuildFolio 2025 — TechVerse Buildathon Official Site

BuildFolio 2025 is the official site for TechVerse’s portfolio buildathon — a design-meets-code challenge where participants craft and showcase their personal portfolios to win recognition, feedback, and swags. This repository contains the public landing site, timeline, judges, FAQs, and the registration portal.

- Live Competition Window: 15 Nov 2025
- Registration closes: 10 Nov 2025, 11:59 PM IST
- Judging: 16 Nov 2025, 7:00 PM IST (online)
- Results: 16 Nov 2025, 11:00 PM IST

Contact: techversecommunity7@gmail.com


## What is TechVerse?

TechVerse is a student-led community where students, developers, and tech enthusiasts unite to learn, build, and grow together. BuildFolio 2025 is organized by the TechVerse community.

- WhatsApp: https://chat.whatsapp.com/DRBBLzTOMndAEaf7e9Ddq9
- LinkedIn: https://www.linkedin.com/company/techversecommunity/about/?viewAsMember=true
- Instagram: https://www.instagram.com/techversecommunity/


## Highlights

- Purpose-built official website for the BuildFolio 2025 competition
- Modern animated UI with Glassmorphism and neon accents
- 3D background canvas and smooth section reveals
- End-to-end registration flow with validation and proof uploads
- SPA routing (Home, Register, 404) with Vite and React Router
- Ready for zero-config deployment on Vercel (SPA rewrites included)


## Tech Stack

- React 18 + TypeScript
- Vite 5 (Dev server and build)
- Tailwind CSS + tailwind-merge + tailwindcss-animate
- shadcn/ui + Radix UI primitives (buttons, dialogs, accordion, etc.)
- Framer Motion (animations)
- Three.js + @react-three/fiber + @react-three/drei (3D background)
- React Router v6
- Lucide Icons


## Project Structure

Key files and folders you might edit first:

- `src/pages/Index.tsx` — Home page combining sections (Hero, About, Timeline, Judges, FAQ)
- `src/pages/Register.tsx` — Registration route
- `src/components/RegistrationForm.tsx` — Registration logic, validation, and submission endpoint
- `src/components/HeroSection.tsx` — Hero with countdown and CTA
- `src/components/TimelineSection.tsx` — Event milestones and dates
- `src/components/JudgesSection.tsx` — Judges and profiles
- `src/components/FAQSection.tsx` — Frequently asked questions
- `vercel.json` — SPA rewrite for Vercel deployments
- `vite.config.ts`, `tailwind.config.ts` — Tooling configuration


## Event Details (as shown on site)

- Applications Open: 16 Oct 2025
- Applications Close: 10 Nov 2025, 23:59
- Hackathon Begins: 15 Nov 2025, 00:00
- Submission Deadline: 16 Nov 2025, 12:00
- Judging (Online): 16 Nov 2025, 19:00
- Results Announced: 16 Nov 2025, 23:00

Why participate?

- Learn from industry professionals via actionable feedback
- Network with builders and designers
- Build a portfolio that stands out to recruiters
- Win recognition and exciting swags


## Registration Flow

The registration form collects participant details and enforces fair-play checks:

- Required fields: Name, Email, Phone, College/University, GitHub, LinkedIn, City
- Community criteria: Join TechVerse WhatsApp and follow TechVerse on LinkedIn and Instagram
- Proof uploads: Screenshots for WhatsApp, LinkedIn, and Instagram
- Terms: Explicit consent and competition agreement
- Spam prevention: Client-side cooldown (prevents rapid duplicate submissions)

Submission endpoint is currently configured to a Google Apps Script Web App using `fetch` with `mode: "no-cors"`.

Update the endpoint here if needed:
- File: `src/components/RegistrationForm.tsx`
- Constant: `GOOGLE_SCRIPT_URL`

Note: With `no-cors`, the client can’t read server responses; the UI assumes success if the request doesn’t throw.

## Deployment (Vercel)

This project is configured for single-page app routing on Vercel:

- `vercel.json` contains rewrites to serve `index.html` for all routes
- Build command: `vite build` (Vercel auto-detects)
- Output: `dist/`

Steps:
1) Push your repository to GitHub
2) Import the project into Vercel
3) Use framework preset “Vite” or “Other”, confirm build command and output directory
4) Deploy

Routing (e.g., `/register`) will work thanks to the rewrite rule.


## Customization Pointers

- Branding and copy: Edit text in `src/components/*Section.tsx` files
- Dates/timeline: `src/components/TimelineSection.tsx`
- Countdown date: `src/components/HeroSection.tsx`
- Judges: `src/components/JudgesSection.tsx`
- Registration endpoint: `src/components/RegistrationForm.tsx` (`GOOGLE_SCRIPT_URL`)
- Colors/Theme: `tailwind.config.ts` and utility classes in components

SEO and meta:
- Public assets: `public/robots.txt`, `public/404.html`, `public/_redirects`
- `index.html`: Update title, meta description, and social tags if needed


## FAQs (quick view)

- Who can participate? Anyone — students, professionals, hobbyists.
- Registration fee? No, it’s free.
- Team or individual? Individual.
- Submission method? Instructions via email; final deadline on 16 Nov 2025 (12:00).
- Judging basis? Creativity, storytelling, design, and overall presentation.
- Allowed platforms? Any that best showcases your work (e.g., GitHub, Behance, Notion, Canva).


## Credits

Organized by the TechVerse community.
- Community: TechVerse
- Contact: techversecommunity7@gmail.com
- Socials: WhatsApp, LinkedIn, Instagram

If you use or adapt this project, please include attribution to TechVerse and the BuildFolio 2025 competition.


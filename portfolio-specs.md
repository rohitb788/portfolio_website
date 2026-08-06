# Personal Portfolio Website — Specs

## 1. Purpose & Audience
Primary audience: technical recruiters and hiring managers at aerospace/defense startups (Sales Engineering, Systems Engineering, Business Development) — and secondary audience: early-stage VC/accelerator contacts (e.g. Type One Ventures, Starburst Aerospace) evaluating technical founder potential.

The site's job is NOT to be a resume restated in HTML. Its job is to let a technical reviewer verify depth in ~90 seconds: real code, real numbers, real derivations — not adjectives.

## 2. Non-negotiable content rule
Every project entry MUST include:
- A metrics table (quantitative results — settling time, overshoot %, RMS error, validation error vs. analytical/reference solution, etc.)
- A working GitHub repo link (public, README with setup instructions)
- A one-line "what this proves" statement aimed at a GNC/controls reviewer specifically

If a project doesn't have these three things yet, it goes in a "Work in Progress" section, not the main Projects grid. Do not launch a project card with placeholder metrics — an empty metrics table is more damaging than not listing the project, because it signals the work isn't actually validated.

## 3. Site structure

### Hero
- Name, one-line positioning statement (controls/GNC engineer who thinks in systems terms — not "aspiring TPM" or "business + engineering hybrid")
- Links: GitHub, LinkedIn, resume PDF, email

### About
- 2–3 short paragraphs: current status (UMich Aero + Business, Class of 2029), SkySpecs internship (production engineering / additive manufacturing — described narrowly, no NDA'd specifics), technical interests (proximity ops, in-space manufacturing)
- No mention of unrelated activities (e.g. fraternity finance role) unless directly reframed as a technical/leadership signal you want recruiters to see

### Projects (main grid)
Only projects meeting the Section 2 bar. Expected candidates once ready:
- **6-DOF Nonlinear Quadrotor GNC Simulator** — cascaded PID + LQR, quaternion kinematics, Newton-Euler dynamics, RK4 integration
- **Multi-Phase Spacecraft Dynamics Simulator** — attitude control, two-body orbital mechanics, Clohessy-Wiltshire proximity ops

Each project page/card includes:
- Problem statement (1-2 sentences)
- Method (what was derived/implemented, not just "used")
- Metrics table
- Key plot/figure (controller response, error convergence, trajectory)
- Repo link + tech stack tags (Python, scipy, etc.)

### Work in Progress (secondary section, clearly labeled)
Anything not yet meeting the bar. Honest framing beats padding — "in progress" reads better to a technical reviewer than a thin finished card.

### Experience
- SkySpecs: production engineering intern — FDM/SLS additive manufacturing process documentation, in-house parts-tracking tooling (Google Apps Script + Slack API)
- Keep this brief; it should not be the strongest section on the page

### Skills
- Grouped: Controls & Estimation (PID, LQR, Kalman filtering if applicable), Simulation & Numerical Methods (RK4, linearization), Languages/Tools (Python, scipy, numpy, Git)
- Do NOT lead with Salesforce/Excel or generalist tooling — this was flagged as a resume mistake to avoid repeating on the site

### Contact / Footer
- Email, LinkedIn, GitHub, resume download

## 4. Design principles
- Clean, technical, minimal — dark-mode-friendly, monospace or technical-feeling accent font for headings/code
- No stock "tech startup" gradients or generic hero illustrations — reads as templated to a technical audience
- Fast load, no heavy animation libraries; a controls engineer's site should feel precise, not flashy
- Mobile responsive but desktop-first (recruiters review on desktop)

## 5. Technical requirements
- Static site (no custom backend needed) — deploy to Vercel (auto-detects the framework, zero-config builds, preview deploys per branch)
- Framework: Next.js recommended — gives you the server-side API routes needed for the admin auth flow below (a pure static Astro build can't do server-side password checks or GitHub commits securely). If you'd rather stay on Astro, it needs server endpoints/an SSR adapter enabled, which mostly closes the gap with Next.js anyway.
- SEO basics: meta title/description, OpenGraph tags for LinkedIn link previews
- Accessible: semantic HTML, alt text on figures, sufficient color contrast
- Resume served as a downloadable PDF, not just a link to LinkedIn

## 6. Content editing (admin access)
You (the single admin/owner) need to add/edit/remove content — projects, skills, bio, experience — directly on the live site, without a database or multi-user accounts, while the site stays publicly viewable to everyone.

Approach: single shared admin password, checked server-side, gating a GitHub-API-backed edit flow.
- One password, set by you as a server-side environment variable (`ADMIN_PASSWORD` on Vercel) — never in client code, never committed to the repo
- Login form on the site posts to a server API route that compares the submitted password server-side and, if correct, sets a signed session cookie
- Editing UI (visible only once authenticated) lets you change content fields defined in Section 3
- Edit actions go through another server API route that verifies the session cookie, then uses a repo-scoped GitHub personal access token (stored server-side, also never exposed to the client) to commit the change directly to the repo via the GitHub API
- Vercel auto-redeploys on that commit, so the edit goes live automatically
- No database, no user accounts — just one password gating one editor's write access; the site itself remains a static/content site to all other visitors
- Requires a framework with server-side API routes (e.g. Next.js, or Astro with server endpoints/adapter enabled) rather than a pure static build, since the password check and GitHub commit must run server-side to be real security

## 7. Out of scope for v1
- Client-side-only password checks (not real security — password would be visible in the browser bundle and the check could be bypassed entirely)
- Multi-user accounts / permissions / OAuth (single editor: you, one shared password)
- Database of any kind (content lives as files in the GitHub repo, edited via API)
- Contact form with backend (mailto link is sufficient)
- Analytics beyond basic (optional: Plausible/GoatCounter if wanted)
# Portfolio site

A personal portfolio built with Next.js (App Router + TypeScript + Tailwind), deployed to Vercel. Content lives in JSON files under `src/data/`, not hardcoded in the layout — edit those files directly, or use the built-in `/admin` editing UI, which commits changes straight to this repo via the GitHub API and lets Vercel auto-redeploy.

## Project structure

```
src/
  app/
    page.tsx                 # Homepage — assembles Hero, About, Projects, WIP, Experience, Skills
    projects/[slug]/page.tsx # Individual project detail pages
    admin/page.tsx           # Login form + editing dashboard (gated by session cookie)
    api/auth/...              # Login / logout routes
    api/admin/content/[key]  # Content read/write route (session-gated, writes via GitHub API)
  components/                # UI components (presentation only, no content)
  components/admin/          # Editing dashboard UI
  data/                      # ALL editable content lives here as JSON
    site.json                # Name, positioning statement, links, about paragraphs
    projects.json            # Main projects grid (problem/method/metrics/figure/repo/tags)
    wip-projects.json        # Work-in-progress section
    experience.json          # Work history
    skills.json              # Grouped skills
  lib/                       # Auth, rate limiting, GitHub API client, content loaders
  types/content.ts           # TypeScript shapes all the JSON content is validated against
```

To change content without the admin UI, just edit the JSON files in `src/data/` directly and commit as usual — the site reads from them at build time.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Windows note:** if PowerShell blocks `npm run dev` with a script-execution error, run `npm.cmd run dev` instead (or use Git Bash) rather than changing your system's PowerShell execution policy.

## Environment variables

Copy `.env.example` to `.env.local` for local development. In production, set the same variables in your Vercel project's **Settings → Environment Variables** — none of these are ever sent to the browser.

| Variable | Purpose |
|---|---|
| `ADMIN_PASSWORD` | The single password that gates `/admin`. Pick something long and random. |
| `SESSION_SECRET` | Random secret used to sign the admin session cookie. Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. |
| `GITHUB_TOKEN` | A GitHub personal access token with write access to **this repo only**, used server-side to commit content edits. See below. |
| `GITHUB_REPO_OWNER` | Your GitHub username or org, e.g. `your-username`. |
| `GITHUB_REPO_NAME` | This repo's name, e.g. `portfolio-website`. |
| `GITHUB_REPO_BRANCH` | Branch to commit to. Defaults to `main` if unset. |

### Creating the GitHub token

Use a **fine-grained personal access token** (GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens):
- Repository access: only this repo
- Permissions: **Contents → Read and write**

That's the minimum scope needed — the token can't touch any other repo.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, "Add New… → Project" and import the repo. Vercel auto-detects Next.js — no config needed.
3. Before the first deploy (or right after, then redeploy), add the environment variables from the table above in **Project → Settings → Environment Variables**.
4. Deploy. Every future push to your main branch — including commits made through `/admin` — triggers an automatic redeploy.

## Editing content once live

1. Go to `https://your-site.com/admin`.
2. Enter `ADMIN_PASSWORD`. This sets a signed, httpOnly session cookie — nothing password-related ever touches client-side JS.
3. Use the tabs (Site & About, Projects, Work in Progress, Experience, Skills) to add, edit, or remove content.
4. Click **Save changes** on a tab to commit just that section. This calls a server route that re-verifies your session, then writes the updated JSON file to this GitHub repo via the GitHub API. Vercel picks up the commit and redeploys automatically — changes are usually live within a minute or two.
5. **Log out** clears the session cookie. Everyone else visiting the site — including `/admin` without a valid session — only ever sees the public pages; there's no login prompt or edit affordance anywhere on the public site.

Failed login attempts are rate-limited: each wrong password adds a growing delay, and five failures in five minutes lock out further attempts for a few minutes.

## Before you ship

A few things are intentionally left as placeholders — search the codebase for `[Your Name]`, `[TBD]`, `your-username`, etc.:

- **`src/data/site.json`** — real name, GitHub/LinkedIn URLs, email.
- **`public/resume.pdf`** — add your actual resume PDF here (referenced by the "Resume" link); it isn't included.
- **Project metrics** — every `[TBD]` in `src/data/projects.json` is a placeholder on purpose. Fill in real numbers only once you have them; an honest `[TBD]` beats a fabricated result.
- **`src/app/layout.tsx`** — `siteUrl` constant, used for Open Graph tags, should point at your real production domain.

# Yaseen Rather — Cybersecurity Portfolio

A futuristic, dark cyberpunk portfolio website for a SOC Analyst / Cybersecurity Engineer.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** 3.4
- **Framer Motion** 12 — animations
- **lucide-react** — icons
- **shadcn/ui** (pre-configured)

## Features

- Dark cyberpunk aesthetic (`#050505` bg, neon green + cyber blue accents)
- Terminal-style UI with typing animation
- Live SOC log feed (animated, fake)
- Scanlines, grid background, vignette
- 6 sections: Hero, About, Projects, Skills, Certifications, Contact
- Fully responsive (desktop + mobile)
- Smooth-scroll navigation with active section highlight
- Glow-border cards with hover animations
- AI-generated hooded hacker hero image

## Setup

```bash
# 1. Install dependencies
yarn install

# 2. Run dev server
yarn dev
# → http://localhost:3000

# 3. Build for production
yarn build && yarn start
```

## Project Structure

```
app/
  layout.js         # Root layout, fonts, metadata
  page.js           # Full portfolio (Hero, About, Projects, Skills, Certs, Contact)
  globals.css       # Custom cyber theme styles (neon, scanlines, grid)
public/
  hero-hacker.png   # AI-generated hero image (hooded figure at monitors)
package.json
tailwind.config.js
postcss.config.js
jsconfig.json
```

## Customization

**Edit your details** in `app/page.js`:
- `RESUME_URL` — link to your resume PDF
- `PROJECTS` array — your 3 projects
- `SKILLS` array — skill categories
- `CERTS` array — certifications
- Contact `links` array in `Contact()` — your email/GitHub/LinkedIn

**Change hero image**: replace `/public/hero-hacker.png` or update `HERO_IMAGE` constant.

**Theme colors**: tweak `--neon-green` and `--cyber-blue` in `app/globals.css`.

---

Built with passion for cybersecurity and blue teaming.
© Yaseen Rather

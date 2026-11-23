# Praise Adeogun — Portfolio

React + TypeScript + Vite + Tailwind CSS v4 + React Router.

## Run it

```bash
npm install
npm run dev        # local development
npm run build      # type-check (tsc) + production build
npm run preview    # serve the production build locally
```

## Where things live (and the idea behind it)

Content is **data**, kept separate from the components that display it, so updating the
portfolio rarely means touching UI code.

| To change… | Edit… |
|---|---|
| Name, intro, About text, contact details, links | `src/data/site.ts` |
| Add or edit a project (or its case study) | `src/data/projects.ts` |
| Jobs / internships | `src/data/experience.ts` |
| Skills groups | `src/data/expertise.ts` |
| Education, certifications, recognition, leadership | `src/data/education.ts` |
| Technology names, logos and colours | `src/lib/tech.tsx` |
| Colours and fonts for light and dark themes | `src/index.css` (the `:root` and `.dark` blocks) |

### Add a project
Add one object to `projects` in `src/data/projects.ts`. Everything except title, summary,
status, tech and links is optional (cover, gallery, case study). `featured: true` plus a
`caseStudy` gives it a full row and its own page at `/projects/<slug>`; otherwise it
appears under "More projects". Put screenshots in `src/assets/img/`, import them in
`src/data/images.ts`.

### Update the resume
Replace `public/resume/Praise-Adeogun-Resume.pdf` with your new file (**same file name**)
and redeploy. Every Resume button uses the single `resumeUrl` in `site.ts`. To use a hosted
document instead, set `VITE_RESUME_URL`.

### Contact form (EmailJS)
Copy `.env.example` to `.env` and fill in the three `VITE_EMAILJS_*` values. `.env` is
git-ignored, so **add the same variables in your host's settings** (Vercel →
Project → Settings → Environment Variables) or the form will say it isn't configured.
Vite bakes these into the browser bundle, so only use EmailJS's public key.

### Themes
Light and dark are two separate palettes defined as CSS variables. Components use names like
`bg-bg`, `text-muted`, `border-line`, `text-accent`, never raw colours. The theme follows the
OS until the visitor picks one with the toggle; their choice is saved in `localStorage`.

## Deploying (Vercel)
Import the repo, framework preset **Vite**. `vercel.json` rewrites all paths to
`index.html` so direct links to `/projects/...` work.

## Still to do before launch
- Add `og:image` and a canonical URL in `index.html` once you have a domain.
- Confirm the Sheda Academy link still works.
- Re-read the case-study wording in `projects.ts` for accuracy.

# Pakadarpanalaya — IIT Bhilai Mess Portal (React)

The official dining portal of IIT Bhilai, rebuilt from Django into a static React app.

## What changed vs the Django version

| Django | React |
| --- | --- |
| Server-rendered templates (Tailwind CDN) | Vite + React SPA (Tailwind v4, compiled) |
| Menu parsed server-side with pandas / Redis cache | Parsed in the browser with SheetJS, cached in `localStorage` (same 20-min check logic) |
| Leadership / committee / notices hardcoded in `views.py` | `src/data/siteData.js` — single file to edit |
| Django admin for announcements | No backend — announcements are constants in `siteData.js` (see suggestions below) |
| `/complaints` was a placeholder | Full page with QR code for the complaint form |

## Getting started

```bash
npm install
npm run dev      # local dev at http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Configure your content

All editable content lives in **`src/data/siteData.js`**:
- `LEADERSHIP`, `COMMITTEE`, `NOTICES` — team and notice-board content
- `MEAL_TIMINGS` — the appetite strip timings
- `COMPLAINTS.url` — ⚠️ replace with your real Google Form link (QR code + button point to it)
- `ANNOUNCEMENTS` — empty by default; add objects `{ title, message, kind, color }`

The menu is fetched live from the same public Google Sheet as before
(the URL and sheet formats `1&3 Week` / `2&4` are in `src/lib/menu.js`).

## Deploying (static, no server needed)

The site is fully static — `dist/` is all you need.

**Netlify** (drag & drop): build command `npm run build`, publish directory `dist`.

**Vercel:** import the repo — `vercel.json` with SPA rewrites is already included.

**GitHub Pages:** set `base` in `vite.config.js` to `/your-repo-name/`, push `dist/` to `gh-pages`.

No Docker, Redis, or SQLite required — nothing to run 24/7, so hosting is free.

## Suggested next steps

1. **Menu refresh speed** — the browser refetches the sheet every 20 min per visitor;
   a cheap serverless function on deploy platforms can pre-parse it, but this is fine for a campus site.
2. **Announcements** — the Django admin is gone. If you need editable announcements/notices,
   point the site at a small Google Sheet or a free backend (Supabase/Firebase).
3. **Photos** — `Coordinator.jpg`, `member*.jpg`, and `pakadarpanalaya.jpg` were missing even in the
   Django version; add them to `public/images/` to replace the new gradient-initials fallbacks.
4. **Complaints form** — create a Google Form and paste its link into `COMPLAINTS.url` in `siteData.js`;
   print the QR code at the mess entrance.
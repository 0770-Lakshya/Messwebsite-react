# Pakadarpanalaya — IIT Bhilai Mess Portal

The official dining portal of IIT Bhilai. A static React/Vite app (originally a Django site) — live menu from Google Sheets, weekly schedule, mess committee hierarchy, notices, and a Google-login-gated complaint QR desk.

## Tech

- **Vite + React** with React Router (SPA, client-side routing)
- **Tailwind CSS** + custom `polaris.css` (Polaris purple theme, light only)
- **SheetJS (`xlsx`)** — parses the menu Google Sheet in the browser (lazy-loaded chunk)
- **Google Identity Services** (`@react-oauth/google`) — login for the complaints desk

Everything is static — deploy `dist/` anywhere (Netlify, Vercel, GitHub Pages). No backend, no database, no Redis.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Project structure

'''
src/
├── data/siteData.js      # ← ALL editable content lives here
├── lib/menu.js           # Google Sheet download, parsing, caching, week/meal logic
├── lib/useMenu.js        # React hook that loads the menu
├── components/           # Layout, Navbar, Avatar, MenuBits (cards/tables)
└── pages/                # Home, Menu, WeeklyMenu, Committee, Contact, Complaints


## Configure content — `src/data/siteData.js`

| Setting | What it does |
| --- | --- |
| `LEADERSHIP` | Dignitaries on the home page (order = display order) |
| `COMMITTEE` | Committee page — first entry is the Coordinator (top tier), rest are Members |
| `MESS_INCHARGE` | FIC card shown between the Coordinator and Members |
| `NOTICES` | Notice board cards (title, category, text, color) |
| `ANNOUNCEMENTS` | Announcement strip above the notice board; add `{ title, message, kind, color }` |
| `MEAL_TIMINGS` | The meal-timing strip under the hero |
| `CONTACT` | Contact page address, emails, caterers |
| `ALLOWED_EMAIL_DOMAIN` | Only emails with this domain can sign in (default `iitbhilai.ac.in`) |


The Weekly Menu page and Home's "at a Glance" will then open on the correct week automatically,
including a **"This week"** badge. Update the anchor if the mess breaks its rhythm (holidays, semesters).





## Photos

Images live in `public/images/`. Any member whose `photo` is `null` or whose file is missing gets a
gradient initials avatar automatically — nothing breaks. Add photos by dropping files there and setting
the `photo` field.

## Deploy

**Vercel:** =Import the repo in the Vercel dashboard`.

## Maintenance tips

- Content changes (people, notices, announcements) → edit `siteData.js` 
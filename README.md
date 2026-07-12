# De'Beka Collections

Website for Carolyne Wanyonyi's clothing business. Built with React + Vite, Framer Motion for animation, and Lenis for smooth scrolling.

## Running locally

```
npm install
npm run dev
```

Opens at `http://localhost:5173/`.

## Building for production

```
npm run build
npm run preview   # serve the built dist/ folder locally to sanity-check it
```

## Deploying

Live at **https://de-beka-collections.vercel.app/**. Vercel is connected directly to this GitHub repo and auto-builds on every push to `main` — it auto-detects the Vite project, no config file needed. Just push.

There's also a `netlify.toml` left in the repo from a previous attempt at hosting on Netlify (abandoned after builds got stuck disabled on that account with no obvious way to re-enable them from the dashboard). It's inert unless the site is reconnected to Netlify — safe to ignore.

## Project structure

- `src/data/products.json` — the product catalog data. Each product: `id`, `name`, `price`, `desc`, `image`, optional `imageBack` (front/back photo toggle), `category`, `slot`, `tags`, optional `sold: true`.
- `src/data/products.js` — imports the JSON and exports it plus helpers/labels. `tags` (`new`/`trending`/`premium`/`limited`) drive the editorial carousels on the homepage; `slot` (`top`/`bottom`/`outerwear`/`dress`/`set`) drives the Build Your Look picker.
- `src/components/` — one file per section/feature.
- `src/admin/` — the hidden admin page (see below). Code-split; shoppers never download it.
- `src/context/AppContext.jsx` — shared state: theme, wishlist, recently viewed, active quick view, search/filter.
- `public/images/` — product photos, logo, and the Open Graph preview card. Admin-uploaded photos land in `public/images/uploads/`.
- `incoming-photos/` — real photos received but not yet wired into the catalog (e.g. waiting on prices or more categories). Not built into the site; just a holding area.

## Admin page (for Carolyne)

**https://de-beka-collections.vercel.app/#/admin** — hidden page (not linked from the shop) where Carolyne can add items, mark items **Sold** or **New Arrival**, edit names/prices/descriptions, and delete items, all from her phone. Photos are resized in the browser to the same spec as the rest of the catalog (max 1000px wide, JPEG).

How it works: there is no server or database. "Publish to website" makes one git commit to this repo via the GitHub API (new photos + updated `src/data/products.json`), and Vercel auto-deploys it — changes go live in about a minute.

Setup (one-time, Larry): create a **fine-grained personal access token** on GitHub scoped to only this repo with **Contents: Read and write** (nothing else), and paste it into the admin login on Carolyne's phone. It's stored in that browser's localStorage only — never committed. If the token ever leaks, revoke it at github.com → Settings → Developer settings; the blast radius is this one repo.

Notes:
- Edits are staged on the page until **Publish** — one commit per publish session, message lists every change.
- Deleting a product removes it from the site but leaves its old photo files in the repo (harmless orphans).
- If two people edit at the same time, the last publish wins for the catalog file. With one admin (Carolyne) this doesn't matter.

## Catalog status (as of 2026-07-12)

- **Women's dresses (48 items)** — real photos (front + back for 46 of them) and honest descriptions. **Prices are all "Ask Carolyne"** placeholders — Carolyne can now set real prices herself via the admin page.
- **Men's shirts (41 items)** — real photos and descriptions, prices also "Ask Carolyne".
- **Kids' items (4 items)** — still the original **fictional placeholder products** (invented names, descriptions, and prices). Replace wholesale once real kids photos arrive — don't patch individually, none of the underlying data is real.

## Adding real product photos

Preferred: use the **admin page** above — it resizes photos, writes the catalog entry, and deploys, all in one flow.

Manually (bulk imports):
1. Resize/orient photos and drop them into `public/images/<category>/...` (see `src/data/products.json` for the path convention, e.g. `public/images/men/shirts/`).
2. Add or update the matching entry in `src/data/products.json` — `id`, `name`, `price`, `desc`, `image` (plus `imageBack` if there's a back photo), `category`, `slot`, `tags`.
3. Never invent a price. If it's not confirmed yet, use the literal string `'Ask Carolyne'` — the UI (product cards, Quick View, Build Your Look's price total) already handles that value gracefully instead of showing a broken number.

## Editing products and prices

Small edits: use the admin page. Bulk edits: edit `src/data/products.json` directly. No other file needs to change; the shop grid, editorial rows, Build Your Look, and quick view all read from this one list. Don't hand-edit the JSON while an admin publish might be in flight — whoever commits last wins.

## Contact info

Phone number and WhatsApp link are set to +254 728 871 796 — defined once as `WHATSAPP_NUMBER` in `src/data/products.js`.

## What's intentionally not built yet

A few things from past design briefs were deliberately left out because building them would mean faking a capability the business doesn't actually have:

- **Real checkout / cart / payments** — Carolyne doesn't have an M-Pesa Till yet. Every "buy" action routes to a WhatsApp message instead, which is how she actually closes sales today. Once she registers for M-Pesa for Business, a real payment step can replace this.
- **Customer photo gallery & testimonials** — both are honest empty-state placeholders inviting real submissions, not invented quotes or stock photos.
- **Multi-angle / 360° product views** — a true 360° spin needs 8+ angles per item, which isn't realistic to shoot for a small catalog. The honest middle ground is built instead: products with a back photo (`imageBack`) get a real front/back toggle on the card and in Quick View. The men's shirts are still single front shots.
- **AI outfit rendering** (a model shown wearing a picked combo) — this needs a generative-image or virtual-try-on API (e.g. an image model that composites garment photos onto a person), which is a separate paid service with its own API key and per-request cost. No such service is connected in this project, and this environment has no image-generation tool to fall back on. Build Your Look exists today as the honest version: pick real pieces, see them listed with a running price, send the combo to Carolyne over WhatsApp — no rendered image, because there's nothing real to render it with yet.

## Link preview (Open Graph)

The page `<head>` has `og:image`/`og:url` tags pointing to `https://debekacollections.netlify.app/` so the link shows a nice preview card when shared on WhatsApp/Instagram. If you host the site elsewhere, update those two tags in `index.html`.

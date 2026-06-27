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

Live at **https://debekacollections.netlify.app/**. Netlify is connected directly to this GitHub repo and auto-builds on every push to `main` — `netlify.toml` tells it to run `npm run build` and publish `dist/`. No manual dashboard steps needed; just push.

## Project structure

- `src/data/products.js` — the product catalog. `tags` (`new`/`trending`/`premium`/`limited`) drive the editorial carousels on the homepage; `slot` (`top`/`bottom`/`outerwear`/`dress`/`set`) drives the Build Your Look picker.
- `src/components/` — one file per section/feature.
- `src/context/AppContext.jsx` — shared state: theme, wishlist, recently viewed, active quick view, search/filter.
- `public/images/` — product photos, logo, and the Open Graph preview card.
- `incoming-photos/` — real photos received but not yet wired into the catalog (e.g. waiting on prices or more categories). Not built into the site; just a holding area.

## Catalog status (as of 2026-06-27)

- **Men's shirts (21 items)** — real photos and descriptions, but **prices are all "Ask Carolyne"** placeholders. Replace with real numbers in `src/data/products.js` as soon as Carolyne confirms them — search for `Ask Carolyne` to find every one.
- **Women's and Kids' items (8 items)** — still the original **fictional placeholder products** from before any real photos existed (invented names, descriptions, and prices). These need to be replaced wholesale once real photos for those categories arrive — don't try to patch them individually, since none of the underlying data is real.

## Adding real product photos

1. Resize/orient photos and drop them into `public/images/<category>/...` (see `src/data/products.js` for the path convention, e.g. `public/images/men/shirts/`).
2. Add or update the matching entry in `src/data/products.js` — `name`, `price`, `desc`, `image`, `category`, `slot`, `tags`.
3. Never invent a price. If it's not confirmed yet, use the literal string `'Ask Carolyne'` — the UI (product cards, Quick View, Build Your Look's price total) already handles that value gracefully instead of showing a broken number.

## Editing products and prices

Edit `src/data/products.js` directly — each product is one object with `name`, `price`, `desc`, `image`, `category`, `slot`, and `tags`. No other file needs to change; the shop grid, editorial rows, Build Your Look, and quick view all read from this one list.

## Contact info

Phone number and WhatsApp link are set to +254 728 871 796 — defined once as `WHATSAPP_NUMBER` in `src/data/products.js`.

## What's intentionally not built yet

A few things from past design briefs were deliberately left out because building them would mean faking a capability the business doesn't actually have:

- **Real checkout / cart / payments** — Carolyne doesn't have an M-Pesa Till yet. Every "buy" action routes to a WhatsApp message instead, which is how she actually closes sales today. Once she registers for M-Pesa for Business, a real payment step can replace this.
- **Customer photo gallery & testimonials** — both are honest empty-state placeholders inviting real submissions, not invented quotes or stock photos.
- **Multi-angle / 360° product views** — every real photo so far is a single front-facing shot. A true 360° spin needs 8+ angles per item, which isn't realistic to shoot for a small catalog. A more honest middle ground: if Carolyne shoots one **back** photo per item too, a simple front/back toggle (real photos, not a fake rotation) becomes buildable — ask if that's wanted before investing in more photography.
- **AI outfit rendering** (a model shown wearing a picked combo) — this needs a generative-image or virtual-try-on API (e.g. an image model that composites garment photos onto a person), which is a separate paid service with its own API key and per-request cost. No such service is connected in this project, and this environment has no image-generation tool to fall back on. Build Your Look exists today as the honest version: pick real pieces, see them listed with a running price, send the combo to Carolyne over WhatsApp — no rendered image, because there's nothing real to render it with yet.

## Link preview (Open Graph)

The page `<head>` has `og:image`/`og:url` tags pointing to `https://debekacollections.netlify.app/` so the link shows a nice preview card when shared on WhatsApp/Instagram. If you host the site elsewhere, update those two tags in `index.html`.

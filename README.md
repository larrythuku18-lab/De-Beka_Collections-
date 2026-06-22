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

- `src/data/products.js` — the real product catalog (12 items). `tags` (`new`/`trending`/`premium`/`limited`) drive the editorial carousels on the homepage; `slot` (`top`/`bottom`/`outerwear`/`dress`/`set`) drives the Build Your Look picker.
- `src/components/` — one file per section/feature.
- `src/context/AppContext.jsx` — shared state: theme, wishlist, recently viewed, active quick view, search/filter.
- `public/images/` — product photos, logo, and the Open Graph preview card.

## Adding real product photos

Drop photos into the matching folder using the exact filenames already referenced in `src/data/products.js` (e.g. `public/images/women/dress-floral.jpg`). Until a photo is added, that product just shows a plain placeholder color.

## Editing products and prices

Edit `src/data/products.js` directly — each product is one object with `name`, `price`, `desc`, `image`, `category`, `slot`, and `tags`. No other file needs to change; the shop grid, editorial rows, Build Your Look, and quick view all read from this one list.

## Contact info

Phone number and WhatsApp link are set to +254 728 871 796 — defined once as `WHATSAPP_NUMBER` in `src/data/products.js`.

## What's intentionally not built yet

A few things from past design briefs were deliberately left out because building them would mean faking a capability the business doesn't actually have:

- **Real checkout / cart / payments** — Carolyne doesn't have an M-Pesa Till yet. Every "buy" action routes to a WhatsApp message instead, which is how she actually closes sales today. Once she registers for M-Pesa for Business, a real payment step can replace this.
- **Customer photo gallery & testimonials** — both are honest empty-state placeholders inviting real submissions, not invented quotes or stock photos.
- **3D/360° product views, AI outfit rendering, hover pose-change photography** — all need real multi-angle photography or 3D assets that don't exist yet.

## Link preview (Open Graph)

The page `<head>` has `og:image`/`og:url` tags pointing to `https://debekacollections.netlify.app/` so the link shows a nice preview card when shared on WhatsApp/Instagram. If you host the site elsewhere, update those two tags in `index.html`.

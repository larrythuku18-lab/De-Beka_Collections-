# De'Beka Collections

Website for Carolyne Wanyonyi's clothing business.

## Viewing the site

Just open `index.html` in a browser — no build step or server needed.

## Adding photos

Drop your photos into the matching folder, using the exact filenames below, and they'll appear on the site automatically. Until a photo is added, that product just shows a plain placeholder color.

**images/women/**
- dress-floral.jpg — Floral Summer Dress
- dress-ankara.jpg — Ankara Print Dress
- blouse-chiffon.jpg — Chiffon Blouse
- skirt-pencil.jpg — Pencil Skirt

**images/men/**
- shirt-checked.jpg — Checked Casual Shirt
- jeans-denim.jpg — Slim Fit Denim Jeans
- jacket-bomber.jpg — Bomber Jacket
- tshirt-plain.jpg — Plain Cotton T-Shirt

**images/kids/**
- dress-kids.jpg — Girls' Party Dress
- set-boys.jpg — Boys' Shirt & Shorts Set
- romper-baby.jpg — Baby Romper
- school-set.jpg — Kids' Casual Set

## Editing products and prices

All product info (name, price range, description) lives directly in `index.html`, inside `<div class="product-card">` blocks. The example prices are placeholders — edit them to match real prices.

To add a new product, copy an existing `.product-card` block, change the image filename, name, price and description.

## Contact info

Phone number and WhatsApp link are set to +254 714 413777 in the Contact section of `index.html`.

## Link preview (Open Graph)

`index.html` has `og:image`/`og:url` tags pointing to `https://larrythuku18-lab.github.io/De-Beka_Collections-/` so the link shows a nice preview card when shared on WhatsApp/Instagram. That URL only resolves once GitHub Pages is enabled for this repo (Settings → Pages → deploy from `main`). If you host the site elsewhere instead, update those two tags in the `<head>` to match the real URL.

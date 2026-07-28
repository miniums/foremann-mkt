# foremann-mkt

Marketing site for [Foremann](https://github.com/miniums/foremann) — the AI foreman for solo trades. Astro, static, ~zero JS.

## Dev

```bash
npm install
npm run dev    # http://localhost:4321
```

## Build

```bash
npm run build  # outputs static files to ./dist
npm run preview
```

## Deploy

**Vercel** (recommended): import the repo, framework preset auto-detects Astro. Done.

**Netlify**: import the repo, build command `npm run build`, publish dir `dist`.

**Cloudflare Pages**: same as Netlify.

No env vars needed. No backend.

## Design notes

- Palette + typography mirror the app (workwear industrial — Carhartt, not Silicon Valley)
- Archivo (display) + JetBrains Mono (numbers, eyebrows, phone)
- One rust element on screen principle
- Respects `prefers-color-scheme`
- App Store badge is Apple's official artwork, unmodified — black variant on light,
  white variant on dark, swapped with `<picture>`. Never recolor or restyle it.
  Re-download from Apple's Marketing Tools if it ever needs refreshing.
- ~90KB total page weight (fonts dominate)

## Structure

```
src/
  layouts/Layout.astro    # <html> shell, meta, fonts
  pages/index.astro       # single landing page
  components/
    Nav.astro
    Footer.astro
    PhonePreview.astro    # the AI-draft hero mockup
    StoreLinks.astro      # App Store badge + "Android coming soon"
  styles/global.css       # all styles, CSS vars, dark mode
public/
  favicon.svg
  badges/                 # official Apple App Store badges (black + white)
```

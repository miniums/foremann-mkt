# tradetext-mkt

Marketing site for [TradeText](https://github.com/miniums/tradetext). Astro, static, ~zero JS.

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
  styles/global.css       # all styles, CSS vars, dark mode
public/
  favicon.svg
```

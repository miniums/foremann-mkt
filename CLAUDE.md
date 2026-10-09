# CLAUDE.md — foremann-mkt (marketing site)

Astro static site for Foremann. Auto-deploys on push to `main`, so a merged PR
is live within minutes. Read the app repo's `docs/PUBLIC_CLAIMS.md`
(`miniums/foremann`) — it is the register of every public claim and the code
that backs it.

## The rule: every sentence must be TRUE for a Starter account today

- **Truth beats polish.** If a feature is gated off for Starter
  (`src/config/entitlements.js` in the app repo), the page must say which plan
  has it ("Pro") or not mention it.
- **Remove or soften a false claim immediately. Add a new claim only after the
  capability is live in production** (merged *and* deployed; OTA-only mobile
  changes count once the update is published).
- Claims live in more places than the pricing card: hero, feature cards, FAQ
  (visible text **and** the JSON-LD copy in `index.astro` — keep them identical),
  `mi.astro`, `Layout.astro` meta/OG/JSON-LD, and the pixels of
  `public/og*.png` (alt text must describe the image).
- Visuals are claims too. Mock numbers or UI that doesn't exist in the app
  (e.g. a job-total chip) must not appear as if real.
- Don't touch pricing/billing claims without Bo ("no trial", founding offer).

## Paired PRs

Any app PR that changes user-visible behavior or entitlements has a
`Marketing impact` section and a paired PR here (or "none" + reason). Link the
two PRs to each other in their descriptions. Don't merge the marketing PR
ahead of the app change it describes, except when it only *removes* a claim.

## Before you push

```bash
npm run build   # must pass; no other CI here
```

Update the "last verified" date for any claim you touched in the app repo's
`docs/PUBLIC_CLAIMS.md` (same-day paired docs PR is fine).

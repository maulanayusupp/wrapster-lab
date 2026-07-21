# TODO — Wrapster Lab

Next features & follow-ups. Keep this current: when you defer something or think
of an improvement, add it here (per the rules in `CLAUDE.md`).

## Content — replace placeholders with real assets
- [ ] **Real project photography.** The gallery is now image-ready: drop files
      into `public/gallery/` (see `public/gallery/README.md` for filenames) and
      they render over the gradient automatically (gradient stays as fallback).
      Source from the brand's IG (`@wrapster.project`) — IG can't be fetched
      programmatically (login-walled), download manually. The hero poster still
      uses cycling gradient words by design.
- [ ] **Real testimonials.** `content.service.ts > getTestimonials()` is
      placeholder copy — replace with genuine, consented customer quotes before
      production. Do not present invented reviews as real.
- [ ] **Real price list** section (their IG has a "PRICE LIST" post) — add a
      `PricingSection` + `getPricing()` in the service.
- [ ] Confirm exact address, WhatsApp number, and email in `app/app.config.ts`.
- [ ] Point `runtimeConfig.public.siteUrl` + i18n `baseUrl` at the real domain.

## Media generation (icons / OG)
- [ ] Icons are generated from `public/favicon.svg` via macOS tools:
      `qlmanage -t -s 512 -o . favicon.svg` then `sips -z <n> <n> …` for sizes,
      and `qlmanage -s 1200` + `sips -c 630 1200` for the OG image. If the mark
      changes, regenerate. Consider a proper `sharp`/`resvg` script for CI.
- [ ] Add a true multi-resolution `favicon.ico` (sips can't emit ICO).

## Features
- [ ] **Add locales** beyond EN/ID when needed (e.g. `su` Sundanese for Bandung
      area, `ar`, `zh`). Recipe in `CLAUDE.md > Multilingual`.
- [ ] Booking flow: replace the WhatsApp CTA with a real lead form + backend
      (validate, send to CRM/WA API). Keep the form component i18n-keyed.
- [ ] `@nuxtjs/sitemap` + `@nuxtjs/robots` for auto sitemap/hreflang sitemap.
- [ ] `@nuxt/image` for responsive, optimized gallery images.
- [ ] Individual build case-study pages (`/work/[slug]`) sourced from the service.
- [ ] Cookie/consent + analytics (respecting privacy).
- [ ] Instagram feed embed or periodic sync for the gallery.

## Polish — done ✓
- [x] Wow-factor pass: staggered hero entrance + gradient shimmer, `v-spotlight`
      cursor glow on cards, count-up stats, film-grain overlay, scroll-progress
      bar. All disabled under `prefers-reduced-motion`.
- [x] First-access branded intro overlay (once/session, flash-free).
- [x] Hero poster parallax (3D tilt on mouse + scroll drift).
- [x] Magnetic CTA buttons (`v-magnetic`).
- [x] Sunmori partner marquee (text wordmarks — replace with licensed logos if available).
- [x] Cinematic `v-reveal.wipe` clip-path reveal on section headings.

## Polish — next
- [ ] Add `@nuxt/fonts` to self-host Archivo/Inter (drop Google Fonts request,
      improves privacy + LCP).
- [ ] Lighthouse pass (a11y contrast on muted text, focus order, reduced-motion).
- [ ] Unit tests for `utils/format.ts`; component tests for `LanguageSwitcher`.
- [ ] ESLint + Prettier config (`npm run lint` script exists; add the deps/config).
- [ ] Upgrade local Node to 22 LTS to clear Nuxt 4.5 engine warnings.

## Known notes
- Dev server collides with other local Nuxt apps on :3000 — use `PORT=4321`.

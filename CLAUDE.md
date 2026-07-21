# CLAUDE.md — Wrapster Lab

Landing page for **Wrapster Lab** — premium motorcycle & car wrapping ("Stock to
Stunning"), Cimahi. Built with **Nuxt 4** + **Vue 3** + **pure SCSS** + **i18n (EN/ID)**.

> These rules are binding. Follow them exactly; they override default habits.
> When you add a rule or a convention, document it here. When you defer work or
> think of a next feature, add it to `todo.md`.

---

## Stack

| Concern       | Choice                                             |
| ------------- | -------------------------------------------------- |
| Framework     | Nuxt 4 (`app/` srcDir, auto-import)                |
| Language      | TypeScript everywhere (`<script setup lang="ts">`) |
| Styling       | SCSS only — design tokens + scoped component styles |
| i18n          | `@nuxtjs/i18n` v10, lazy JSON catalogs, EN default |
| Icons         | Inline SVG via `AppIcon.vue` (no icon dependency)  |
| Fonts         | Archivo (display) + Inter (body) via Google Fonts  |

Run: `npm run dev` · Build: `npm run build` · Preview: `npm run preview`
Node ≥ 20 (Nuxt 4.5 prefers Node 22+; dev/build work on 20 with engine warnings).

---

## Directory map (`app/`)

```
app/
  assets/scss/
    abstracts/   _variables · _mixins · _index  → auto-injected into every style
    base/        _reset · _root · _typography · _utilities
    main.scss    the ONLY globally-loaded stylesheet
  components/
    base/        AppIcon, BaseButton, BaseBadge, SectionHeading  (reusable primitives)
    layout/      AppHeader, AppFooter, LanguageSwitcher, TheLogo
    sections/    one component per landing section (Hero, Services, …)
  composables/   useAppSeo, useReveal            (helpers, auto-imported)
  plugins/       reveal.ts (v-reveal directive)
  services/      content.service.ts + types.ts   (the data boundary)
  utils/         constants.ts, format.ts         (pure helpers, auto-imported)
  layouts/       default.vue
  pages/         index.vue
  app.vue · error.vue · app.config.ts
i18n/locales/    en.json · id.json
public/          favicon.svg, icons, og-image, manifest, robots
```

Components auto-import **by filename only** (`components: [{ pathPrefix: false }]`),
so `sections/HeroSection.vue` is `<HeroSection>`. Keep filenames globally unique.

---

## The rules

### 1. No inline CSS — centralized SCSS
- **Never** write a `style="..."` attribute or a `:style` binding for static styling.
- All design values live as tokens in `abstracts/_variables.scss` (SCSS) mirrored
  to CSS custom properties in `base/_root.scss` (`var(--c-*)`). Never hardcode a
  hex, px, or duration in a component — reference a token or `var()`.
- Component styles go in a scoped `<style scoped lang="scss">` block. Variables &
  mixins are auto-injected (Vite `additionalData`), so **do not** `@use` abstracts
  inside components — just use `$token` / `@include mixin` directly.
- SCSS partials loaded through `main.scss` (the `base/*` files) DON'T get the
  auto-injection — they must `@use '../abstracts' as *;` at the top.
- Dynamic, runtime-driven values (e.g. a slider position, a swatch color) are the
  one exception: set them as a **CSS custom property via a `ref` in script**
  (`el.style.setProperty('--x', value)`), never as an inline style in the template.
  See `BeforeAfterSection.vue` / `ColorWallSection.vue` for the pattern.

### 2. Helpers & services
- **All data** comes from `services/content.service.ts`. Components never hold
  content arrays. To wire a real API later, change only the service bodies.
- Service returns **i18n keys**, not display strings (`titleKey`, not `title`).
  Components resolve them with `t(item.titleKey)`.
- Pure, reusable logic goes in `utils/` (auto-imported). Stateful/reactive logic
  goes in `composables/` (auto-imported). Keep components thin.

### 3. SEO
- Every page calls `useAppSeo({ title, description })` with **localized** strings.
  It emits title, OG, Twitter, canonical, hreflang alternates, and JSON-LD
  (`AutoBodyShop`). Don't hand-roll meta in pages.
- Global head defaults (icons, fonts, theme-color) live in `nuxt.config.ts`.

### 4. Multilingual (EN default, ID secondary)
- **Any** user-visible static text MUST be a key in BOTH `i18n/locales/en.json`
  and `id.json`. No hardcoded copy in templates. Adding/renaming text = update
  both catalogs in the same change.
- Keep the two files structurally identical (same key tree). EN is the source of
  truth; ID must never be left missing a key.
- Add a locale: add an entry in `nuxt.config.ts > i18n.locales` + a matching
  `i18n/locales/<code>.json`. The `LanguageSwitcher` picks it up automatically.
- Arrays (marquee, event benefits) are read with `tm()` + `rt()`.

### 5. Favicon / icons
- Source of truth is `public/favicon.svg` (gradient "W"). PNG sizes
  (`favicon-32`, `apple-touch-icon`, `icon-192/512`) + `og-image.png` are
  generated from the SVGs. Regenerate with the recipe in `todo.md` if the mark changes.

### 6. Maintainable & scalable
- One responsibility per file. Sections are self-contained and composed in
  `pages/index.vue` in narrative order.
- BEM-ish class names inside scoped styles (`.card`, `.card__title`, `.card--featured`).
- Prefer tokens + mixins over repetition. Add a mixin when a pattern repeats 3×.
- TypeScript types for all service data live in `services/types.ts`.

### 7. UI/UX
- Dark, neon "lab" theme; signature gradient = orange→magenta→purple→blue.
- Respect `prefers-reduced-motion` (reveal + reset already do).
- Content is visible without JS; `v-reveal` is progressive enhancement only
  (adds `.reveal-on` to `<html>` before hiding-then-animating).
- Everything responsive via fluid `clamp()` type and mixin breakpoints
  (`@include respond(md)`). Mobile drawer nav below `lg`.

---

## Verifying UI
Dev server may collide with other local Nuxt apps on :3000 — run on a dedicated
port: `PORT=4321 npm run dev`. Screenshot with headless Chrome; note that
`100svh`/`flex:1` inflate to the capture window height, so use a realistic
viewport (e.g. 1440×900) and don't trust full-page tall captures for layout.

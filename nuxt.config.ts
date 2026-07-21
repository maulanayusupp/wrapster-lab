import { fileURLToPath } from 'node:url'

// Absolute path to the SCSS abstracts barrel so `additionalData` resolves
// reliably across platforms (variables/mixins/functions only — zero CSS output).
const scssAbstracts = fileURLToPath(
  new URL('./app/assets/scss/abstracts/_index.scss', import.meta.url),
)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Centralized global stylesheet (single source of truth for base + tokens).
  css: ['~/assets/scss/main.scss'],

  // Auto-import components by filename only (no directory prefix) so
  // subfolders stay organizational while names stay short: <AppIcon>, <HeroSection>.
  components: [{ path: '~/components', pathPrefix: false }],

  modules: ['@nuxtjs/i18n'],

  // ---------------------------------------------------------------------------
  // Runtime config — put deploy-time values here, never hardcode in components.
  // ---------------------------------------------------------------------------
  runtimeConfig: {
    public: {
      // No custom domain yet — deployed on Vercel. Override at deploy time with
      // NUXT_PUBLIC_SITE_URL when a real domain is connected.
      siteUrl: 'https://wrapster-lab.vercel.app',
      siteName: 'Wrapster Lab',
      contactPhone: '+6281111198694',
      instagram: 'https://www.instagram.com/wrapster.lab',
      linktree: 'https://linktr.ee/wrapsterlab',
    },
  },

  // ---------------------------------------------------------------------------
  // Global <head> defaults. Per-page SEO is layered on top via useAppSeo().
  // ---------------------------------------------------------------------------
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400..900;1,600..900&family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
      meta: [
        { name: 'theme-color', content: '#070912' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      script: [
        {
          // Runs before first paint: skip the intro overlay (flash-free) for
          // repeat visitors this session or when reduced motion is preferred.
          key: 'intro-skip',
          tagPosition: 'head',
          innerHTML:
            "try{if(sessionStorage.getItem('wl_intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-skip')}}catch(e){}",
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // i18n — EN default, ID secondary. Lazy-loaded JSON message catalogs.
  // Add a new locale = add a { } entry here + a matching file in i18n/locales.
  // ---------------------------------------------------------------------------
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    langDir: 'locales',
    lazy: true,
    baseUrl: 'https://wrapster-lab.vercel.app',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json', dir: 'ltr' },
      { code: 'id', language: 'id-ID', name: 'Bahasa Indonesia', file: 'id.json', dir: 'ltr' },
    ],
    // English is always the default. No browser-language auto-redirect —
    // visitors land on EN and opt into ID via the language switcher.
    detectBrowserLanguage: false,
  },

  // ---------------------------------------------------------------------------
  // SCSS: inject abstracts (tokens/mixins) into every component + <style> block
  // so no file needs a manual @use, and NO inline styles are ever required.
  // ---------------------------------------------------------------------------
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "${scssAbstracts}" as *;\n`,
        },
      },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/id'],
    },
  },
})

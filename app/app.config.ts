/**
 * Runtime-editable brand config (safe to expose to the client).
 * Central place for identity + non-secret contact channels used across the UI.
 * Deploy-time / environment values belong in `runtimeConfig` (nuxt.config.ts).
 */
export default defineAppConfig({
  brand: {
    name: 'Wrapster Lab',
    tagline: 'Stock to Stunning',
    logoWord: 'Wrapster',
    logoSuffix: '.lab',
  },
  contact: {
    phoneDisplay: '0811 1119 8694',
    phoneIntl: '+6281111198694',
    whatsapp: 'https://wa.me/6281111198694',
    email: 'hello@wrapster.lab',
    address: 'Jl. Gunung Batu No.183, Cimahi, West Java, Indonesia',
    mapsQuery: 'Wrapster Lab Cimahi',
  },
  social: {
    instagram: 'https://www.instagram.com/wrapster.lab',
    instagramHandle: '@wrapster.lab',
    portfolio: 'https://www.instagram.com/wrapster.project',
    catalogue: 'https://www.instagram.com/wrapster.print.catalogue',
    linktree: 'https://linktr.ee/wrapsterlab',
  },
})

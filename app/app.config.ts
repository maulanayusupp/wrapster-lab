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
    // Direct Google Maps place link (ephemeral tracking params stripped).
    maps: 'https://www.google.com/maps/place/WRAPSTER/@-6.8872372,107.5646325,945m/data=!3m2!1e3!4b1!4m6!3m5!1s0x2e68e52a2a510bb7:0xd9c627805fe50a44!8m2!3d-6.8872372!4d107.5672074!16s%2Fg%2F11y446vfd0',
    geo: { lat: -6.8872372, lng: 107.5672074 },
  },
  social: {
    instagram: 'https://www.instagram.com/wrapster.lab',
    instagramHandle: '@wrapster.lab',
    portfolio: 'https://www.instagram.com/wrapster.project',
    catalogue: 'https://www.instagram.com/wrapster.print.catalogue',
    linktree: 'https://linktr.ee/wrapsterlab',
  },
})

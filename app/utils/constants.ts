/**
 * App-wide constants. Import from here instead of scattering magic strings.
 * `utils/` is auto-imported by Nuxt, so these are available everywhere.
 */

/** Anchor ids used for in-page navigation + smooth scroll. */
export const SECTION_IDS = {
  hero: 'top',
  services: 'services',
  work: 'work',
  process: 'process',
  colors: 'colors',
  features: 'why',
  event: 'community',
  contact: 'contact',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

/** Primary nav links (label = i18n key, target = anchor id). */
export const NAV_LINKS = [
  { key: 'nav.services', target: SECTION_IDS.services },
  { key: 'nav.work', target: SECTION_IDS.work },
  { key: 'nav.process', target: SECTION_IDS.process },
  { key: 'nav.why', target: SECTION_IDS.features },
  { key: 'nav.community', target: SECTION_IDS.event },
] as const

export const SUPPORTED_LOCALES = ['en', 'id'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

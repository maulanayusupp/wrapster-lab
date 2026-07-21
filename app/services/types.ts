/**
 * Domain models for Wrapster Lab content.
 *
 * The `*Key` string fields are i18n message keys (not display strings) so the
 * service layer stays locale-agnostic — components resolve them with `t()`.
 * When a real CMS/API is wired in, only content.service.ts changes; components
 * and types stay stable.
 */

export interface WrapService {
  id: string
  icon: string
  titleKey: string
  descKey: string
  featured?: boolean
}

export interface ProcessStep {
  id: string
  step: number
  titleKey: string
  descKey: string
}

export interface Feature {
  id: string
  icon: string
  titleKey: string
  descKey: string
}

export interface Stat {
  id: string
  value: string
  labelKey: string
}

export interface GalleryItem {
  id: string
  /** Vehicle / model name rendered as the poster word. */
  model: string
  brand: string
  categoryKey: string
  /** Preset gradient theme — the fallback poster background when no photo. */
  theme: GalleryTheme
  /**
   * Optional real photo (e.g. '/gallery/xmax.jpg'). When present it renders on
   * top of the gradient; if the file is missing/broken the gradient shows
   * through automatically. Drop portfolio images in `public/gallery/`.
   */
  image?: string
}

export type GalleryTheme = 'heat' | 'cool' | 'electric' | 'toxic' | 'sunset' | 'mono'

export type ShowcaseCategory = 'concept' | 'street' | 'race' | 'adventure'

export interface ShowcaseBuild {
  id: string
  /** Vehicle / model name rendered as the poster word. */
  model: string
  brand: string
  /** Creative build/concept name (placeholder copy for now). */
  concept: string
  category: ShowcaseCategory
  categoryKey: string
  theme: GalleryTheme
  finishKey: string
  year: string
  featured?: boolean
}

export interface ColorSwatch {
  id: string
  nameKey: string
  hex: string
  finishKey: string
}

export interface Testimonial {
  id: string
  author: string
  handle: string
  quoteKey: string
  vehicle: string
}

export interface CommunityEvent {
  id: string
  titleKey: string
  descKey: string
  date: string // ISO 8601
  location: string
  routeKey: string
}

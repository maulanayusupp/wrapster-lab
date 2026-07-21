/**
 * Content service — the single boundary between the UI and its data source.
 *
 * Today it returns curated static data. Tomorrow, swap the bodies for `$fetch`
 * calls to a CMS/API and NOTHING in the components has to change. Keep all
 * data-shaping logic here, never in components.
 *
 * NOTE: testimonials use placeholder copy — replace with real, consented
 * customer quotes before production (see todo.md).
 */
import type {
  ColorSwatch,
  CommunityEvent,
  Feature,
  GalleryItem,
  ProcessStep,
  Stat,
  Testimonial,
  WrapService,
} from './types'

export const contentService = {
  getServices(): WrapService[] {
    return [
      { id: 'full-print', icon: 'printer', titleKey: 'services.items.fullPrint.title', descKey: 'services.items.fullPrint.desc', featured: true },
      { id: 'body-only', icon: 'panels', titleKey: 'services.items.bodyOnly.title', descKey: 'services.items.bodyOnly.desc' },
      { id: 'car-wrap', icon: 'car', titleKey: 'services.items.carWrap.title', descKey: 'services.items.carWrap.desc' },
      { id: 'concept', icon: 'palette', titleKey: 'services.items.concept.title', descKey: 'services.items.concept.desc', featured: true },
      { id: 'color-change', icon: 'droplet', titleKey: 'services.items.colorChange.title', descKey: 'services.items.colorChange.desc' },
      { id: 'ship', icon: 'ship', titleKey: 'services.items.ship.title', descKey: 'services.items.ship.desc' },
    ]
  },

  getProcess(): ProcessStep[] {
    return [
      { id: 'consult', step: 1, titleKey: 'process.steps.consult.title', descKey: 'process.steps.consult.desc' },
      { id: 'design', step: 2, titleKey: 'process.steps.design.title', descKey: 'process.steps.design.desc' },
      { id: 'wrap', step: 3, titleKey: 'process.steps.wrap.title', descKey: 'process.steps.wrap.desc' },
      { id: 'qc', step: 4, titleKey: 'process.steps.qc.title', descKey: 'process.steps.qc.desc' },
      { id: 'ride', step: 5, titleKey: 'process.steps.ride.title', descKey: 'process.steps.ride.desc' },
    ]
  },

  getFeatures(): Feature[] {
    return [
      { id: 'material', icon: 'shield', titleKey: 'features.items.material.title', descKey: 'features.items.material.desc' },
      { id: 'warranty', icon: 'badge', titleKey: 'features.items.warranty.title', descKey: 'features.items.warranty.desc' },
      { id: 'qc', icon: 'check', titleKey: 'features.items.qc.title', descKey: 'features.items.qc.desc' },
      { id: 'nationwide', icon: 'globe', titleKey: 'features.items.nationwide.title', descKey: 'features.items.nationwide.desc' },
      { id: 'team', icon: 'spark', titleKey: 'features.items.team.title', descKey: 'features.items.team.desc' },
      { id: 'custom', icon: 'infinity', titleKey: 'features.items.custom.title', descKey: 'features.items.custom.desc' },
    ]
  },

  getStats(): Stat[] {
    return [
      { id: 'followers', value: '36.8K', labelKey: 'stats.followers' },
      { id: 'projects', value: '320+', labelKey: 'stats.projects' },
      { id: 'colors', value: '80+', labelKey: 'stats.colors' },
      { id: 'warranty', value: '7', labelKey: 'stats.warranty' },
    ]
  },

  getGallery(): GalleryItem[] {
    return [
      { id: 'xmax-ppg', model: 'XMAX', brand: 'Yamaha', categoryKey: 'gallery.cat.concept', theme: 'sunset' },
      { id: 'nmax', model: 'NMAX', brand: 'Yamaha', categoryKey: 'gallery.cat.street', theme: 'heat' },
      { id: 'aerox', model: 'AEROX', brand: 'Yamaha', categoryKey: 'gallery.cat.race', theme: 'electric' },
      { id: 'klx', model: 'KLX', brand: 'Kawasaki', categoryKey: 'gallery.cat.adventure', theme: 'toxic' },
      { id: 'xride', model: 'X-RIDE', brand: 'Yamaha', categoryKey: 'gallery.cat.street', theme: 'cool' },
      { id: 'bigbike', model: 'BIG BIKE', brand: 'Superbike', categoryKey: 'gallery.cat.race', theme: 'mono' },
    ]
  },

  getColorWall(): ColorSwatch[] {
    return [
      { id: 'inferno', nameKey: 'colors.names.inferno', hex: '#ff5a1f', finishKey: 'colors.finish.gloss' },
      { id: 'magma', nameKey: 'colors.names.magma', hex: '#ff2d78', finishKey: 'colors.finish.satin' },
      { id: 'ultra', nameKey: 'colors.names.ultra', hex: '#7c3aed', finishKey: 'colors.finish.gloss' },
      { id: 'nebula', nameKey: 'colors.names.nebula', hex: '#a855f7', finishKey: 'colors.finish.matte' },
      { id: 'voltage', nameKey: 'colors.names.voltage', hex: '#2b6bff', finishKey: 'colors.finish.gloss' },
      { id: 'cyber', nameKey: 'colors.names.cyber', hex: '#22d3ee', finishKey: 'colors.finish.chrome' },
      { id: 'toxic', nameKey: 'colors.names.toxic', hex: '#a3e635', finishKey: 'colors.finish.matte' },
      { id: 'gold', nameKey: 'colors.names.gold', hex: '#f5c542', finishKey: 'colors.finish.chrome' },
      { id: 'phantom', nameKey: 'colors.names.phantom', hex: '#1c1f33', finishKey: 'colors.finish.satin' },
      { id: 'frost', nameKey: 'colors.names.frost', hex: '#e2e8f0', finishKey: 'colors.finish.matte' },
    ]
  },

  getTestimonials(): Testimonial[] {
    return [
      { id: 't1', author: 'Rangga P.', handle: '@rangga.rides', quoteKey: 'testimonials.items.t1', vehicle: 'Yamaha NMAX' },
      { id: 't2', author: 'Dinda A.', handle: '@dinda.moto', quoteKey: 'testimonials.items.t2', vehicle: 'Yamaha XMAX' },
      { id: 't3', author: 'Bagas W.', handle: '@bagaswrap', quoteKey: 'testimonials.items.t3', vehicle: 'Kawasaki KLX' },
    ]
  },

  getEvent(): CommunityEvent {
    return {
      id: 'sunmori-2026-07',
      titleKey: 'event.title',
      descKey: 'event.desc',
      date: '2026-07-19',
      location: 'Tracker Martadinata → KFC Sukawangi, Bandung',
      routeKey: 'event.route',
    }
  },
}

export type ContentService = typeof contentService

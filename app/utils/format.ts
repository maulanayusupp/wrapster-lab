/**
 * Pure formatting helpers. No side effects — easy to unit test.
 */

/** Format an ISO date string for a given locale. */
export function formatDate(iso: string, locale = 'en'): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/** Build a WhatsApp deep link with a prefilled message. */
export function whatsappLink(phoneIntl: string, message = ''): string {
  const digits = phoneIntl.replace(/[^\d]/g, '')
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${digits}${text}`
}

/** Build a Google Maps search link. */
export function mapsLink(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

/** Two-letter uppercase code for compact locale toggles. */
export function localeShort(code: string): string {
  return code.slice(0, 2).toUpperCase()
}

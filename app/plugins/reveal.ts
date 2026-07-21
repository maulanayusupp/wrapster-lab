/**
 * Registers the `v-reveal` directive (universal registration so SSR can
 * resolve it; the actual work runs only in the client `mounted` hook).
 *
 * Usage: `<div v-reveal>` or `<div v-reveal="120">` (delay in ms).
 * Pairs with the `.reveal` / `.is-visible` classes in base/_utilities.scss.
 * Falls back to instantly-visible when reduced motion is requested or when
 * IntersectionObserver is unavailable.
 */
type RevealEl = HTMLElement & { _revealObserver?: IntersectionObserver }

export default defineNuxtPlugin((nuxtApp) => {
  const supported = typeof IntersectionObserver !== 'undefined'
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Opt in to the "hide then animate" behavior only when we can actually
  // animate — otherwise content simply stays visible (see _utilities.scss).
  if (supported && !prefersReduced) {
    document.documentElement.classList.add('reveal-on')
  }

  nuxtApp.vueApp.directive('reveal', {
    // Runs client-side only — safe to touch window/IntersectionObserver here.
    mounted(el: RevealEl, binding) {
      el.classList.add('reveal')

      const delay = Number(binding.value) || 0
      if (delay) el.style.transitionDelay = `${delay}ms`

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced || typeof IntersectionObserver === 'undefined') {
        el.classList.add('is-visible')
        return
      }

      const observer = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              obs.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.12 },
      )
      observer.observe(el)
      el._revealObserver = observer
    },
    unmounted(el: RevealEl) {
      el._revealObserver?.disconnect()
    },
    // No SSR-rendered attributes needed; declaring this keeps SSR quiet.
    getSSRProps() {
      return {}
    },
  })
})

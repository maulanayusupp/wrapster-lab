/**
 * Registers `v-parallax` — scroll-linked vertical drift for decorative layers.
 *
 * Translates the element opposite to its distance from viewport centre, scaled
 * by `v-parallax="0.15"` (speed). rAF-throttled, universal (SSR-safe), and
 * disabled under reduced motion. Use on decorative/absolute elements only —
 * not on content that must stay in normal flow.
 */
type ParallaxEl = HTMLElement & { _plx?: () => void }

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('parallax', {
    mounted(el: ParallaxEl, binding) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const speed = Number(binding.value) || 0.15
      let ticking = false

      const update = () => {
        const rect = el.getBoundingClientRect()
        const dist = rect.top + rect.height / 2 - window.innerHeight / 2
        el.style.transform = `translate3d(0, ${(-dist * speed).toFixed(1)}px, 0)`
        ticking = false
      }
      const onScroll = () => {
        if (!ticking) {
          ticking = true
          requestAnimationFrame(update)
        }
      }

      el.style.willChange = 'transform'
      window.addEventListener('scroll', onScroll, { passive: true })
      update()
      el._plx = () => window.removeEventListener('scroll', onScroll)
    },
    unmounted(el: ParallaxEl) {
      el._plx?.()
    },
    getSSRProps() {
      return {}
    },
  })
})

/**
 * Registers `v-spotlight` — a cursor-following radial glow on cards.
 *
 * On pointer move it writes `--mx`/`--my` (px, element-relative) and toggles
 * `.is-lit`; the `.spotlight-layer` element it injects renders the glow (styled
 * globally in base/_utilities.scss). The host needs `position: relative` +
 * `overflow: hidden` (the glow clips to the card's rounded corners).
 *
 * Universal registration (SSR-safe); all work happens client-side in `mounted`.
 * Disabled under reduced-motion and on coarse (touch) pointers.
 */
type SpotEl = HTMLElement & {
  _spot?: { move: (e: PointerEvent) => void; enter: () => void; leave: () => void }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('spotlight', {
    mounted(el: SpotEl) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const coarse = window.matchMedia('(pointer: coarse)').matches
      if (reduced || coarse) return

      const layer = document.createElement('span')
      layer.className = 'spotlight-layer'
      layer.setAttribute('aria-hidden', 'true')
      el.appendChild(layer)

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
      }
      const enter = () => el.classList.add('is-lit')
      const leave = () => el.classList.remove('is-lit')

      el.addEventListener('pointermove', move)
      el.addEventListener('pointerenter', enter)
      el.addEventListener('pointerleave', leave)
      el._spot = { move, enter, leave }
    },
    unmounted(el: SpotEl) {
      if (!el._spot) return
      el.removeEventListener('pointermove', el._spot.move)
      el.removeEventListener('pointerenter', el._spot.enter)
      el.removeEventListener('pointerleave', el._spot.leave)
    },
    getSSRProps() {
      return {}
    },
  })
})

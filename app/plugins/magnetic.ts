/**
 * Registers `v-magnetic` — a button that subtly follows the cursor.
 *
 * Writes `--mag-x`/`--mag-y` (px, clamped) which BaseButton consumes via the CSS
 * `translate` property (composes with its `transform` scale). `v-magnetic="0.3"`
 * sets pull strength. Universal registration; work is client-only and disabled
 * under reduced motion / coarse (touch) pointers.
 */
type MagEl = HTMLElement & {
  _mag?: { move: (e: PointerEvent) => void; leave: () => void }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('magnetic', {
    mounted(el: MagEl, binding) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const coarse = window.matchMedia('(pointer: coarse)').matches
      if (reduced || coarse) return

      const strength = Number(binding.value) || 0.3
      const cap = 12
      const clamp = (v: number) => Math.max(-cap, Math.min(cap, v))

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        const x = clamp((e.clientX - (r.left + r.width / 2)) * strength)
        const y = clamp((e.clientY - (r.top + r.height / 2)) * strength)
        el.style.setProperty('--mag-x', `${x}px`)
        el.style.setProperty('--mag-y', `${y}px`)
      }
      const leave = () => {
        el.style.setProperty('--mag-x', '0px')
        el.style.setProperty('--mag-y', '0px')
      }

      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      el._mag = { move, leave }
    },
    unmounted(el: MagEl) {
      if (!el._mag) return
      el.removeEventListener('pointermove', el._mag.move)
      el.removeEventListener('pointerleave', el._mag.leave)
    },
    getSSRProps() {
      return {}
    },
  })
})

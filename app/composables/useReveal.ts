/**
 * useReveal — lightweight scroll-into-view animation via IntersectionObserver.
 *
 * Returns a `target` ref to attach to any element. Adds `.is-visible` (see the
 * `.reveal` utility in base/_utilities.scss) once the element enters the
 * viewport. SSR-safe and respects prefers-reduced-motion.
 */
export function useReveal(options: { threshold?: number; once?: boolean } = {}) {
  const { threshold = 0.15, once = true } = options
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  onMounted(() => {
    if (!target.value) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      isVisible.value = true
      target.value.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            isVisible.value = true
            entry.target.classList.add('is-visible')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            isVisible.value = false
            entry.target.classList.remove('is-visible')
          }
        }
      },
      { threshold },
    )

    observer.observe(target.value)
    onBeforeUnmount(() => observer.disconnect())
  })

  return { target, isVisible }
}

<script setup lang="ts">
/** StatsSection — social-proof band with numbers that count up on scroll-in. */
import { contentService } from '~/services/content.service'

const { t } = useI18n()
const stats = contentService.getStats()

/** Split a display value like "36.8K" into number, suffix, and decimals. */
function parse(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/)
  const target = match ? parseFloat(match[1]!) : 0
  const suffix = match ? match[2]! : value
  const decimals = match?.[1]?.includes('.') ? (match[1]!.split('.')[1]?.length ?? 0) : 0
  return { target, suffix, decimals }
}

const parsed = stats.map((s) => ({ ...s, ...parse(s.value) }))
const finalValue = (p: (typeof parsed)[number]) => p.target.toFixed(p.decimals)

// Baseline = the REAL numbers, so SSR / no-JS / reduced-motion always show them.
// The count-up is a pure enhancement that resets to 0 and ticks up on scroll-in.
const display = reactive(parsed.map(finalValue))
const root = ref<HTMLElement | null>(null)

function animate() {
  parsed.forEach((p, i) => {
    const duration = 1500
    const start = performance.now()
    const tick = (now: number) => {
      const t2 = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t2, 3) // easeOutCubic
      display[i] = (p.target * eased).toFixed(p.decimals)
      if (t2 < 1) requestAnimationFrame(tick)
      else display[i] = finalValue(p)
    }
    requestAnimationFrame(tick)
  })
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !root.value || typeof IntersectionObserver === 'undefined') return

  parsed.forEach((p, i) => (display[i] = (0).toFixed(p.decimals)))
  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          animate()
          obs.disconnect()
        }
      }
    },
    { threshold: 0.4 },
  )
  observer.observe(root.value)
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <section class="stats">
    <div class="u-container">
      <div ref="root" class="stats__grid">
        <div v-for="(stat, i) in parsed" :key="stat.id" v-reveal="i * 70" class="stat">
          <span class="stat__value u-display u-gradient-text">{{ display[i] }}{{ stat.suffix }}</span>
          <span class="stat__label">{{ t(stat.labelKey) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.stats {
  padding-block: $space-2xl;

  &__grid {
    display: grid;
    gap: $space-lg;
    grid-template-columns: repeat(2, 1fr);
    padding: $space-xl;
    border-radius: $radius-xl;
    @include glass(0.5);
    @include gradient-border($radius-xl, 1px);

    @include respond(md) { grid-template-columns: repeat(4, 1fr); }
  }
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $space-2xs;

  &__value {
    font-size: clamp(2.4rem, 6vw, 3.6rem);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  &__label {
    font-size: $fs-sm;
    color: var(--c-text-mist);
  }
}
</style>

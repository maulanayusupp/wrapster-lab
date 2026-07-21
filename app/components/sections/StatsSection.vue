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
// Start every counter at zero; the observer animates them to target on scroll-in.
const display = reactive(parsed.map(() => '0'))
const root = ref<HTMLElement | null>(null)

function animate() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  parsed.forEach((p, i) => {
    if (reduced) {
      display[i] = p.target.toFixed(p.decimals)
      return
    }
    const duration = 1500
    const start = performance.now()
    const tick = (now: number) => {
      const t2 = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t2, 3) // easeOutCubic
      display[i] = (p.target * eased).toFixed(p.decimals)
      if (t2 < 1) requestAnimationFrame(tick)
      else display[i] = p.target.toFixed(p.decimals)
    }
    requestAnimationFrame(tick)
  })
}

onMounted(() => {
  if (!root.value || typeof IntersectionObserver === 'undefined') {
    parsed.forEach((p, i) => (display[i] = p.target.toFixed(p.decimals)))
    return
  }
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

<script setup lang="ts">
/**
 * MarqueeStrip — infinite scrolling keyword band between sections.
 * Reads the localized keyword list via i18n `tm()` (array messages).
 */
const { tm, rt } = useI18n()

const items = computed(() => (tm('marquee.items') as unknown[]).map((m) => rt(m as string)))
// Duplicate the list so the CSS loop is seamless.
const loop = computed(() => [...items.value, ...items.value])
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <span v-for="(item, i) in loop" :key="i" class="marquee__item">
        {{ item }}
        <span class="marquee__star">✦</span>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.marquee {
  position: relative;
  overflow: hidden;
  padding-block: $space-md;
  border-block: 1px solid var(--c-line);
  background: linear-gradient(90deg, rgba(124, 58, 237, 0.06), rgba(43, 107, 255, 0.06));
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);

  &__track {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    animation: marquee 28s linear infinite;
  }

  &:hover &__track {
    animation-play-state: paused;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    gap: $space-lg;
    padding-inline: $space-lg;
    font-family: $font-display;
    font-weight: $fw-black;
    font-size: clamp(1.1rem, 2.4vw, 1.8rem);
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: var(--c-text);
  }

  &__star {
    @include gradient-text($gradient-brand);
    font-size: 0.7em;
  }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>

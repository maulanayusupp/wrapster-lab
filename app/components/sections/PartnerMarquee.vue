<script setup lang="ts">
/**
 * PartnerMarquee — a scrolling row of Sunmori event partner wordmarks.
 * Names are plain text (factual event attribution, not logo artwork).
 */
import { contentService } from '~/services/content.service'

const { t } = useI18n()
const partners = contentService.getPartners()
// Duplicate for a seamless loop.
const loop = computed(() => [...partners, ...partners])
</script>

<template>
  <div class="partners">
    <p v-reveal class="partners__label">{{ t('event.partners') }}</p>
    <div class="partners__viewport" aria-hidden="true">
      <div class="partners__track">
        <span v-for="(name, i) in loop" :key="i" class="partners__chip">{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.partners {
  margin-top: $space-2xl;
  display: flex;
  flex-direction: column;
  gap: $space-lg;

  &__label {
    text-align: center;
    font-size: $fs-xs;
    font-weight: $fw-semibold;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--c-text-muted);
  }

  &__viewport {
    overflow: hidden;
    mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  }

  &__track {
    display: inline-flex;
    align-items: center;
    gap: $space-md;
    white-space: nowrap;
    animation: partners-scroll 30s linear infinite;
  }

  &:hover &__track {
    animation-play-state: paused;
  }

  &__chip {
    display: inline-flex;
    align-items: center;
    padding: 0.7rem 1.4rem;
    border-radius: $radius-pill;
    font-family: $font-display;
    font-weight: $fw-bold;
    font-size: 1.15rem;
    letter-spacing: 0.01em;
    color: var(--c-text-mist);
    border: 1px solid var(--c-line);
    background: rgba(255, 255, 255, 0.02);
    transition: color $dur-base, border-color $dur-base, background $dur-base;

    &:hover {
      color: $color-white;
      border-color: rgba(47, 92, 255, 0.5);
      background: rgba(47, 92, 255, 0.08);
    }
  }
}

@keyframes partners-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .partners__track { animation: none; flex-wrap: wrap; white-space: normal; justify-content: center; }
}
</style>

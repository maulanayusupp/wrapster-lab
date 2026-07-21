<script setup lang="ts">
/**
 * ShowcaseCard — a poster-style build tile (CSS gradient placeholder, no photo).
 * Emits `open` with the build when clicked so the page can show the detail modal.
 */
import type { ShowcaseBuild } from '~/services/types'

defineProps<{ build: ShowcaseBuild }>()
defineEmits<{ open: [build: ShowcaseBuild] }>()

const { t } = useI18n()
</script>

<template>
  <button
    type="button"
    class="scard"
    :class="`scard--${build.theme}`"
    @click="$emit('open', build)"
  >
    <span class="scard__stripe" aria-hidden="true" />
    <span class="scard__overlay" aria-hidden="true" />

    <span class="scard__top">
      <span class="scard__brand">{{ build.brand }}</span>
      <span class="scard__cat">{{ t(build.categoryKey) }}</span>
    </span>

    <span class="scard__body">
      <span class="scard__concept">{{ build.concept }}</span>
      <span class="scard__model u-display">{{ build.model }}</span>
    </span>

    <span class="scard__view">
      {{ t('showcase.view') }}
      <AppIcon name="arrow-right" :size="16" />
    </span>
  </button>
</template>

<style scoped lang="scss">
.scard {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  aspect-ratio: 4 / 5;
  width: 100%;
  padding: $space-lg;
  border-radius: $radius-lg;
  overflow: hidden;
  color: $color-white;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.08);
  @include card-depth;
  transition: transform $dur-base $ease-out, box-shadow $dur-base;

  &:hover {
    transform: translateY(-6px);
    @include card-depth-hover;
    .scard__stripe { transform: skewX(-16deg) translateX(8px); }
    .scard__model { transform: translateY(-2px); }
    .scard__view { opacity: 1; transform: translateY(0); }
    .scard__overlay { opacity: 1; }
  }
  &:focus-visible { @include focus-ring; }

  &__stripe {
    position: absolute;
    top: -20%;
    right: 20%;
    width: 14px;
    height: 140%;
    background: rgba(255, 255, 255, 0.18);
    transform: skewX(-16deg);
    transition: transform $dur-base $ease-out;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    opacity: 0.85;
    background:
      radial-gradient(circle at 78% 12%, rgba(255, 255, 255, 0.22), transparent 45%),
      linear-gradient(180deg, transparent 30%, rgba(5, 6, 13, 0.78));
    transition: opacity $dur-base $ease-out;
  }

  &__top {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: $space-sm;
  }

  &__brand {
    font-size: $fs-xs;
    font-weight: $fw-bold;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    opacity: 0.9;
  }

  &__cat {
    padding: 0.28rem 0.65rem;
    border-radius: $radius-pill;
    font-size: $fs-xs;
    font-weight: $fw-semibold;
    background: rgba(5, 6, 13, 0.5);
    backdrop-filter: blur(6px);
  }

  &__body {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  &__concept {
    font-size: $fs-sm;
    font-weight: $fw-semibold;
    color: rgba(255, 255, 255, 0.85);
  }

  &__model {
    font-size: clamp(2rem, 3.5vw, 3rem);
    line-height: 0.85;
    text-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    transition: transform $dur-base $ease-out;
  }

  &__view {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: $space-2xs;
    margin-top: $space-md;
    font-size: $fs-sm;
    font-weight: $fw-bold;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity $dur-base $ease-out, transform $dur-base $ease-out;
  }

  // Theme gradients (match GalleryTheme).
  &--heat    { background: linear-gradient(150deg, #ff5a1f, #ff2d78); }
  &--cool    { background: linear-gradient(150deg, #2f5cff, #22d3ee); }
  &--electric{ background: linear-gradient(150deg, #22d3ee, #2b6bff); }
  &--toxic   { background: linear-gradient(150deg, #a3e635, #16a34a); }
  &--sunset  { background: linear-gradient(150deg, #ff5a1f, #7c3aed); }
  &--mono    { background: linear-gradient(150deg, #2a2f45, #05060d); }
}

@media (prefers-reduced-motion: reduce) {
  .scard__view { opacity: 1; transform: none; }
}
</style>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()
function goHome() {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <div class="err">
    <div class="err__blob" aria-hidden="true" />
    <div class="err__inner">
      <span class="err__code u-display u-gradient-text">{{ error.statusCode || 500 }}</span>
      <h1 class="err__title u-display">{{ t('error.title') }}</h1>
      <p class="err__msg">{{ error.message || t('error.message') }}</p>
      <BaseButton size="lg" @click="goHome">
        {{ t('error.cta') }}
        <template #icon><AppIcon name="arrow-right" :size="20" /></template>
      </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.err {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100svh;
  padding: $container-pad;
  overflow: hidden;
  text-align: center;

  &__blob {
    position: absolute;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, rgba(255, 45, 120, 0.25), transparent 70%);
    filter: blur(60px);
  }

  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-md;
  }

  &__code { font-size: clamp(5rem, 20vw, 12rem); line-height: 0.8; }
  &__title { font-size: $fs-h2; }
  &__msg { color: var(--c-text-mist); max-width: 32rem; }
}
</style>

<script setup lang="ts">
/** TheLogo — wordmark with the signature gradient "W" tile. */
const appConfig = useAppConfig()
</script>

<template>
  <span class="logo" aria-label="Wrapster Lab">
    <span class="logo__mark" aria-hidden="true">W</span>
    <span class="logo__word">
      {{ appConfig.brand.logoWord }}<span class="logo__suffix">{{ appConfig.brand.logoSuffix }}</span>
    </span>
  </span>
</template>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  align-items: center;
  gap: $space-xs;

  &__mark {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 9px;
    font-family: $font-display;
    font-weight: $fw-black;
    font-size: 1.25rem;
    color: $color-white;
    background: $gradient-brand;
    box-shadow: 0 4px 16px rgba(47, 92, 255, 0.4);
    transform: skewX(-6deg);
  }

  &__word {
    font-family: $font-display;
    font-weight: $fw-black;
    font-size: 1.25rem;
    letter-spacing: -0.02em;
    color: $color-white;
  }

  &__suffix {
    @include gradient-text($gradient-heat);
  }
}
</style>

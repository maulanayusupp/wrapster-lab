<script setup lang="ts">
/** BaseBadge — small pill label with an optional pulsing dot. */
interface Props {
  dot?: boolean
}
withDefaults(defineProps<Props>(), { dot: false })
</script>

<template>
  <span class="badge">
    <span v-if="dot" class="badge__dot" aria-hidden="true" />
    <slot />
  </span>
</template>

<style scoped lang="scss">
.badge {
  display: inline-flex;
  align-items: center;
  gap: $space-xs;
  padding: 0.5rem 0.95rem;
  border-radius: $radius-pill;
  font-size: $fs-xs;
  font-weight: $fw-semibold;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-text-mist);
  @include glass(0.4);

  &__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: $color-orange;
    box-shadow: 0 0 0 0 rgba(255, 106, 43, 0.6);
    animation: badge-pulse 2s infinite;
  }
}

@keyframes badge-pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 106, 43, 0.55); }
  70% { box-shadow: 0 0 0 8px rgba(255, 106, 43, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 106, 43, 0); }
}
</style>

<script setup lang="ts">
/** SectionHeading — consistent kicker + title + lead block for every section. */
interface Props {
  kicker?: string
  title: string
  lead?: string
  align?: 'left' | 'center'
}
withDefaults(defineProps<Props>(), { align: 'left' })
</script>

<template>
  <header class="heading" :class="`heading--${align}`">
    <span v-if="kicker" v-reveal class="u-kicker heading__kicker">
      <span class="heading__kicker-line" aria-hidden="true" />
      {{ kicker }}
    </span>
    <h2 v-reveal="80" class="heading__title">{{ title }}</h2>
    <p v-if="lead" v-reveal="160" class="heading__lead">{{ lead }}</p>
  </header>
</template>

<style scoped lang="scss">
.heading {
  display: flex;
  flex-direction: column;
  gap: $space-md;
  max-width: 48rem;
  margin-bottom: clamp(1.75rem, 3.5vw, 2.75rem);

  &--center {
    align-items: center;
    text-align: center;
    margin-inline: auto;
  }

  &__kicker {
    gap: $space-sm;
  }

  &__kicker-line {
    width: 32px;
    height: 2px;
    background: $gradient-heat;
    border-radius: $radius-pill;
  }

  &__title {
    font-size: $fs-h2;
    letter-spacing: -0.03em;
    line-height: 0.96;
  }

  &__lead {
    font-size: $fs-lead;
    line-height: 1.6;
    color: var(--c-text-mist);
    max-width: 42rem;
    text-wrap: pretty;
  }
}
</style>

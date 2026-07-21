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
  max-width: 46rem;
  margin-bottom: $space-2xl;

  &--center {
    align-items: center;
    text-align: center;
    margin-inline: auto;
  }

  &__kicker-line {
    width: 28px;
    height: 2px;
    background: $gradient-heat;
    border-radius: $radius-pill;
  }

  &__title {
    font-size: $fs-h2;
  }

  &__lead {
    font-size: $fs-lead;
    color: var(--c-text-mist);
    max-width: 40rem;
  }
}
</style>

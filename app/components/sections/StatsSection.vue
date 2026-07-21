<script setup lang="ts">
/** StatsSection — social proof band with the key numbers. */
import { contentService } from '~/services/content.service'

const { t } = useI18n()
const stats = contentService.getStats()
</script>

<template>
  <section class="stats">
    <div class="u-container">
      <div class="stats__grid">
        <div v-for="(stat, i) in stats" :key="stat.id" v-reveal="i * 70" class="stat">
          <span class="stat__value u-display u-gradient-text">{{ stat.value }}</span>
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
  }

  &__label {
    font-size: $fs-sm;
    color: var(--c-text-mist);
  }
}
</style>

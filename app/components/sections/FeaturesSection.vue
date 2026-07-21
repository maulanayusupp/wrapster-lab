<script setup lang="ts">
/** FeaturesSection — the "why Wrapster" trust grid. */
import { SECTION_IDS } from '~/utils/constants'
import { contentService } from '~/services/content.service'

const { t } = useI18n()
const features = contentService.getFeatures()
</script>

<template>
  <section :id="SECTION_IDS.features" class="features">
    <div class="u-container">
      <SectionHeading
        :kicker="t('features.kicker')"
        :title="t('features.title')"
        :lead="t('features.lead')"
      />

      <div class="features__grid">
        <article
          v-for="(feature, i) in features"
          :key="feature.id"
          v-reveal="i * 60"
          class="feature"
        >
          <div class="feature__icon">
            <AppIcon :name="feature.icon" :size="24" />
          </div>
          <div class="feature__body">
            <h3 class="feature__title">{{ t(feature.titleKey) }}</h3>
            <p class="feature__desc">{{ t(feature.descKey) }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.features {
  @include section-space;

  &__grid {
    display: grid;
    gap: $space-md;
    grid-template-columns: 1fr;

    @include respond(sm) { grid-template-columns: repeat(2, 1fr); }
    @include respond(lg) { grid-template-columns: repeat(3, 1fr); }
  }
}

.feature {
  display: flex;
  gap: $space-md;
  padding: $space-lg;
  border-radius: $radius-lg;
  border: 1px solid var(--c-line);
  background: linear-gradient(180deg, var(--c-surface), transparent);
  transition: border-color $dur-base, transform $dur-base $ease-out;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 90, 31, 0.4);
    .feature__icon { color: $color-white; background: $gradient-heat; border-color: transparent; }
  }

  &__icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: $radius-md;
    color: $color-orange;
    background: rgba(255, 90, 31, 0.08);
    border: 1px solid var(--c-line);
    transition: color $dur-base, background $dur-base, border-color $dur-base;
  }

  &__title { font-size: 1.1rem; }
  &__desc { margin-top: $space-2xs; font-size: $fs-sm; color: var(--c-text-mist); }
}
</style>

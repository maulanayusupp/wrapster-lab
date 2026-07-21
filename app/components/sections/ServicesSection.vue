<script setup lang="ts">
/** ServicesSection — the six ways Wrapster transforms a ride. */
import { SECTION_IDS } from '~/utils/constants'
import { contentService } from '~/services/content.service'

const { t } = useI18n()
const services = contentService.getServices()
</script>

<template>
  <section :id="SECTION_IDS.services" class="services">
    <div class="u-container">
      <SectionHeading
        :kicker="t('services.kicker')"
        :title="t('services.title')"
        :lead="t('services.lead')"
      />

      <div class="services__grid">
        <article
          v-for="(service, i) in services"
          :key="service.id"
          v-reveal="i * 60"
          class="card"
          :class="{ 'card--featured': service.featured }"
        >
          <div class="card__icon">
            <AppIcon :name="service.icon" :size="26" />
          </div>
          <h3 class="card__title">{{ t(service.titleKey) }}</h3>
          <p class="card__desc">{{ t(service.descKey) }}</p>
          <span class="card__index">0{{ i + 1 }}</span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.services {
  @include section-space;

  &__grid {
    display: grid;
    gap: $space-md;
    grid-template-columns: 1fr;

    @include respond(sm) { grid-template-columns: repeat(2, 1fr); }
    @include respond(lg) { grid-template-columns: repeat(3, 1fr); }
  }
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: $space-sm;
  padding: $space-xl $space-lg;
  border-radius: $radius-lg;
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  overflow: hidden;
  @include card-depth;
  transition: transform $dur-base $ease-out, border-color $dur-base,
    background $dur-base, box-shadow $dur-base;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 100% 0%, rgba(47, 92, 255, 0.16), transparent 55%);
    opacity: 0;
    transition: opacity $dur-base $ease-out;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(43, 140, 255, 0.5);
    @include card-depth-hover;
    &::before { opacity: 1; }
  }

  &--featured {
    @include gradient-border($radius-lg, 1.5px);
    background: linear-gradient(180deg, var(--c-surface-2), var(--c-surface));
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 54px;
    height: 54px;
    border-radius: $radius-md;
    color: $color-white;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--c-line);
  }

  &--featured &__icon {
    background: $gradient-brand;
    border-color: transparent;
  }

  &__title {
    position: relative;
    font-size: $fs-h3;
    margin-top: $space-xs;
  }

  &__desc {
    position: relative;
    color: var(--c-text-mist);
    font-size: $fs-sm;
  }

  &__index {
    position: absolute;
    top: $space-md;
    right: $space-lg;
    font-family: $font-display;
    font-weight: $fw-black;
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.06);
  }
}
</style>

<script setup lang="ts">
/** ProcessSection — the five-step Stock-to-Stunning pipeline. */
import { SECTION_IDS } from '~/utils/constants'
import { contentService } from '~/services/content.service'

const { t } = useI18n()
const steps = contentService.getProcess()
</script>

<template>
  <section :id="SECTION_IDS.process" class="process">
    <span v-parallax="0.16" class="process__orb" aria-hidden="true" />
    <div class="u-container">
      <SectionHeading
        :kicker="t('process.kicker')"
        :title="t('process.title')"
        :lead="t('process.lead')"
        align="center"
      />

      <ol class="process__track">
        <li
          v-for="(step, i) in steps"
          :key="step.id"
          v-reveal="i * 80"
          class="step"
        >
          <div class="step__num u-display">{{ step.step }}</div>
          <div class="step__body">
            <h3 class="step__title">{{ t(step.titleKey) }}</h3>
            <p class="step__desc">{{ t(step.descKey) }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
.process {
  position: relative;
  overflow: hidden;
  @include section-space;
  background:
    radial-gradient(ellipse 60% 50% at 50% 0%, rgba(47, 92, 255, 0.08), transparent 70%);

  &__orb {
    position: absolute;
    top: -10%;
    right: -5%;
    width: min(40vw, 480px);
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(47, 92, 255, 0.28), transparent 68%);
    filter: blur(50px);
    z-index: 0;
    pointer-events: none;
  }

  > .u-container {
    position: relative;
    z-index: 1;
  }

  &__track {
    display: grid;
    gap: $space-lg;
    grid-template-columns: 1fr;
    counter-reset: step;

    @include respond(md) { grid-template-columns: repeat(2, 1fr); }
    @include respond(lg) { grid-template-columns: repeat(5, 1fr); gap: $space-md; }
  }
}

.step {
  position: relative;
  display: flex;
  gap: $space-md;
  padding: $space-lg;
  border-radius: $radius-lg;
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  @include card-depth;
  transition: transform $dur-base $ease-out, border-color $dur-base, box-shadow $dur-base;

  @include respond(lg) { flex-direction: column; }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(47, 92, 255, 0.5);
    @include card-depth-hover;
  }

  // Connector line (desktop only).
  @include respond(lg) {
    &::after {
      content: '';
      position: absolute;
      top: 2.4rem;
      right: -#{$space-md};
      width: $space-md;
      height: 2px;
      background: var(--c-line);
    }
    &:last-child::after { display: none; }
  }

  &__num {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 46px;
    height: 46px;
    border-radius: $radius-md;
    font-size: 1.4rem;
    color: $color-white;
    background: $gradient-brand;
  }

  &__title { font-size: 1.15rem; }
  &__desc { margin-top: $space-2xs; font-size: $fs-sm; color: var(--c-text-mist); }
}
</style>

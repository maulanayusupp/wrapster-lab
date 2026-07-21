<script setup lang="ts">
/** EventSection — highlights the current community ride (Wrapster Sunmori). */
import { SECTION_IDS } from '~/utils/constants'
import { contentService } from '~/services/content.service'
import { formatDate } from '~/utils/format'

const { t, locale, tm, rt } = useI18n()
const appConfig = useAppConfig()

const event = contentService.getEvent()
const prettyDate = computed(() => formatDate(event.date, locale.value))
const benefits = computed(() => (tm('event.benefits') as unknown[]).map((m) => rt(m as string)))
</script>

<template>
  <section :id="SECTION_IDS.event" class="event">
    <div class="u-container">
      <div v-reveal class="event__card">
        <div class="event__glow" aria-hidden="true" />

        <div class="event__main">
          <span class="u-kicker event__kicker">
            <span class="event__dot" />{{ t('event.kicker') }}
          </span>
          <h2 class="event__title u-display">{{ t('event.title') }}</h2>
          <p class="event__desc">{{ t('event.desc') }}</p>

          <div class="event__meta">
            <span class="event__meta-item">
              <AppIcon name="calendar" :size="18" />{{ prettyDate }}
            </span>
            <span class="event__meta-item">
              <AppIcon name="map-pin" :size="18" />{{ t('event.route') }}
            </span>
          </div>

          <BaseButton v-magnetic :href="appConfig.social.instagram" size="lg" class="event__cta">
            {{ t('event.cta') }}
            <template #icon><AppIcon name="arrow-right" :size="20" /></template>
          </BaseButton>
        </div>

        <ul class="event__benefits">
          <li v-for="(benefit, i) in benefits" :key="i" class="event__benefit">
            <span class="event__check"><AppIcon name="check" :size="16" /></span>
            {{ benefit }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.event {
  @include section-space;

  &__card {
    position: relative;
    display: grid;
    gap: $space-2xl;
    padding: clamp(1.5rem, 5vw, 3.5rem);
    border-radius: $radius-xl;
    overflow: hidden;
    background: linear-gradient(135deg, var(--c-surface-2), var(--c-ink));
    border: 1px solid var(--c-line);

    @include respond(lg) { grid-template-columns: 1.4fr 1fr; align-items: center; }
  }

  &__glow {
    position: absolute;
    top: -30%;
    right: -10%;
    width: 40%;
    height: 120%;
    background: radial-gradient(circle, rgba(47, 92, 255, 0.35), transparent 65%);
    filter: blur(50px);
  }

  &__main { position: relative; display: flex; flex-direction: column; gap: $space-md; align-items: flex-start; }
  &__dot { width: 8px; height: 8px; border-radius: 50%; background: $color-orange; }
  &__title { font-size: clamp(2.4rem, 6vw, 4rem); }
  &__desc { color: var(--c-text-mist); font-size: $fs-lead; max-width: 34rem; }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: $space-md;
    margin-top: $space-2xs;
  }
  &__meta-item {
    display: inline-flex;
    align-items: center;
    gap: $space-xs;
    font-size: $fs-sm;
    color: var(--c-text-mist);
    svg { color: $color-magenta; }
  }

  &__cta { margin-top: $space-xs; }

  &__benefits {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: $space-sm;
    padding: $space-lg;
    border-radius: $radius-lg;
    @include glass(0.4);
  }
  &__benefit {
    display: flex;
    align-items: center;
    gap: $space-sm;
    font-size: $fs-sm;
    color: var(--c-text);
  }
  &__check {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    color: $color-white;
    background: $gradient-cool;
  }
}
</style>

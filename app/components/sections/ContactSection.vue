<script setup lang="ts">
/** ContactSection — contact channels + a final CTA band. */
import { SECTION_IDS } from '~/utils/constants'
import { whatsappLink } from '~/utils/format'

const { t } = useI18n()
const appConfig = useAppConfig()

const waHref = computed(() => whatsappLink(appConfig.contact.phoneIntl, t('contact.waMessage')))
const mapsHref = computed(() => appConfig.contact.maps)
</script>

<template>
  <section :id="SECTION_IDS.contact" class="contact">
    <div class="u-container">
      <div v-reveal class="contact__band">
        <div class="contact__band-glow" aria-hidden="true" />
        <h2 class="contact__band-title u-display">{{ t('cta.title') }}</h2>
        <p class="contact__band-sub">{{ t('cta.subtitle') }}</p>
        <BaseButton :href="waHref" size="lg">
          {{ t('cta.button') }}
          <template #icon><AppIcon name="whatsapp" :size="20" /></template>
        </BaseButton>
      </div>

      <SectionHeading
        :kicker="t('contact.kicker')"
        :title="t('contact.title')"
        :lead="t('contact.lead')"
        align="center"
      />

      <div class="contact__cards">
        <a :href="waHref" target="_blank" rel="noopener" v-reveal class="ccard">
          <div class="ccard__icon"><AppIcon name="whatsapp" :size="24" /></div>
          <span class="ccard__label">{{ t('contact.phoneLabel') }}</span>
          <span class="ccard__value">{{ appConfig.contact.phoneDisplay }}</span>
          <span class="ccard__action">{{ t('contact.ctaWhatsapp') }} <AppIcon name="arrow-right" :size="15" /></span>
        </a>

        <a :href="mapsHref" target="_blank" rel="noopener" v-reveal="80" class="ccard">
          <div class="ccard__icon"><AppIcon name="map-pin" :size="24" /></div>
          <span class="ccard__label">{{ t('contact.addressLabel') }}</span>
          <span class="ccard__value">{{ appConfig.contact.address }}</span>
          <span class="ccard__action">{{ t('contact.ctaMaps') }} <AppIcon name="arrow-right" :size="15" /></span>
        </a>

        <a :href="appConfig.social.instagram" target="_blank" rel="noopener" v-reveal="160" class="ccard">
          <div class="ccard__icon"><AppIcon name="instagram" :size="24" /></div>
          <span class="ccard__label">{{ t('contact.socialLabel') }}</span>
          <span class="ccard__value">{{ appConfig.social.instagramHandle }}</span>
          <span class="ccard__action">Instagram <AppIcon name="external" :size="15" /></span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact {
  @include section-space;

  &__band {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: $space-md;
    padding: clamp(2.5rem, 7vw, 5rem) $space-lg;
    margin-bottom: $space-4xl;
    border-radius: $radius-xl;
    overflow: hidden;
    background: $gradient-brand;
    box-shadow: $shadow-md, $shadow-glow;
  }
  &__band-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% -20%, rgba(255, 255, 255, 0.35), transparent 55%);
    mix-blend-mode: screen;
  }
  &__band-title {
    position: relative;
    font-size: clamp(2rem, 5vw, 3.4rem);
    color: $color-white;
    max-width: 20ch;
  }
  &__band-sub {
    position: relative;
    color: rgba(255, 255, 255, 0.9);
    font-size: $fs-lead;
    max-width: 34rem;
  }
  :deep(.contact__band .btn--primary) {
    background: $color-white;
    color: $color-ink;
    box-shadow: $shadow-md;
  }

  &__cards {
    display: grid;
    gap: $space-md;
    grid-template-columns: 1fr;

    @include respond(md) { grid-template-columns: repeat(3, 1fr); }
  }
}

.ccard {
  display: flex;
  flex-direction: column;
  gap: $space-xs;
  padding: $space-xl $space-lg;
  border-radius: $radius-lg;
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  transition: transform $dur-base $ease-out, border-color $dur-base;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(47, 92, 255, 0.5);
    .ccard__icon { background: $gradient-cool; color: $color-white; border-color: transparent; }
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    margin-bottom: $space-xs;
    border-radius: $radius-md;
    color: $color-blue;
    background: rgba(47, 92, 255, 0.1);
    border: 1px solid var(--c-line);
    transition: color $dur-base, background $dur-base, border-color $dur-base;
  }

  &__label {
    font-size: $fs-xs;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--c-text-muted);
  }
  &__value { font-size: $fs-body; font-weight: $fw-semibold; color: var(--c-text); }
  &__action {
    display: inline-flex;
    align-items: center;
    gap: $space-2xs;
    margin-top: $space-xs;
    font-size: $fs-sm;
    font-weight: $fw-semibold;
    @include gradient-text($gradient-cool);
  }
}
</style>

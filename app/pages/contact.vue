<script setup lang="ts">
/**
 * /contact — the dedicated conversion page. Persuasive copy + a WhatsApp-composing
 * lead form, direct channels, reassurance strip, FAQ, and a closing CTA.
 */
import { whatsappLink } from '~/utils/format'

const { t } = useI18n()
const appConfig = useAppConfig()

useAppSeo({
  title: t('seo.contact.title'),
  description: t('seo.contact.desc'),
})

const waHref = computed(() => whatsappLink(appConfig.contact.phoneIntl, t('contact.waMessage')))

const reassure = [
  { icon: 'palette', key: 'contactPage.reassure.consult' },
  { icon: 'spark', key: 'contactPage.reassure.fast' },
  { icon: 'badge', key: 'contactPage.reassure.warranty' },
  { icon: 'globe', key: 'contactPage.reassure.nationwide' },
]

const faqs = [
  { q: 'contactPage.faq.q1', a: 'contactPage.faq.a1' },
  { q: 'contactPage.faq.q2', a: 'contactPage.faq.a2' },
  { q: 'contactPage.faq.q3', a: 'contactPage.faq.a3' },
  { q: 'contactPage.faq.q4', a: 'contactPage.faq.a4' },
]

const channels = computed(() => [
  { icon: 'whatsapp', label: t('contact.phoneLabel'), value: appConfig.contact.phoneDisplay, href: waHref.value, action: t('contact.ctaWhatsapp') },
  { icon: 'map-pin', label: t('contact.addressLabel'), value: appConfig.contact.address, href: appConfig.contact.maps, action: t('contact.ctaMaps') },
  { icon: 'instagram', label: t('contact.socialLabel'), value: appConfig.social.instagramHandle, href: appConfig.social.instagram, action: 'Instagram' },
])
</script>

<template>
  <div class="contactp">
    <!-- Hero -->
    <section class="contactp__hero">
      <span class="contactp__orb" aria-hidden="true" />
      <div class="u-container">
        <span v-reveal class="u-kicker"><span class="contactp__kline" />{{ t('contactPage.kicker') }}</span>
        <h1 v-reveal="60" class="contactp__title">
          {{ t('contactPage.title') }}
        </h1>
        <p v-reveal="120" class="contactp__lead">{{ t('contactPage.lead') }}</p>
        <p v-reveal="160" class="contactp__response">
          <span class="contactp__pulse" aria-hidden="true" />{{ t('contactPage.response') }}
        </p>

        <ul v-reveal="200" class="contactp__reassure">
          <li v-for="item in reassure" :key="item.key">
            <AppIcon :name="item.icon" :size="18" />{{ t(item.key) }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Form + channels -->
    <section class="contactp__main u-container">
      <div v-reveal class="contactp__form">
        <ContactForm />
      </div>

      <aside v-reveal="100" class="contactp__channels">
        <h2 class="contactp__channels-title">{{ t('contactPage.channels.title') }}</h2>
        <p class="contactp__channels-lead">{{ t('contactPage.channels.lead') }}</p>

        <a
          v-for="ch in channels"
          :key="ch.icon"
          :href="ch.href"
          target="_blank"
          rel="noopener"
          v-spotlight
          class="channel"
        >
          <span class="channel__icon"><AppIcon :name="ch.icon" :size="22" /></span>
          <span class="channel__body">
            <span class="channel__label">{{ ch.label }}</span>
            <span class="channel__value">{{ ch.value }}</span>
          </span>
          <span class="channel__action">{{ ch.action }} <AppIcon name="arrow-right" :size="15" /></span>
        </a>
      </aside>
    </section>

    <!-- FAQ -->
    <section class="contactp__faq u-container">
      <SectionHeading :title="t('contactPage.faq.title')" align="center" />
      <div class="faq">
        <details v-for="(f, i) in faqs" :key="i" v-reveal="i * 60" class="faq__item">
          <summary class="faq__q">
            {{ t(f.q) }}
            <AppIcon name="arrow-down" :size="18" class="faq__chevron" />
          </summary>
          <p class="faq__a">{{ t(f.a) }}</p>
        </details>
      </div>
    </section>

    <!-- CTA -->
    <section class="contactp__cta u-container">
      <div v-reveal class="cta-band">
        <span class="cta-band__glow" aria-hidden="true" />
        <h2 class="cta-band__title u-display">{{ t('contactPage.cta.title') }}</h2>
        <p class="cta-band__sub">{{ t('contactPage.cta.subtitle') }}</p>
        <BaseButton v-magnetic :href="waHref" size="lg">
          {{ t('contactPage.cta.button') }}
          <template #icon><AppIcon name="whatsapp" :size="20" /></template>
        </BaseButton>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.contactp {
  padding-top: $header-height;

  &__hero {
    position: relative;
    overflow: hidden;
    padding-block: clamp(3rem, 8vw, 6rem) clamp(2rem, 5vw, 3.5rem);
    > .u-container { position: relative; z-index: 1; }
  }

  &__orb {
    position: absolute;
    top: -25%;
    right: -6%;
    width: min(46vw, 600px);
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(91, 108, 255, 0.3), transparent 66%);
    filter: blur(70px);
    pointer-events: none;
  }

  &__kline { width: 32px; height: 2px; background: $gradient-heat; border-radius: $radius-pill; }

  &__title {
    max-width: 16ch;
    margin-top: $space-md;
    font-size: clamp(2.4rem, 6vw, 4.5rem);
    letter-spacing: -0.03em;
    line-height: 0.98;
  }

  &__lead {
    max-width: 42rem;
    margin-top: $space-md;
    font-size: $fs-lead;
    color: var(--c-text-mist);
  }

  &__response {
    display: inline-flex;
    align-items: center;
    gap: $space-xs;
    margin-top: $space-md;
    font-size: $fs-sm;
    font-weight: $fw-semibold;
    color: var(--c-text);
  }
  &__pulse {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: $color-success;
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
    animation: pulse 2s infinite;
  }

  &__reassure {
    display: flex;
    flex-wrap: wrap;
    gap: $space-sm $space-lg;
    margin-top: $space-xl;

    li {
      display: inline-flex;
      align-items: center;
      gap: $space-xs;
      font-size: $fs-sm;
      color: var(--c-text-mist);
      svg { color: $color-orange; }
    }
  }

  &__main {
    display: grid;
    gap: $space-xl;
    align-items: start;
    padding-bottom: clamp(3rem, 7vw, 5rem);
    grid-template-columns: 1fr;

    @include respond(lg) { grid-template-columns: 1.15fr 0.85fr; }
  }

  &__channels {
    display: flex;
    flex-direction: column;
    gap: $space-sm;
  }
  &__channels-title { font-size: $fs-h3; }
  &__channels-lead { color: var(--c-text-mist); font-size: $fs-sm; margin-bottom: $space-sm; }

  &__faq { padding-bottom: clamp(3rem, 7vw, 5rem); }
  &__cta { padding-bottom: clamp(3.5rem, 8vw, 6rem); }
}

.channel {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: $space-md;
  padding: $space-md $space-lg;
  border-radius: $radius-lg;
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  @include card-depth;
  transition: transform $dur-base $ease-out, border-color $dur-base, box-shadow $dur-base;

  & > *:not(.spotlight-layer) { position: relative; z-index: 1; }

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(47, 92, 255, 0.5);
    @include card-depth-hover;
    .channel__icon { background: $gradient-cool; color: $color-white; border-color: transparent; }
  }

  &__icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 46px;
    height: 46px;
    border-radius: $radius-md;
    color: $color-blue;
    background: rgba(47, 92, 255, 0.1);
    border: 1px solid var(--c-line);
    transition: color $dur-base, background $dur-base, border-color $dur-base;
  }

  &__body { display: flex; flex-direction: column; min-width: 0; }
  &__label {
    font-size: $fs-xs;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--c-text-muted);
  }
  &__value { font-weight: $fw-semibold; }
  &__action {
    display: inline-flex;
    align-items: center;
    gap: $space-2xs;
    margin-left: auto;
    flex-shrink: 0;
    font-size: $fs-sm;
    font-weight: $fw-semibold;
    @include gradient-text($gradient-cool);
  }
}

.faq {
  display: flex;
  flex-direction: column;
  gap: $space-sm;
  max-width: 46rem;
  margin-inline: auto;

  &__item {
    border-radius: $radius-lg;
    background: var(--c-surface);
    border: 1px solid var(--c-line);
    overflow: hidden;

    &[open] .faq__chevron { transform: rotate(180deg); }
    &[open] .faq__q { color: $color-white; }
  }

  &__q {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-md;
    padding: $space-lg;
    font-family: $font-display;
    font-weight: $fw-bold;
    font-size: 1.1rem;
    color: var(--c-text-mist);
    cursor: pointer;
    list-style: none;
    transition: color $dur-base;

    &::-webkit-details-marker { display: none; }
    &:hover { color: $color-white; }
  }

  &__chevron { flex-shrink: 0; color: $color-blue; transition: transform $dur-base $ease-out; }

  &__a {
    padding: 0 $space-lg $space-lg;
    color: var(--c-text-mist);
    font-size: $fs-sm;
  }
}

.cta-band {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $space-md;
  padding: clamp(2.5rem, 7vw, 5rem) $space-lg;
  border-radius: $radius-xl;
  overflow: hidden;
  background: $gradient-brand;
  box-shadow: $shadow-md, $shadow-glow;

  &__glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% -20%, rgba(255, 255, 255, 0.35), transparent 55%);
    mix-blend-mode: screen;
  }
  &__title { position: relative; font-size: clamp(2rem, 5vw, 3.2rem); color: $color-white; max-width: 20ch; }
  &__sub { position: relative; color: rgba(255, 255, 255, 0.9); font-size: $fs-lead; }
  :deep(.btn--primary) { background: $color-white; color: $color-ink; box-shadow: $shadow-md; }
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
  70% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}
</style>

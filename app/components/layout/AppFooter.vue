<script setup lang="ts">
/** AppFooter — brand, quick links, contact channels, and legal line. */
import { NAV_LINKS } from '~/utils/constants'
import { whatsappLink } from '~/utils/format'

const appConfig = useAppConfig()
const { t } = useI18n()
const localePath = useLocalePath()
const home = computed(() => localePath('/'))
const showcase = computed(() => localePath('/showcase'))
const contact = computed(() => localePath('/contact'))

const year = new Date().getFullYear()
const waHref = computed(() => whatsappLink(appConfig.contact.phoneIntl, t('contact.waMessage')))
const mapsHref = computed(() => appConfig.contact.maps)
</script>

<template>
  <footer class="footer">
    <div class="footer__inner u-container">
      <div class="footer__brand">
        <TheLogo />
        <p class="footer__tagline">{{ $t('footer.tagline') }}</p>
        <div class="footer__social">
          <a :href="appConfig.social.instagram" target="_blank" rel="noopener" aria-label="Instagram">
            <AppIcon name="instagram" :size="20" />
          </a>
          <a :href="waHref" target="_blank" rel="noopener" aria-label="WhatsApp">
            <AppIcon name="whatsapp" :size="20" />
          </a>
          <a :href="appConfig.social.linktree" target="_blank" rel="noopener" aria-label="Linktree">
            <AppIcon name="external" :size="20" />
          </a>
        </div>
      </div>

      <nav class="footer__col" :aria-label="$t('footer.explore')">
        <h3 class="footer__title">{{ $t('footer.explore') }}</h3>
        <NuxtLink
          v-for="link in NAV_LINKS"
          :key="link.target"
          :to="`${home}#${link.target}`"
          class="footer__link"
        >
          {{ $t(link.key) }}
        </NuxtLink>
        <NuxtLink :to="showcase" class="footer__link">{{ $t('nav.showcase') }}</NuxtLink>
        <NuxtLink :to="contact" class="footer__link">{{ $t('nav.contact') }}</NuxtLink>
      </nav>

      <div class="footer__col">
        <h3 class="footer__title">{{ $t('footer.connect') }}</h3>
        <a :href="waHref" target="_blank" rel="noopener" class="footer__link">{{ appConfig.contact.phoneDisplay }}</a>
        <a :href="appConfig.social.instagram" target="_blank" rel="noopener" class="footer__link">
          {{ appConfig.social.instagramHandle }}
        </a>
        <a :href="appConfig.social.linktree" target="_blank" rel="noopener" class="footer__link">linktr.ee/wrapsterlab</a>
      </div>

      <div class="footer__col">
        <h3 class="footer__title">{{ $t('footer.visit') }}</h3>
        <a :href="mapsHref" target="_blank" rel="noopener" class="footer__link footer__link--wrap">
          {{ appConfig.contact.address }}
        </a>
        <BaseButton :to="contact" variant="outline" class="footer__cta">
          {{ $t('nav.book') }}
        </BaseButton>
      </div>
    </div>

    <div class="footer__bar u-container">
      <span>© {{ year }} {{ appConfig.brand.name }}. {{ $t('footer.rights') }}</span>
      <span class="footer__made">{{ $t('footer.madeWith') }}</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  position: relative;
  border-top: 1px solid var(--c-line);
  background: linear-gradient(180deg, var(--c-bg), var(--c-ink));
  padding-top: $space-3xl;

  &__inner {
    display: grid;
    gap: $space-2xl;
    grid-template-columns: 1fr;
    padding-bottom: $space-2xl;

    @include respond(md) {
      grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
      gap: $space-xl;
    }
  }

  &__brand {
    display: flex;
    flex-direction: column;
    gap: $space-md;
    max-width: 22rem;
  }

  &__tagline {
    color: var(--c-text-muted);
    font-size: $fs-sm;
  }

  &__social {
    display: flex;
    gap: $space-sm;

    a {
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      color: var(--c-text-mist);
      border: 1px solid var(--c-line);
      transition: color $dur-fast, border-color $dur-base, transform $dur-base $ease-out;

      &:hover {
        color: $color-white;
        border-color: $color-magenta;
        transform: translateY(-2px);
      }
    }
  }

  &__col {
    display: flex;
    flex-direction: column;
    gap: $space-sm;
  }

  &__title {
    font-family: $font-body;
    font-size: $fs-xs;
    font-weight: $fw-bold;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--c-text-muted);
    margin-bottom: $space-2xs;
  }

  &__link {
    font-size: $fs-sm;
    color: var(--c-text-mist);
    transition: color $dur-fast;
    width: fit-content;

    &:hover { color: $color-white; }
    &--wrap { line-height: 1.5; }
  }

  &__cta {
    margin-top: $space-xs;
    width: fit-content;
  }

  &__bar {
    display: flex;
    flex-wrap: wrap;
    gap: $space-xs $space-lg;
    justify-content: space-between;
    padding-block: $space-lg;
    border-top: 1px solid var(--c-line);
    font-size: $fs-xs;
    color: var(--c-text-muted);
  }

  &__made {
    @include gradient-text($gradient-cool);
    font-weight: $fw-semibold;
  }
}
</style>

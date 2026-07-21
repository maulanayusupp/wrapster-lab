<script setup lang="ts">
/**
 * LanguageSwitcher — segmented EN/ID toggle.
 * Uses i18n's switchLocalePath so URLs stay correct (prefix strategy) and the
 * choice persists via the configured cookie. Adding a locale in nuxt.config
 * makes it appear here automatically.
 */
import { localeShort } from '~/utils/format'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const available = computed(() =>
  (locales.value as { code: string; name: string }[]).map((l) => ({
    code: l.code,
    name: l.name,
    short: localeShort(l.code),
  })),
)
</script>

<template>
  <div class="lang" role="group" :aria-label="$t('language.label')">
    <NuxtLink
      v-for="item in available"
      :key="item.code"
      :to="switchLocalePath(item.code)"
      class="lang__opt"
      :class="{ 'is-active': item.code === locale }"
      :aria-current="item.code === locale ? 'true' : undefined"
      :title="item.name"
    >
      {{ item.short }}
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.lang {
  display: inline-flex;
  padding: 3px;
  border-radius: $radius-pill;
  @include glass(0.4);

  &__opt {
    padding: 0.4rem 0.7rem;
    border-radius: $radius-pill;
    font-size: $fs-xs;
    font-weight: $fw-bold;
    letter-spacing: 0.08em;
    color: var(--c-text-muted);
    transition: color $dur-fast, background $dur-base $ease-out;

    &:hover {
      color: $color-white;
    }

    &.is-active {
      color: $color-white;
      background: $gradient-brand;
    }
  }
}
</style>

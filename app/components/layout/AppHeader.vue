<script setup lang="ts">
/**
 * AppHeader — sticky top nav with scroll-aware background, in-page anchor
 * links, language switcher, and an accessible mobile drawer.
 */
import { NAV_LINKS, SECTION_IDS } from '~/utils/constants'

const localePath = useLocalePath()
const scrolled = ref(false)
const menuOpen = ref(false)
const progress = ref<HTMLElement | null>(null)

const home = computed(() => localePath('/'))

function onScroll() {
  scrolled.value = window.scrollY > 24
  // Drive the top scroll-progress bar (0 → 1).
  const max = document.documentElement.scrollHeight - window.innerHeight
  const ratio = max > 0 ? window.scrollY / max : 0
  progress.value?.style.setProperty('--progress', String(Math.min(1, Math.max(0, ratio))))
}

function closeMenu() {
  menuOpen.value = false
}

// Lock body scroll while the mobile drawer is open.
watch(menuOpen, (open) => {
  if (import.meta.client) {
    document.body.classList.toggle('u-noscroll', open)
  }
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (import.meta.client) document.body.classList.remove('u-noscroll')
})
</script>

<template>
  <div ref="progress" class="scroll-progress" aria-hidden="true" />
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <div class="header__inner u-container">
      <NuxtLink :to="home" class="header__brand" @click="closeMenu">
        <TheLogo />
      </NuxtLink>

      <nav class="header__nav" :aria-label="$t('nav.menu')">
        <a v-for="link in NAV_LINKS" :key="link.target" :href="`#${link.target}`" class="header__link">
          {{ $t(link.key) }}
        </a>
      </nav>

      <div class="header__actions">
        <LanguageSwitcher />
        <BaseButton v-magnetic :href="`#${SECTION_IDS.contact}`" size="md" class="header__cta">
          {{ $t('nav.book') }}
        </BaseButton>
        <button
          class="header__burger"
          :aria-expanded="menuOpen"
          :aria-label="menuOpen ? $t('nav.close') : $t('nav.menu')"
          @click="menuOpen = !menuOpen"
        >
          <AppIcon :name="menuOpen ? 'close' : 'menu'" :size="26" />
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <Transition name="drawer">
      <div v-if="menuOpen" class="drawer">
        <nav class="drawer__nav" :aria-label="$t('nav.menu')">
          <a
            v-for="link in NAV_LINKS"
            :key="link.target"
            :href="`#${link.target}`"
            class="drawer__link"
            @click="closeMenu"
          >
            {{ $t(link.key) }}
          </a>
        </nav>
        <BaseButton :href="`#${SECTION_IDS.contact}`" size="lg" block @click="closeMenu">
          {{ $t('nav.book') }}
        </BaseButton>
      </div>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: $z-header;
  transition: background $dur-base $ease-out, border-color $dur-base, backdrop-filter $dur-base;
  border-bottom: 1px solid transparent;

  &.is-scrolled {
    @include glass(0.72);
    border-bottom-color: var(--c-line);
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $header-height;
  }

  &__nav {
    display: none;
    gap: $space-lg;

    @include respond(lg) {
      display: flex;
    }
  }

  &__link {
    position: relative;
    font-size: $fs-sm;
    font-weight: $fw-medium;
    color: var(--c-text-mist);
    transition: color $dur-fast;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 0;
      height: 2px;
      border-radius: $radius-pill;
      background: $gradient-heat;
      transition: width $dur-base $ease-out;
    }

    &:hover {
      color: $color-white;
      &::after { width: 100%; }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-sm;
  }

  &__cta {
    display: none;

    @include respond(md) {
      display: inline-flex;
    }
  }

  &__burger {
    display: inline-flex;
    color: $color-white;

    @include respond(lg) {
      display: none;
    }
  }
}

.drawer {
  @include glass(0.92);
  border-bottom: 1px solid var(--c-line);
  padding: $space-lg $container-pad $space-xl;
  display: flex;
  flex-direction: column;
  gap: $space-lg;

  @include respond(lg) {
    display: none;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: $space-xs;
  }

  &__link {
    padding: $space-sm 0;
    font-family: $font-display;
    font-weight: $fw-bold;
    font-size: 1.4rem;
    text-transform: uppercase;
    color: $color-white;
    border-bottom: 1px solid var(--c-line);
  }
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity $dur-base $ease-out, transform $dur-base $ease-out;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>

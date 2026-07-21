<script setup lang="ts">
/**
 * HeroSection — the opening statement. Poster-grade typography, animated
 * gradient field, and a tilted "build poster" card echoing the brand's
 * Instagram aesthetic (bold model word on a signature gradient).
 */
import { SECTION_IDS } from '~/utils/constants'

const { t } = useI18n()

const posterModels = ['XMAX', 'NMAX', 'AEROX'] as const
const activeIndex = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % posterModels.length
  }, 2600)
})
onBeforeUnmount(() => clearInterval(timer))

const activeModel = computed(() => posterModels[activeIndex.value])

// --- Parallax: 3D tilt on mouse move + gentle drift on scroll ----------------
const heroEl = ref<HTMLElement | null>(null)
const visualEl = ref<HTMLElement | null>(null)
const posterEl = ref<HTMLElement | null>(null)

function setTilt(rx: number, ry: number) {
  posterEl.value?.style.setProperty('--rx', `${rx}deg`)
  posterEl.value?.style.setProperty('--ry', `${ry}deg`)
}

function onPointerMove(e: PointerEvent) {
  const rect = visualEl.value?.getBoundingClientRect()
  if (!rect) return
  const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
  const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
  const clamp = (v: number) => Math.max(-1, Math.min(1, v))
  setTilt(clamp(dx) * 9, clamp(dy) * -9)
}

function onPointerLeave() {
  setTilt(0, 0)
}

function onScroll() {
  const y = window.scrollY
  visualEl.value?.style.setProperty('--sy', `${Math.min(y * 0.12, 80)}px`)
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  if (reduced) return

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  if (!coarse && heroEl.value) {
    heroEl.value.addEventListener('pointermove', onPointerMove)
    heroEl.value.addEventListener('pointerleave', onPointerLeave)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  heroEl.value?.removeEventListener('pointermove', onPointerMove)
  heroEl.value?.removeEventListener('pointerleave', onPointerLeave)
})
</script>

<template>
  <section :id="SECTION_IDS.hero" ref="heroEl" class="hero">
    <div class="hero__bg" aria-hidden="true">
      <span class="hero__grid" />
      <span class="hero__blob hero__blob--a" />
      <span class="hero__blob hero__blob--b" />
      <span class="hero__blob hero__blob--c" />
    </div>

    <div class="hero__inner u-container">
      <div class="hero__content">
        <BaseBadge dot>{{ t('hero.badge') }}</BaseBadge>

        <h1 class="hero__title">
          <span class="hero__title-lead">{{ t('hero.titleLead') }}</span>
          <span class="hero__title-stock u-display">{{ t('hero.titleStock') }}</span>
          <span class="hero__title-to">{{ t('hero.titleTo') }}</span>
          <span class="hero__title-stunning u-display u-gradient-text">{{ t('hero.titleStunning') }}</span>
        </h1>

        <p class="hero__subtitle">{{ t('hero.subtitle') }}</p>

        <div class="hero__actions">
          <BaseButton v-magnetic :href="`#${SECTION_IDS.contact}`" size="lg">
            {{ t('hero.ctaPrimary') }}
            <template #icon><AppIcon name="arrow-right" :size="20" /></template>
          </BaseButton>
          <BaseButton v-magnetic :href="`#${SECTION_IDS.work}`" variant="outline" size="lg">
            {{ t('hero.ctaSecondary') }}
          </BaseButton>
        </div>
      </div>

      <div ref="visualEl" class="hero__visual" aria-hidden="true">
        <div ref="posterEl" class="poster">
          <span class="poster__brand">Yamaha</span>
          <Transition name="poster-word" mode="out-in">
            <span :key="activeModel" class="poster__model u-display">{{ activeModel }}</span>
          </Transition>
          <span class="poster__tag u-display">Stock to Stunning</span>
          <span class="poster__stripe poster__stripe--1" />
          <span class="poster__stripe poster__stripe--2" />
        </div>

        <div class="chip chip--swatch">
          <span class="chip__dot" />
          <span>80+ colors</span>
        </div>
        <div class="chip chip--warranty">
          <AppIcon name="badge" :size="18" />
          <span>7-day QC</span>
        </div>
      </div>
    </div>

    <a :href="`#${SECTION_IDS.services}`" class="hero__scroll">
      <span>{{ t('hero.scroll') }}</span>
      <AppIcon name="arrow-down" :size="18" />
    </a>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-top: calc(#{$header-height} + 2rem);
  padding-bottom: $space-3xl;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  &__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(47, 92, 255, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(47, 92, 255, 0.06) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%);
  }

  &__blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(70px);
    opacity: 0.55;

    &--a {
      width: 42vw;
      height: 42vw;
      top: -12%;
      right: -8%;
      background: radial-gradient(circle, $color-magenta, transparent 70%);
      animation: float-a 16s $ease-inout infinite;
    }
    &--b {
      width: 38vw;
      height: 38vw;
      bottom: -18%;
      left: -10%;
      background: radial-gradient(circle, $color-blue, transparent 70%);
      animation: float-b 20s $ease-inout infinite;
    }
    &--c {
      width: 26vw;
      height: 26vw;
      top: 30%;
      left: 40%;
      background: radial-gradient(circle, $color-purple, transparent 70%);
      opacity: 0.35;
      animation: float-a 24s $ease-inout infinite reverse;
    }
  }

  &__inner {
    position: relative;
    z-index: $z-raised;
    display: grid;
    gap: $space-2xl;
    align-items: center;
    grid-template-columns: 1fr;

    @include respond(lg) {
      grid-template-columns: 1.05fr 0.95fr;
      gap: $space-3xl;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: $space-lg;
  }

  &__title {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.2em 0.35em;
    font-size: $fs-hero;
    line-height: 0.86;

    &-lead,
    &-to {
      font-family: $font-body;
      font-weight: $fw-medium;
      font-size: 0.24em;
      letter-spacing: 0.02em;
      color: var(--c-text-mist);
      text-transform: lowercase;
    }
    &-stock {
      color: $color-white;
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25);
    }
    &-stunning {
      filter: drop-shadow(0 6px 30px rgba(47, 92, 255, 0.35));
    }
  }

  &__subtitle {
    max-width: 34rem;
    font-size: $fs-lead;
    color: var(--c-text-mist);
  }

  // Positioning context for the floating chips (keeps them on the poster,
  // not anchored to the full-width .hero). --sy drives gentle scroll drift.
  &__visual {
    position: relative;
    transform: translate3d(0, var(--sy, 0), 0);
    will-change: transform;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-sm;
    margin-top: $space-xs;
  }

  &__scroll {
    position: absolute;
    bottom: $space-lg;
    left: 50%;
    transform: translateX(-50%);
    z-index: $z-raised;
    display: inline-flex;
    align-items: center;
    gap: $space-xs;
    font-size: $fs-xs;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--c-text-muted);

    svg { animation: bob 1.8s $ease-inout infinite; }

    @include respond-below(md) { display: none; }
  }
}

// --- Tilted build poster -----------------------------------------------------
.poster {
  position: relative;
  aspect-ratio: 4 / 5;
  width: min(100%, 26rem);
  margin-inline: auto;
  border-radius: $radius-lg;
  padding: $space-lg;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  background: $gradient-cool;
  box-shadow: $shadow-md, $shadow-glow;
  // Base tilt + mouse-driven --rx/--ry (set from script). Smoothed follow.
  transform: perspective(1200px)
    rotateX(calc(4deg + var(--ry, 0deg)))
    rotateY(calc(-12deg + var(--rx, 0deg)))
    rotate(1.5deg);
  transition: transform 0.25s $ease-out;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.28), transparent 45%),
      linear-gradient(160deg, transparent, rgba(5, 6, 13, 0.55));
    mix-blend-mode: screen;
  }

  &__brand {
    position: relative;
    font-weight: $fw-bold;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    font-size: $fs-sm;
    color: rgba(255, 255, 255, 0.85);
  }

  &__model {
    position: relative;
    font-size: clamp(3.5rem, 9vw, 5.5rem);
    color: $color-white;
    line-height: 0.8;
    text-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }

  &__tag {
    position: relative;
    align-self: flex-start;
    padding: 0.4rem 0.8rem;
    border-radius: $radius-sm;
    font-size: $fs-xs;
    background: rgba(5, 6, 13, 0.6);
    color: $color-white;
  }

  &__stripe {
    position: absolute;
    height: 140%;
    width: 14px;
    top: -20%;
    background: rgba(255, 255, 255, 0.14);
    transform: skewX(-16deg);

    &--1 { right: 22%; }
    &--2 { right: 15%; width: 6px; background: rgba(255, 255, 255, 0.22); }
  }
}

.chip {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: $space-xs;
  padding: 0.6rem 0.95rem;
  border-radius: $radius-pill;
  font-size: $fs-sm;
  font-weight: $fw-semibold;
  color: $color-white;
  @include glass(0.7);
  box-shadow: $shadow-md;
  animation: bob 4s $ease-inout infinite;

  &__dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: $gradient-brand;
  }

  &--swatch {
    top: 10%;
    left: 0;
    @include respond(lg) { left: -6%; }
  }
  &--warranty {
    bottom: 12%;
    right: 0;
    color: $color-white;
    animation-delay: 1.2s;
    @include respond(lg) { right: -4%; }
  }
}

@keyframes float-a {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-4%, 6%) scale(1.08); }
}
@keyframes float-b {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(6%, -5%) scale(1.1); }
}
@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.poster-word-enter-active,
.poster-word-leave-active {
  transition: opacity $dur-base $ease-out, transform $dur-base $ease-out;
}
.poster-word-enter-from { opacity: 0; transform: translateY(0.4em); }
.poster-word-leave-to { opacity: 0; transform: translateY(-0.4em); }

// --- Cinematic entrance + gradient shimmer (motion-safe only) ----------------
@media (prefers-reduced-motion: no-preference) {
  .hero__content > * {
    animation: hero-in 0.85s $ease-out both;
  }
  .hero__content > *:nth-child(1) { animation-delay: 0.05s; }
  .hero__content > *:nth-child(2) { animation-delay: 0.15s; }
  .hero__content > *:nth-child(3) { animation-delay: 0.28s; }
  .hero__content > *:nth-child(4) { animation-delay: 0.4s; }

  .hero__visual {
    animation: hero-in 1s $ease-out 0.3s both;
  }

  .hero__title-stunning {
    background-size: 220% 100%;
    animation:
      hero-in 0.85s $ease-out 0.15s both,
      hero-shimmer 7s ease-in-out 1s infinite;
  }
}

@keyframes hero-in {
  from { opacity: 0; transform: translateY(26px); }
  to { opacity: 1; transform: none; }
}
@keyframes hero-shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>

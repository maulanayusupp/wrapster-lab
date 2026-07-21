<script setup lang="ts">
/**
 * TheIntro — a brief branded intro overlay shown on first access only.
 *
 * Flash-free & once-per-session: an inline <head> script (see nuxt.config) adds
 * `html.intro-skip` before first paint when the intro was already seen this
 * session or reduced motion is preferred — CSS then hides this instantly, so
 * repeat visitors never see a flash. On a fresh visit it plays, sets the
 * session flag, then removes itself from the DOM.
 */
const visible = ref(true)
const leaving = ref(false)

onMounted(() => {
  const html = document.documentElement
  if (html.classList.contains('intro-skip')) {
    visible.value = false
    return
  }

  try {
    sessionStorage.setItem('wl_intro', '1')
  } catch {
    /* private mode — fine, it just replays */
  }

  document.body.classList.add('u-noscroll')

  // Play, then fade out, then unmount.
  const hold = window.setTimeout(() => (leaving.value = true), 1500)
  const done = window.setTimeout(() => {
    visible.value = false
    document.body.classList.remove('u-noscroll')
  }, 2150)

  onBeforeUnmount(() => {
    window.clearTimeout(hold)
    window.clearTimeout(done)
    document.body.classList.remove('u-noscroll')
  })
})
</script>

<template>
  <div v-if="visible" class="intro" :class="{ 'intro--leaving': leaving }" aria-hidden="true">
    <div class="intro__inner">
      <span class="intro__mark">W</span>
      <span class="intro__word">
        Wrapster<span class="intro__suffix">.lab</span>
      </span>
      <span class="intro__line"><span class="intro__line-fill" /></span>
      <span class="intro__tag">Stock to Stunning</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.intro {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  display: grid;
  place-items: center;
  background: radial-gradient(ellipse 90% 70% at 50% 45%, #0c1330, var(--c-ink) 70%);
  animation: intro-fade-in 0.3s $ease-out;

  &--leaving {
    animation: intro-out 0.65s $ease-inout forwards;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-md;
  }

  &__mark {
    display: grid;
    place-items: center;
    width: 76px;
    height: 76px;
    border-radius: 18px;
    font-family: $font-display;
    font-weight: $fw-black;
    font-size: 2.6rem;
    color: $color-white;
    background: $gradient-brand;
    box-shadow: $shadow-glow;
    transform: skewX(-6deg) scale(0.6);
    opacity: 0;
    animation: intro-mark 0.7s $ease-out 0.1s forwards;
  }

  &__word {
    font-family: $font-display;
    font-weight: $fw-black;
    font-size: clamp(1.8rem, 5vw, 2.6rem);
    letter-spacing: -0.02em;
    color: $color-white;
    opacity: 0;
    animation: intro-rise 0.6s $ease-out 0.45s forwards;
  }

  &__suffix { @include gradient-text($gradient-heat); }

  &__line {
    position: relative;
    width: 160px;
    height: 2px;
    border-radius: $radius-pill;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
  }

  &__line-fill {
    position: absolute;
    inset: 0;
    transform-origin: 0 50%;
    transform: scaleX(0);
    background: $gradient-brand;
    animation: intro-load 1.1s $ease-inout 0.5s forwards;
  }

  &__tag {
    font-size: $fs-xs;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--c-text-muted);
    opacity: 0;
    animation: intro-rise 0.6s $ease-out 0.7s forwards;
  }
}

@keyframes intro-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes intro-out {
  to { opacity: 0; transform: translateY(-3%); visibility: hidden; }
}
@keyframes intro-mark {
  to { opacity: 1; transform: skewX(-6deg) scale(1); }
}
@keyframes intro-rise {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
}
@keyframes intro-load {
  to { transform: scaleX(1); }
}
</style>

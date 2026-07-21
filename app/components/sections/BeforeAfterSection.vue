<script setup lang="ts">
/**
 * BeforeAfterSection — draggable "Stock → Stunning" reveal.
 * The divider position is a runtime value, so it's applied via a CSS custom
 * property set on the element ref (no inline style rules in the template).
 */
const { t } = useI18n()

const stage = ref<HTMLElement | null>(null)
const position = ref(52)

function apply(value: number) {
  position.value = Math.min(100, Math.max(0, value))
  stage.value?.style.setProperty('--reveal', `${position.value}%`)
}

function onPointer(event: PointerEvent) {
  if (event.buttons !== 1 && event.type === 'pointermove') return
  const rect = stage.value?.getBoundingClientRect()
  if (!rect) return
  apply(((event.clientX - rect.left) / rect.width) * 100)
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') apply(position.value - 4)
  if (event.key === 'ArrowRight') apply(position.value + 4)
}

onMounted(() => apply(position.value))
</script>

<template>
  <section class="ba">
    <div class="u-container ba__inner">
      <div v-reveal class="ba__copy">
        <span class="u-kicker"><span class="ba__line" />{{ t('hero.titleStock') }} → {{ t('hero.titleStunning') }}</span>
        <h2 class="ba__title">
          {{ t('hero.titleLead') }}
          <span class="u-gradient-text">{{ t('hero.titleStunning') }}</span>
        </h2>
        <p class="ba__lead">{{ t('services.lead') }}</p>
      </div>

      <div
        ref="stage"
        class="ba__stage"
        role="slider"
        tabindex="0"
        aria-label="Before and after wrap comparison"
        :aria-valuenow="Math.round(position)"
        aria-valuemin="0"
        aria-valuemax="100"
        @pointerdown="onPointer"
        @pointermove="onPointer"
        @keydown="onKey"
      >
        <!-- BEFORE (stock) -->
        <div class="panel panel--before">
          <span class="panel__word u-display">Stock</span>
          <span class="panel__tag">Before</span>
        </div>
        <!-- AFTER (stunning) — clipped by --reveal -->
        <div class="panel panel--after">
          <span class="panel__word u-display">Stunning</span>
          <span class="panel__tag panel__tag--after">After</span>
          <span class="panel__stripe panel__stripe--1" />
          <span class="panel__stripe panel__stripe--2" />
        </div>
        <!-- Divider handle -->
        <div class="ba__handle">
          <span class="ba__knob"><AppIcon name="arrow-right" :size="16" /></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.ba {
  @include section-space;

  &__inner {
    display: grid;
    gap: $space-2xl;
    align-items: center;
    grid-template-columns: 1fr;

    @include respond(lg) { grid-template-columns: 0.85fr 1.15fr; }
  }

  &__copy { display: flex; flex-direction: column; gap: $space-md; }
  &__line { width: 28px; height: 2px; background: $gradient-heat; border-radius: $radius-pill; }
  &__title { font-size: $fs-h2; }
  &__lead { color: var(--c-text-mist); font-size: $fs-lead; max-width: 32rem; }

  &__stage {
    --reveal: 52%;
    position: relative;
    aspect-ratio: 16 / 10;
    border-radius: $radius-lg;
    overflow: hidden;
    cursor: ew-resize;
    touch-action: none;
    user-select: none;
    border: 1px solid var(--c-line);
    box-shadow: $shadow-md;

    &:focus-visible { @include focus-ring; }
  }

  &__handle {
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--reveal);
    width: 2px;
    background: rgba(255, 255, 255, 0.85);
    transform: translateX(-1px);
    pointer-events: none;
  }

  &__knob {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    color: $color-white;
    background: $gradient-brand;
    box-shadow: $shadow-md;

    svg:first-child { transform: rotate(180deg); }
  }
}

.panel {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: $space-xl;

  &__word {
    font-size: clamp(2.5rem, 8vw, 5rem);
    line-height: 0.85;
  }

  &__tag {
    position: absolute;
    top: $space-lg;
    left: $space-xl;
    padding: 0.35rem 0.8rem;
    border-radius: $radius-sm;
    font-size: $fs-xs;
    font-weight: $fw-bold;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    background: rgba(5, 6, 13, 0.6);
    color: $color-white;

    &--after { left: auto; right: $space-xl; }
  }

  &--before {
    background:
      repeating-linear-gradient(45deg, #14161f 0 14px, #171a24 14px 28px);
    color: #6b7085;

    .panel__word { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.12); color: #3a3f52; }
  }

  &--after {
    clip-path: inset(0 calc(100% - var(--reveal)) 0 0);
    background: $gradient-brand;
    color: $color-white;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.3), transparent 50%);
      mix-blend-mode: screen;
    }
  }

  &__stripe {
    position: absolute;
    top: -20%;
    height: 140%;
    background: rgba(255, 255, 255, 0.16);
    transform: skewX(-16deg);
    &--1 { right: 30%; width: 16px; }
    &--2 { right: 24%; width: 7px; background: rgba(255, 255, 255, 0.26); }
  }
}
</style>

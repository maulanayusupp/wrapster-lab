<script setup lang="ts">
/**
 * ShowcaseModal — detail overlay for a selected build (placeholder story copy).
 * Closes on backdrop click, Esc, or the close button. Locks body scroll while open.
 */
import type { ShowcaseBuild } from '~/services/types'

const props = defineProps<{ build: ShowcaseBuild | null }>()
const emit = defineEmits<{ close: [] }>()

const { t } = useI18n()
const localePath = useLocalePath()
const contactHref = computed(() => `${localePath('/')}#${SECTION_IDS.contact}`)

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.build,
  (b) => {
    if (!import.meta.client) return
    document.body.classList.toggle('u-noscroll', !!b)
    if (b) window.addEventListener('keydown', onKey)
    else window.removeEventListener('keydown', onKey)
  },
)

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.classList.remove('u-noscroll')
    window.removeEventListener('keydown', onKey)
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="build"
        class="modal"
        role="dialog"
        aria-modal="true"
        :aria-label="build.concept"
        @click.self="emit('close')"
      >
        <div class="modal__panel">
          <button class="modal__close" :aria-label="t('showcase.close')" @click="emit('close')">
            <AppIcon name="close" :size="22" />
          </button>

          <div class="modal__poster" :class="`modal__poster--${build.theme}`">
            <span class="modal__poster-stripe" aria-hidden="true" />
            <span class="modal__poster-brand">{{ build.brand }}</span>
            <span class="modal__poster-model u-display">{{ build.model }}</span>
          </div>

          <div class="modal__content">
            <span class="u-kicker">{{ t(build.categoryKey) }}</span>
            <h2 class="modal__title u-display">{{ build.concept }}</h2>

            <h3 class="modal__label">{{ t('showcase.modal.overview') }}</h3>
            <p class="modal__desc">{{ t('showcase.modal.desc') }}</p>

            <h3 class="modal__label">{{ t('showcase.modal.specs') }}</h3>
            <dl class="modal__specs">
              <div><dt>{{ t('showcase.meta.vehicle') }}</dt><dd>{{ build.brand }} {{ build.model }}</dd></div>
              <div><dt>{{ t('showcase.meta.style') }}</dt><dd>{{ t(build.categoryKey) }}</dd></div>
              <div><dt>{{ t('showcase.meta.finish') }}</dt><dd>{{ t(build.finishKey) }}</dd></div>
              <div><dt>{{ t('showcase.meta.year') }}</dt><dd>{{ build.year }}</dd></div>
            </dl>

            <BaseButton v-magnetic :to="contactHref" size="lg" class="modal__cta" @click="emit('close')">
              {{ t('showcase.modal.cta') }}
              <template #icon><AppIcon name="arrow-right" :size="20" /></template>
            </BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  display: grid;
  place-items: center;
  padding: $container-pad;
  background: rgba(3, 4, 10, 0.72);
  backdrop-filter: blur(10px);
  overflow-y: auto;

  &__panel {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    width: min(100%, 900px);
    max-height: min(90vh, 900px);
    border-radius: $radius-xl;
    overflow: hidden;
    background: var(--c-surface);
    border: 1px solid var(--c-line);
    box-shadow: 0 40px 100px -30px rgba(0, 0, 0, 0.9);

    @include respond(md) { grid-template-columns: 0.95fr 1.05fr; }
  }

  &__close {
    position: absolute;
    top: $space-md;
    right: $space-md;
    z-index: 3;
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    color: $color-white;
    background: rgba(5, 6, 13, 0.5);
    backdrop-filter: blur(6px);
    transition: background $dur-base;
    &:hover { background: rgba(5, 6, 13, 0.8); }
  }

  &__poster {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.2rem;
    min-height: 240px;
    padding: $space-xl;
    color: $color-white;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 40%, rgba(5, 6, 13, 0.6));
    }

    &--heat    { background: linear-gradient(150deg, #ff5a1f, #ff2d78); }
    &--cool    { background: linear-gradient(150deg, #2f5cff, #22d3ee); }
    &--electric{ background: linear-gradient(150deg, #22d3ee, #2b6bff); }
    &--toxic   { background: linear-gradient(150deg, #a3e635, #16a34a); }
    &--sunset  { background: linear-gradient(150deg, #ff5a1f, #7c3aed); }
    &--mono    { background: linear-gradient(150deg, #2a2f45, #05060d); }
  }

  &__poster-stripe {
    position: absolute;
    top: -20%;
    right: 22%;
    width: 16px;
    height: 140%;
    background: rgba(255, 255, 255, 0.18);
    transform: skewX(-16deg);
  }
  &__poster-brand {
    position: relative;
    z-index: 1;
    font-size: $fs-xs;
    font-weight: $fw-bold;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    opacity: 0.9;
  }
  &__poster-model {
    position: relative;
    z-index: 1;
    font-size: clamp(2.5rem, 6vw, 4rem);
    line-height: 0.85;
  }

  &__content {
    padding: clamp(1.5rem, 4vw, 2.5rem);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: $space-sm;
  }

  &__title {
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    letter-spacing: -0.02em;
  }

  &__label {
    margin-top: $space-md;
    font-family: $font-body;
    font-size: $fs-xs;
    font-weight: $fw-bold;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--c-text-muted);
  }

  &__desc {
    color: var(--c-text-mist);
    font-size: $fs-sm;
  }

  &__specs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-sm;

    div {
      padding: $space-sm $space-md;
      border-radius: $radius-md;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--c-line);
    }
    dt {
      font-size: $fs-xs;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--c-text-muted);
    }
    dd { font-weight: $fw-semibold; margin-top: 2px; }
  }

  &__cta { margin-top: $space-lg; align-self: flex-start; }
}

.modal-enter-active,
.modal-leave-active { transition: opacity $dur-base $ease-out; }
.modal-enter-from,
.modal-leave-to { opacity: 0; }
.modal-enter-active .modal__panel,
.modal-leave-active .modal__panel { transition: transform $dur-base $ease-out; }
.modal-enter-from .modal__panel,
.modal-leave-to .modal__panel { transform: translateY(24px) scale(0.98); }
</style>

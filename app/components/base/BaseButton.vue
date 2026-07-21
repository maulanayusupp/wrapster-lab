<script setup lang="ts">
/**
 * BaseButton — the single button primitive.
 * Renders as <button>, <a>, or <NuxtLink> depending on props.
 */
interface Props {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'md' | 'lg'
  to?: string
  href?: string
  block?: boolean
  type?: 'button' | 'submit'
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const extraAttrs = computed(() => {
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener' }
  if (props.to) return { to: props.to }
  return { type: props.type }
})
</script>

<template>
  <component
    :is="tag"
    v-bind="extraAttrs"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block }]"
  >
    <span class="btn__label"><slot /></span>
    <span v-if="$slots.icon" class="btn__icon"><slot name="icon" /></span>
  </component>
</template>

<style scoped lang="scss">
.btn {
  --btn-pad-y: 0.85rem;
  --btn-pad-x: 1.6rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-xs;
  padding: var(--btn-pad-y) var(--btn-pad-x);
  border-radius: $radius-pill;
  font-family: $font-body;
  font-weight: $fw-bold;
  font-size: $fs-sm;
  letter-spacing: 0.02em;
  line-height: 1;
  white-space: nowrap;
  transition: transform $dur-fast $ease-out, box-shadow $dur-base $ease-out,
    background $dur-base $ease-out, border-color $dur-base $ease-out, opacity $dur-fast;

  &:active {
    transform: scale(0.97);
  }

  &--lg {
    --btn-pad-y: 1.05rem;
    --btn-pad-x: 2.1rem;
    font-size: $fs-body;
  }

  &--block {
    display: flex;
    width: 100%;
  }

  &__icon {
    display: inline-flex;
    transition: transform $dur-base $ease-out;
  }

  &:hover &__icon {
    transform: translateX(3px);
  }

  // Primary — signature gradient with glow.
  &--primary {
    color: $color-white;
    background: $gradient-brand;
    background-size: 180% 180%;
    background-position: 0% 50%;
    box-shadow: 0 8px 30px rgba(47, 92, 255, 0.35);

    &:hover {
      background-position: 100% 50%;
      box-shadow: 0 10px 40px rgba(47, 92, 255, 0.5);
    }
  }

  // Outline — gradient hairline border.
  &--outline {
    color: $color-white;
    background: rgba(255, 255, 255, 0.02);
    @include gradient-border($radius-pill, 1.5px);

    &:hover {
      background: rgba(255, 255, 255, 0.06);
    }
  }

  // Ghost — subtle, text-forward.
  &--ghost {
    color: var(--c-text-mist);
    background: transparent;

    &:hover {
      color: $color-white;
      background: rgba(255, 255, 255, 0.05);
    }
  }
}
</style>

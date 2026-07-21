<script setup lang="ts">
/**
 * ContactForm — a lead form that composes a prefilled WhatsApp message from the
 * entered details and opens wa.me (no backend; fully functional). The message
 * text and labels are localized.
 */
import { whatsappLink } from '~/utils/format'

const { t } = useI18n()
const appConfig = useAppConfig()

const form = reactive({ name: '', phone: '', vehicle: '', message: '' })

const waHref = computed(() => {
  const lines = [
    t('contactPage.form.waIntro'),
    form.name && `${t('contactPage.form.name')}: ${form.name}`,
    form.phone && `${t('contactPage.form.phone')}: ${form.phone}`,
    form.vehicle && `${t('contactPage.form.vehicle')}: ${form.vehicle}`,
    form.message && `${t('contactPage.form.message')}: ${form.message}`,
  ].filter(Boolean)
  return whatsappLink(appConfig.contact.phoneIntl, lines.join('\n'))
})

function onSubmit() {
  window.open(waHref.value, '_blank', 'noopener')
}
</script>

<template>
  <form class="cform" @submit.prevent="onSubmit">
    <h2 class="cform__title u-display">{{ t('contactPage.form.title') }}</h2>

    <div class="cform__row">
      <label class="field">
        <span class="field__label">{{ t('contactPage.form.name') }}</span>
        <input v-model="form.name" type="text" class="field__input" :placeholder="t('contactPage.form.namePlaceholder')">
      </label>
      <label class="field">
        <span class="field__label">{{ t('contactPage.form.phone') }}</span>
        <input v-model="form.phone" type="tel" class="field__input" :placeholder="t('contactPage.form.phonePlaceholder')">
      </label>
    </div>

    <label class="field">
      <span class="field__label">{{ t('contactPage.form.vehicle') }}</span>
      <input v-model="form.vehicle" type="text" class="field__input" :placeholder="t('contactPage.form.vehiclePlaceholder')">
    </label>

    <label class="field">
      <span class="field__label">{{ t('contactPage.form.message') }}</span>
      <textarea v-model="form.message" rows="4" class="field__input field__input--area" :placeholder="t('contactPage.form.messagePlaceholder')" />
    </label>

    <BaseButton v-magnetic type="submit" size="lg" block>
      {{ t('contactPage.form.submit') }}
      <template #icon><AppIcon name="whatsapp" :size="20" /></template>
    </BaseButton>

    <p class="cform__note">{{ t('contactPage.form.note') }}</p>
  </form>
</template>

<style scoped lang="scss">
.cform {
  display: flex;
  flex-direction: column;
  gap: $space-md;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border-radius: $radius-xl;
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  @include card-depth;

  &__title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    letter-spacing: -0.02em;
    margin-bottom: $space-2xs;
  }

  &__row {
    display: grid;
    gap: $space-md;
    grid-template-columns: 1fr;

    @include respond(sm) { grid-template-columns: 1fr 1fr; }
  }

  &__note {
    font-size: $fs-xs;
    color: var(--c-text-muted);
    text-align: center;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: $space-2xs;

  &__label {
    font-size: $fs-sm;
    font-weight: $fw-semibold;
    color: var(--c-text-mist);
  }

  &__input {
    padding: 0.85rem 1rem;
    border-radius: $radius-md;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--c-line);
    color: var(--c-text);
    font-size: $fs-body;
    transition: border-color $dur-base, background $dur-base;

    &::placeholder { color: var(--c-text-muted); }
    &:hover { border-color: rgba(255, 255, 255, 0.2); }
    &:focus {
      outline: none;
      border-color: $color-blue;
      background: rgba(47, 92, 255, 0.06);
    }

    &--area { resize: vertical; min-height: 110px; font-family: $font-body; }
  }
}
</style>

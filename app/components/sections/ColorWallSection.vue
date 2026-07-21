<script setup lang="ts">
/**
 * ColorWallSection — a taste of the 80+ color wall.
 * Swatch hex values are runtime data (from the content service), so each
 * swatch color is applied to its element ref rather than via a template style
 * attribute, keeping the markup free of inline CSS.
 */
import { SECTION_IDS } from '~/utils/constants'
import { contentService } from '~/services/content.service'

const { t } = useI18n()
const swatches = contentService.getColorWall()

const wall = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!wall.value) return
  const chips = wall.value.querySelectorAll<HTMLElement>('[data-hex]')
  chips.forEach((chip) => {
    const hex = chip.dataset.hex
    if (hex) chip.style.setProperty('--swatch', hex)
  })
})
</script>

<template>
  <section :id="SECTION_IDS.colors" class="colors">
    <div class="u-container">
      <SectionHeading
        :kicker="t('colors.kicker')"
        :title="t('colors.title')"
        :lead="t('colors.lead')"
        align="center"
      />

      <div ref="wall" class="colors__wall">
        <button
          v-for="(swatch, i) in swatches"
          :key="swatch.id"
          v-reveal="i * 40"
          class="swatch"
          :data-hex="swatch.hex"
          type="button"
        >
          <span class="swatch__chip" aria-hidden="true" />
          <span class="swatch__meta">
            <span class="swatch__name">{{ t(swatch.nameKey) }}</span>
            <span class="swatch__finish">{{ t(swatch.finishKey) }}</span>
          </span>
        </button>
      </div>

      <p class="colors__note">{{ t('colors.note') }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.colors {
  @include section-space;
  background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(168, 85, 247, 0.08), transparent 70%);

  &__wall {
    display: grid;
    gap: $space-sm;
    grid-template-columns: repeat(2, 1fr);

    @include respond(sm) { grid-template-columns: repeat(3, 1fr); }
    @include respond(md) { grid-template-columns: repeat(5, 1fr); }
  }

  &__note {
    margin-top: $space-xl;
    text-align: center;
    font-size: $fs-sm;
    color: var(--c-text-muted);
  }
}

.swatch {
  --swatch: #333;
  display: flex;
  flex-direction: column;
  gap: $space-sm;
  padding: $space-sm;
  border-radius: $radius-md;
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  text-align: left;
  transition: transform $dur-base $ease-out, border-color $dur-base;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.24);
    .swatch__chip { box-shadow: 0 0 24px -4px var(--swatch); }
  }

  &__chip {
    display: block;
    aspect-ratio: 3 / 2;
    border-radius: $radius-sm;
    background: var(--swatch);
    border: 1px solid rgba(255, 255, 255, 0.12);
    transition: box-shadow $dur-base $ease-out;
  }

  &__meta { display: flex; flex-direction: column; }
  &__name { font-size: $fs-sm; font-weight: $fw-semibold; }
  &__finish {
    font-size: $fs-xs;
    color: var(--c-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
}
</style>

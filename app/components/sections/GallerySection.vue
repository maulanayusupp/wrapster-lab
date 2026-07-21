<script setup lang="ts">
/**
 * GallerySection — poster-style showcase echoing the brand's IG grid.
 * Each tile renders a real photo from /public/gallery/ over its themed gradient.
 * Missing/broken photos fall back to the gradient poster automatically, so the
 * section always looks intentional even before portfolio images are added.
 * Filenames are defined in content.service.ts → getGallery().
 */
import { SECTION_IDS } from '~/utils/constants'
import { contentService } from '~/services/content.service'

const { t } = useI18n()
const appConfig = useAppConfig()
const items = contentService.getGallery()

// Track photos that fail to load so the gradient poster shows through instead
// of a broken image (e.g. before real portfolio files are added).
const failed = reactive(new Set<string>())

</script>

<template>
  <section :id="SECTION_IDS.work" class="gallery">
    <div class="u-container">
      <div class="gallery__head">
        <SectionHeading
          :kicker="t('gallery.kicker')"
          :title="t('gallery.title')"
          :lead="t('gallery.lead')"
        />
        <BaseButton :href="appConfig.social.instagram" variant="outline" class="gallery__cta">
          {{ t('gallery.cta') }}
          <template #icon><AppIcon name="external" :size="18" /></template>
        </BaseButton>
      </div>

      <div class="gallery__grid">
        <article
          v-for="(item, i) in items"
          :key="item.id"
          v-reveal="i * 60"
          class="tile"
          :class="[`tile--${item.theme}`, { 'tile--wide': i === 0, 'tile--tall': i === 3 }]"
        >
          <img
            v-if="item.image && !failed.has(item.id)"
            :src="item.image"
            :alt="`${item.brand} ${item.model} — ${t(item.categoryKey)}`"
            class="tile__img"
            loading="lazy"
            decoding="async"
            @error="failed.add(item.id)"
          >
          <div class="tile__overlay" aria-hidden="true" />
          <span class="tile__brand">{{ item.brand }}</span>
          <h3 class="tile__model u-display">{{ item.model }}</h3>
          <span class="tile__cat">{{ t(item.categoryKey) }}</span>
          <span class="tile__stripe" aria-hidden="true" />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.gallery {
  @include section-space;

  &__head {
    display: flex;
    flex-wrap: wrap;
    gap: $space-lg;
    align-items: flex-end;
    justify-content: space-between;

    :deep(.heading) { margin-bottom: $space-xl; }
  }

  &__cta { margin-bottom: $space-xl; }

  &__grid {
    display: grid;
    gap: $space-md;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;

    @include respond(md) {
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 220px;
    }
  }
}

.tile {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: $space-lg;
  border-radius: $radius-lg;
  overflow: hidden;
  color: $color-white;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform $dur-base $ease-out;

  &:hover {
    transform: translateY(-5px) scale(1.01);
    .tile__stripe { transform: skewX(-16deg) translateX(6px); }
  }

  @include respond(md) {
    &--wide { grid-column: span 2; }
    &--tall { grid-row: span 2; }
  }

  &__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    transition: transform $dur-slow $ease-out;
  }

  &:hover &__img {
    transform: scale(1.05);
  }

  &__overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background:
      radial-gradient(circle at 75% 15%, rgba(255, 255, 255, 0.18), transparent 45%),
      linear-gradient(180deg, rgba(5, 6, 13, 0.15) 20%, rgba(5, 6, 13, 0.8));
    mix-blend-mode: normal;
  }

  &__brand {
    position: relative;
    z-index: 2;
    font-size: $fs-xs;
    font-weight: $fw-bold;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    opacity: 0.85;
  }

  &__model {
    position: relative;
    z-index: 2;
    font-size: clamp(1.8rem, 4vw, 3rem);
    line-height: 0.85;
    text-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }

  &__cat {
    position: relative;
    z-index: 2;
    margin-top: $space-xs;
    align-self: flex-start;
    padding: 0.3rem 0.7rem;
    border-radius: $radius-pill;
    font-size: $fs-xs;
    font-weight: $fw-semibold;
    background: rgba(5, 6, 13, 0.5);
    backdrop-filter: blur(6px);
  }

  &__stripe {
    position: absolute;
    top: -20%;
    right: 18%;
    width: 12px;
    height: 140%;
    background: rgba(255, 255, 255, 0.16);
    transform: skewX(-16deg);
    transition: transform $dur-base $ease-out;
  }

  // Theme gradients (map 1:1 with GalleryTheme).
  &--heat    { background: linear-gradient(150deg, #ff5a1f, #ff2d78); }
  &--cool    { background: linear-gradient(150deg, #2b6bff, #7c3aed); }
  &--electric{ background: linear-gradient(150deg, #22d3ee, #2b6bff); }
  &--toxic   { background: linear-gradient(150deg, #a3e635, #16a34a); }
  &--sunset  { background: linear-gradient(150deg, #ff5a1f, #a855f7); }
  &--mono    { background: linear-gradient(150deg, #2a2f45, #05060d); }
}
</style>

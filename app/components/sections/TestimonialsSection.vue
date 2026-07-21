<script setup lang="ts">
/** TestimonialsSection — rider quotes (placeholder copy, see todo.md). */
import { contentService } from '~/services/content.service'

const { t } = useI18n()
const testimonials = contentService.getTestimonials()
</script>

<template>
  <section class="testimonials">
    <div class="u-container">
      <SectionHeading
        :kicker="t('testimonials.kicker')"
        :title="t('testimonials.title')"
        align="center"
      />

      <div class="testimonials__grid">
        <figure
          v-for="(item, i) in testimonials"
          :key="item.id"
          v-reveal="i * 80"
          v-spotlight
          class="quote"
        >
          <AppIcon name="quote" :size="34" class="quote__mark" />
          <blockquote class="quote__text">{{ t(item.quoteKey) }}</blockquote>
          <figcaption class="quote__author">
            <span class="quote__avatar u-display">{{ item.author.charAt(0) }}</span>
            <span class="quote__who">
              <span class="quote__name">{{ item.author }}</span>
              <span class="quote__vehicle">{{ item.handle }} · {{ item.vehicle }}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.testimonials {
  @include section-space;

  &__grid {
    display: grid;
    gap: $space-md;
    grid-template-columns: 1fr;

    @include respond(md) { grid-template-columns: repeat(3, 1fr); }
  }
}

.quote {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: $space-md;
  padding: $space-xl $space-lg;
  border-radius: $radius-lg;
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  @include card-depth;
  transition: transform $dur-base $ease-out, border-color $dur-base, box-shadow $dur-base;

  & > *:not(.spotlight-layer) {
    position: relative;
    z-index: 1;
  }

  &:hover { transform: translateY(-4px); border-color: rgba(43, 140, 255, 0.4); @include card-depth-hover; }

  &__mark { color: $color-purple; opacity: 0.7; }

  &__text {
    font-size: $fs-lead;
    line-height: 1.5;
    color: var(--c-text);
  }

  &__author {
    display: flex;
    align-items: center;
    gap: $space-sm;
    margin-top: auto;
  }

  &__avatar {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    color: $color-white;
    background: $gradient-brand;
    font-size: 1.2rem;
  }

  &__who { display: flex; flex-direction: column; }
  &__name { font-weight: $fw-semibold; }
  &__vehicle { font-size: $fs-xs; color: var(--c-text-muted); }
}
</style>

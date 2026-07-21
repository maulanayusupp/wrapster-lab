<script setup lang="ts">
/**
 * /showcase — the Build Gallery. A curated, filterable archive of builds with a
 * featured hero build and a detail modal. Placeholder concepts + CSS gradient
 * posters for now (see content.service getShowcaseBuilds).
 */
import { contentService } from '~/services/content.service'
import type { ShowcaseBuild } from '~/services/types'

const { t } = useI18n()
const localePath = useLocalePath()
// Contact lives on the home page — link there with the hash from any page.
const contactLink = computed(() => `${localePath('/')}#${SECTION_IDS.contact}`)

useAppSeo({
  title: t('seo.showcase.title'),
  description: t('seo.showcase.desc'),
})

const builds = contentService.getShowcaseBuilds()
const featured = builds.find((b) => b.featured) ?? builds[0]
const gridBuilds = builds.filter((b) => !b.featured)

// Filter categories present in the grid, with "all" first.
const categories = computed(() => {
  const set = [...new Set(gridBuilds.map((b) => b.category))]
  return ['all', ...set] as const
})
const activeCat = ref<string>('all')
const filtered = computed(() =>
  activeCat.value === 'all'
    ? gridBuilds
    : gridBuilds.filter((b) => b.category === activeCat.value),
)

function catLabel(cat: string) {
  return cat === 'all' ? t('showcase.filterAll') : t(`gallery.cat.${cat}`)
}

// Detail modal
const selected = ref<ShowcaseBuild | null>(null)
function open(build: ShowcaseBuild) {
  selected.value = build
}
</script>

<template>
  <div class="showcase">
    <!-- Header -->
    <section class="showcase__head">
      <span class="showcase__orb" aria-hidden="true" />
      <div class="u-container">
        <SectionHeading
          :kicker="t('showcase.kicker')"
          :title="t('showcase.title')"
          :lead="t('showcase.lead')"
        />
        <p v-reveal="120" class="showcase__counter">
          <span class="showcase__counter-num u-display u-gradient-text">{{ builds.length }}+</span>
          {{ t('showcase.counter') }}
        </p>
      </div>
    </section>

    <!-- Featured build -->
    <section v-if="featured" class="showcase__featured u-container">
      <button
        v-reveal
        type="button"
        class="feat"
        :class="`feat--${featured.theme}`"
        @click="open(featured)"
      >
        <span class="feat__stripe" aria-hidden="true" />
        <span class="feat__overlay" aria-hidden="true" />
        <span class="feat__badge">{{ t('showcase.featured') }}</span>
        <span class="feat__info">
          <span class="feat__brand">{{ featured.brand }} · {{ t(featured.categoryKey) }}</span>
          <span class="feat__concept u-display">{{ featured.concept }}</span>
          <span class="feat__model">{{ featured.model }}</span>
          <span class="feat__view">{{ t('showcase.view') }} <AppIcon name="arrow-right" :size="18" /></span>
        </span>
      </button>
    </section>

    <!-- Filter + grid -->
    <section class="showcase__gallery u-container">
      <div v-reveal class="showcase__filter" role="tablist" :aria-label="t('showcase.filterLabel')">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="chip"
          :class="{ 'is-active': activeCat === cat }"
          role="tab"
          :aria-selected="activeCat === cat"
          @click="activeCat = cat"
        >
          {{ catLabel(cat) }}
        </button>
      </div>

      <TransitionGroup tag="div" name="grid" class="showcase__grid">
        <ShowcaseCard
          v-for="build in filtered"
          :key="build.id"
          :build="build"
          @open="open"
        />
      </TransitionGroup>
    </section>

    <!-- CTA -->
    <section class="showcase__cta u-container">
      <div v-reveal class="cta-band">
        <span class="cta-band__glow" aria-hidden="true" />
        <h2 class="cta-band__title u-display">{{ t('showcase.cta.title') }}</h2>
        <p class="cta-band__sub">{{ t('showcase.cta.subtitle') }}</p>
        <BaseButton v-magnetic :to="contactLink" size="lg">
          {{ t('showcase.cta.button') }}
          <template #icon><AppIcon name="arrow-right" :size="20" /></template>
        </BaseButton>
      </div>
    </section>

    <ShowcaseModal :build="selected" @close="selected = null" />
  </div>
</template>

<style scoped lang="scss">
.showcase {
  padding-top: $header-height;

  &__head {
    position: relative;
    overflow: hidden;
    padding-block: clamp(3rem, 8vw, 6rem) clamp(2rem, 5vw, 3.5rem);

    > .u-container { position: relative; z-index: 1; }
    :deep(.heading) { margin-bottom: $space-lg; }
  }

  &__orb {
    position: absolute;
    top: -30%;
    right: -8%;
    width: min(48vw, 620px);
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(47, 92, 255, 0.3), transparent 66%);
    filter: blur(70px);
    pointer-events: none;
  }

  &__counter {
    display: inline-flex;
    align-items: baseline;
    gap: $space-xs;
    font-size: $fs-lead;
    color: var(--c-text-mist);
  }
  &__counter-num { font-size: clamp(1.8rem, 4vw, 2.6rem); }

  &__featured { padding-bottom: clamp(2rem, 5vw, 3.5rem); }

  &__filter {
    display: flex;
    flex-wrap: wrap;
    gap: $space-sm;
    margin-bottom: $space-xl;
  }

  &__grid {
    display: grid;
    gap: $space-md;
    grid-template-columns: repeat(2, 1fr);

    @include respond(md) { grid-template-columns: repeat(3, 1fr); }
    @include respond(lg) { grid-template-columns: repeat(4, 1fr); }
  }

  &__cta { padding-block: clamp(3rem, 7vw, 5.5rem); }
}

// Filter chips
.chip {
  padding: 0.6rem 1.2rem;
  border-radius: $radius-pill;
  font-size: $fs-sm;
  font-weight: $fw-semibold;
  color: var(--c-text-mist);
  border: 1px solid var(--c-line);
  background: rgba(255, 255, 255, 0.02);
  transition: color $dur-fast, border-color $dur-base, background $dur-base;

  &:hover { color: $color-white; border-color: rgba(255, 255, 255, 0.2); }
  &.is-active {
    color: $color-white;
    background: $gradient-brand;
    border-color: transparent;
  }
  &:focus-visible { @include focus-ring; }
}

// Featured build card
.feat {
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  min-height: clamp(320px, 42vw, 460px);
  padding: clamp(1.5rem, 4vw, 3rem);
  border-radius: $radius-xl;
  overflow: hidden;
  color: $color-white;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.1);
  @include card-depth;
  transition: transform $dur-base $ease-out, box-shadow $dur-base;

  &:hover {
    transform: translateY(-4px);
    @include card-depth-hover;
    .feat__stripe { transform: skewX(-16deg) translateX(12px); }
    .feat__view { gap: $space-sm; }
  }
  &:focus-visible { @include focus-ring; }

  &--heat    { background: linear-gradient(120deg, #ff5a1f, #ff2d78); }
  &--cool    { background: linear-gradient(120deg, #2f5cff, #22d3ee); }
  &--electric{ background: linear-gradient(120deg, #22d3ee, #2b6bff); }
  &--toxic   { background: linear-gradient(120deg, #a3e635, #16a34a); }
  &--sunset  { background: linear-gradient(120deg, #ff5a1f, #7c3aed); }
  &--mono    { background: linear-gradient(120deg, #2a2f45, #05060d); }

  &__stripe {
    position: absolute;
    top: -20%;
    right: 26%;
    width: 22px;
    height: 140%;
    background: rgba(255, 255, 255, 0.16);
    transform: skewX(-16deg);
    transition: transform $dur-slow $ease-out;
  }
  &__overlay {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 80% 15%, rgba(255, 255, 255, 0.22), transparent 45%),
      linear-gradient(180deg, transparent 35%, rgba(5, 6, 13, 0.72));
  }
  &__badge {
    position: absolute;
    top: clamp(1.5rem, 4vw, 3rem);
    left: clamp(1.5rem, 4vw, 3rem);
    z-index: 1;
    padding: 0.4rem 0.9rem;
    border-radius: $radius-pill;
    font-size: $fs-xs;
    font-weight: $fw-bold;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    background: rgba(5, 6, 13, 0.55);
    backdrop-filter: blur(6px);
  }
  &__info { position: relative; z-index: 1; display: flex; flex-direction: column; gap: $space-2xs; }
  &__brand {
    font-size: $fs-sm;
    font-weight: $fw-semibold;
    letter-spacing: 0.08em;
    opacity: 0.9;
  }
  &__concept {
    font-size: clamp(2.4rem, 6vw, 4.5rem);
    line-height: 0.9;
    text-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  }
  &__model {
    font-weight: $fw-bold;
    letter-spacing: 0.06em;
  }
  &__view {
    display: inline-flex;
    align-items: center;
    gap: $space-xs;
    margin-top: $space-sm;
    font-weight: $fw-bold;
    transition: gap $dur-base $ease-out;
  }
}

// CTA band (mirror of home contact band)
.cta-band {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $space-md;
  padding: clamp(2.5rem, 7vw, 5rem) $space-lg;
  border-radius: $radius-xl;
  overflow: hidden;
  background: $gradient-brand;
  box-shadow: $shadow-md, $shadow-glow;

  &__glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% -20%, rgba(255, 255, 255, 0.35), transparent 55%);
    mix-blend-mode: screen;
  }
  &__title { position: relative; font-size: clamp(2rem, 5vw, 3.2rem); color: $color-white; max-width: 18ch; }
  &__sub { position: relative; color: rgba(255, 255, 255, 0.9); font-size: $fs-lead; }
  :deep(.btn--primary) { background: $color-white; color: $color-ink; box-shadow: $shadow-md; }
}

// Filter grid transitions
.grid-move,
.grid-enter-active,
.grid-leave-active { transition: opacity $dur-base $ease-out, transform $dur-base $ease-out; }
.grid-enter-from { opacity: 0; transform: scale(0.94) translateY(12px); }
.grid-leave-active { position: absolute; }
.grid-leave-to { opacity: 0; transform: scale(0.94); }
</style>

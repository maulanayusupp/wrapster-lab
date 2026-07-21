<script setup lang="ts">
/**
 * Home / landing page.
 * Composes the section components in narrative order and wires localized SEO.
 * Section content comes from the content service via each section component —
 * this file only orchestrates layout + page-level meta.
 */
const { t } = useI18n()

useAppSeo({
  title: t('seo.home.title'),
  description: t('seo.home.desc'),
})
</script>

<template>
  <div class="home">
    <HeroSection />
    <MarqueeStrip />
    <ServicesSection />
    <BeforeAfterSection />
    <StatsSection />
    <ProcessSection />
    <GallerySection />
    <ColorWallSection />
    <FeaturesSection />
    <TestimonialsSection />
    <EventSection />
    <ContactSection />
  </div>
</template>

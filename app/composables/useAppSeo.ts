/**
 * useAppSeo — centralized SEO helper.
 *
 * Wraps Nuxt's `useSeoMeta` + i18n `useLocaleHead` so every page/section gets:
 *  - title + description (localized)
 *  - Open Graph + Twitter cards
 *  - canonical + hreflang alternates (from @nuxtjs/i18n)
 *  - JSON-LD structured data (LocalBusiness) for rich results
 *
 * Usage in a page:
 *   useAppSeo({ title: t('seo.home.title'), description: t('seo.home.desc') })
 */
interface AppSeoOptions {
  title: string
  description: string
  /** Absolute or root-relative OG image path. */
  image?: string
  /** Append the brand name after the title. Default true. */
  withBrand?: boolean
}

export function useAppSeo(options: AppSeoOptions) {
  // JPEG keeps the share image well under WhatsApp's preview size limit so the
  // thumbnail reliably renders in chats.
  const { title, description, image = '/og-image.jpg', withBrand = true } = options

  const config = useRuntimeConfig()
  const appConfig = useAppConfig()
  const i18nHead = useLocaleHead({ addSeoAttributes: true })

  const siteUrl = config.public.siteUrl
  const fullTitle = withBrand ? `${title} — ${appConfig.brand.name}` : title
  const ogImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  // Reactive head: canonical, hreflang, html lang/dir come from i18nHead.
  useHead({
    htmlAttrs: computed(() => i18nHead.value.htmlAttrs || {}),
    link: computed(() => [...(i18nHead.value.link || [])]),
    meta: computed(() => [...(i18nHead.value.meta || [])]),
  })

  const imageAlt = `${appConfig.brand.name} — ${appConfig.brand.tagline}`

  useSeoMeta({
    title: fullTitle,
    description,
    ogType: 'website',
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage,
    ogImageSecureUrl: ogImage,
    ogImageType: 'image/jpeg',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: imageAlt,
    ogSiteName: appConfig.brand.name,
    ogUrl: siteUrl,
    ogLocale: 'en_US',
    ogLocaleAlternate: 'id_ID',
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterImageAlt: imageAlt,
    themeColor: '#070912',
  })

  // JSON-LD LocalBusiness structured data.
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AutoBodyShop',
          name: appConfig.brand.name,
          description,
          image: ogImage,
          url: siteUrl,
          telephone: appConfig.contact.phoneIntl,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Jl. Gunung Batu No.183',
            addressLocality: 'Cimahi',
            addressRegion: 'West Java',
            addressCountry: 'ID',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: appConfig.contact.geo.lat,
            longitude: appConfig.contact.geo.lng,
          },
          hasMap: appConfig.contact.maps,
          sameAs: [appConfig.social.instagram, appConfig.social.linktree],
          slogan: appConfig.brand.tagline,
        }),
      },
    ],
  })
}

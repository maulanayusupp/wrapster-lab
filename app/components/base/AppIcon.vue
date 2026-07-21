<script setup lang="ts">
/**
 * AppIcon — inline SVG icon set (no external icon dependency).
 * Add a new icon = add an entry to `ICONS`. Stroke-based, currentColor.
 */
interface Props {
  name: string
  size?: number | string
  strokeWidth?: number
}
const props = withDefaults(defineProps<Props>(), {
  size: 24,
  strokeWidth: 1.8,
})

// Each value is the inner markup of a 24x24 viewBox icon.
const ICONS: Record<string, string> = {
  printer: '<path d="M6 9V3h12v6"/><rect x="4" y="9" width="16" height="8" rx="2"/><path d="M8 17h8v4H8z"/><circle cx="17" cy="12.5" r="0.6" fill="currentColor"/>',
  panels: '<rect x="3" y="4" width="7" height="16" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="6" rx="1.5"/>',
  car: '<path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11"/><path d="M3 11h18v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><circle cx="7.5" cy="14" r="1"/><circle cx="16.5" cy="14" r="1"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.7-.9 1.4-1.9-.3-1 .4-1.9 1.4-1.9H17a4 4 0 0 0 4-4c0-5-4-10.2-9-10.2z"/><circle cx="7.5" cy="11" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.5" cy="11" r="1"/>',
  droplet: '<path d="M12 3s6 5.7 6 10a6 6 0 0 1-12 0c0-4.3 6-10 6-10z"/>',
  ship: '<path d="M3 14l2-6h14l2 6"/><path d="M4 14h16l-1.5 5a2 2 0 0 1-1.9 1.4H7.4A2 2 0 0 1 5.5 19z"/><path d="M12 4v4M9 6h6"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"/><path d="M9.5 12l1.8 1.8L15 10"/>',
  badge: '<circle cx="12" cy="10" r="6"/><path d="M9.5 10l1.8 1.7L15 8.5"/><path d="M8.5 15.5L7 21l5-2.2L17 21l-1.5-5.5"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8.5 12.2l2.4 2.4 4.6-4.9"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.5 3.8 5.6 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z"/>',
  spark: '<path d="M12 3l1.8 5.6L19 10.4l-5.2 1.8L12 18l-1.8-5.8L5 10.4l5.2-1.8z"/>',
  infinity: '<path d="M6.5 9a3 3 0 1 0 0 6c2 0 3.2-2 5.5-3s3.5-3 5.5-3a3 3 0 1 1 0 6c-2 0-3.2-2-5.5-3S8.5 9 6.5 9z"/>',
  'arrow-right': '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
  'arrow-down': '<path d="M12 5v14"/><path d="M6 13l6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1" fill="currentColor"/>',
  whatsapp: '<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1l-1.6-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-1.6c-.5 0-1 .4-1 1z" fill="currentColor" stroke="none"/>',
  phone: '<path d="M6 3h3l1.5 5-2 1.5a11 11 0 0 0 5 5l1.5-2 5 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/>',
  'map-pin': '<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  'external': '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
  quote: '<path d="M8 6c-2.5 1-4 3.2-4 6v6h6v-6H6c0-2 .8-3.4 3-4.2zM20 6c-2.5 1-4 3.2-4 6v6h6v-6h-4c0-2 .8-3.4 3-4.2z" fill="currentColor" stroke="none"/>',
  calendar: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/>',
}

const inner = computed(() => ICONS[props.name] ?? '')
const dimension = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
  <svg
    class="app-icon"
    :width="dimension"
    :height="dimension"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    v-html="inner"
  />
</template>

<style scoped lang="scss">
.app-icon {
  flex-shrink: 0;
}
</style>

<script setup lang="ts">
// Default layout — persistent header + footer around routed page content.
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main class="layout__main">
      <slot />
    </main>
    <AppFooter />
    <div class="grain" aria-hidden="true" />
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100svh;

  &__main {
    flex: 1;
  }
}
</style>

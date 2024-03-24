<script setup lang="ts">
  import Footer from '~/components/layout/Footer.vue';
  import Nav from '~/components/layout/Nav.vue';
</script>

<template>
  <header>
    <Nav />
  </header>
  <main id="main">
    <slot />
  </main>
  <Footer />
</template>

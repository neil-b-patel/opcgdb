<script setup lang="ts">
  import Nav from '~/components/Nav.vue';
</script>

<template>
  <header>
    <Nav />
  </header>
  <main id="main">
    <slot />
  </main>
  <footer>
    <p>&copy; 2023</p>
  </footer>
</template>

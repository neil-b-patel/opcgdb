<script setup lang="ts">
  import DatabaseProvider from '~/providers/DatabaseProvider.vue';

  import './styles/main.css';
</script>

<template>
  <DatabaseProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </DatabaseProvider>
</template>

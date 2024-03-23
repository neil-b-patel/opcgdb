<script setup lang="ts">
  import DatabaseProvider from '~/providers/DatabaseProvider.vue';

  import './styles/reset.css';
</script>

<template>
  <DatabaseProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </DatabaseProvider>
</template>

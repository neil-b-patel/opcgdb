<script setup lang="ts">
  import DatabaseProvider from '~/providers/DatabaseProvider.vue';
</script>

<template>
  <DatabaseProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </DatabaseProvider>
</template>

<script setup lang="ts">
  import DatabaseProvider from '~/providers/DatabaseProvider.vue';

  import './styles/reset.css';
  import './styles/variables.css';

  import './styles/main.css';
</script>

<template>
  <DatabaseProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </DatabaseProvider>
</template>

<script lang="ts" setup>
  import { provide } from 'vue';

  import { cards, sets } from '@opcgdb/data';

  const db = {
    cards,
    sets,
  };

  provide('opcgdb', db);
</script>

<template>
  <slot />
</template>

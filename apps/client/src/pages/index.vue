<script setup lang="ts">
  import { useSeoMeta } from '#imports';

  import SearchForm from '~/components/SearchForm.vue';
  import { useDb } from '~/composables/useDb';

  useDb();

  useSeoMeta({
    title: 'Home | opcgdb',
  });
</script>

<template>
  <div id="home">
    <h1>One Piece Card Game Database Search</h1>
    <SearchForm />
  </div>
</template>

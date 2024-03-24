<script lang="ts" setup>
  import { useRoute, useSeoMeta } from '#imports';

  import SearchResults from '~/components/search/SearchResults.vue';
  import SearchResultsProvider from '~/providers/SearchResultsProvider.vue';

  const route = useRoute();

  useSeoMeta({
    title: `${route.query.q} - One Piece Card Game Search`,
  });
</script>

<template>
  <SearchResultsProvider>
    <SearchResults />
  </SearchResultsProvider>
</template>

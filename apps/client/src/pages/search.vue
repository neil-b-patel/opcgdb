<script lang="ts" setup>
  import { useRouter, useSeoMeta } from '#imports';
  import { ref, watch } from 'vue';

  import SearchResults from '~/components/search/SearchResults.vue';
  import SearchResultsProvider from '~/providers/SearchResultsProvider.vue';

  const router = useRouter();
  const titleQuery = ref(router.currentRoute.value.query.q);

  useSeoMeta({
    title: () => `${titleQuery.value} - One Piece Card Game Search`,
  });

  watch(router.currentRoute, (nr) => {
    titleQuery.value = nr.query.q;
  });
</script>

<template>
  <SearchResultsProvider>
    <SearchResults />
  </SearchResultsProvider>
</template>

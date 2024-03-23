<script lang="ts" setup>
  import { useRoute } from '#app';
  import { onMounted, watch } from 'vue';

  import { getFilterMap } from '~/utils/getFilterMap';
  import { parseSearchQuery } from '~/utils/parseSearchQuery';

  const route = useRoute();

  const searchCards = (query: string) => {
    const queryMap = parseSearchQuery(query);
    const filterMap = getFilterMap(queryMap);
    console.log(filterMap);
  };

  onMounted(() => {
    searchCards(route.query.q as string);
  });

  watch(
    () => route.query,
    (query) => {
      searchCards(query.q as string);
    }
  );
</script>

<template>search</template>
import type { getFilterMap } from '~/utils/getFilterMap';

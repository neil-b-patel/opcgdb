<script lang="ts" setup>
  import { useRoute } from '#app';
  import { onMounted, watch } from 'vue';

  import { useDb } from '~/composables/useDb';
  import { getFilterMap } from '~/utils/getFilterMap';
  import { parseSearchQuery } from '~/utils/parseSearchQuery';

  const route = useRoute();
  const { getCardsByFilter } = useDb();

  const searchCards = (query: string) => {
    const queryMap = parseSearchQuery(query);
    const filterMap = getFilterMap(queryMap);
    const cards = getCardsByFilter(filterMap, 'en');
    console.log(cards);
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

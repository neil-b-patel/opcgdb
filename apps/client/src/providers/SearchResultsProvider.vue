<script setup lang="ts">
  import { provide, ref } from 'vue';

  import type { OPCardList } from '@opcgdb/data';

  import type { SearchResultsOrder, SearchResultsSort, SearchResultsView } from '../types';

  const cards = ref<OPCardList>([]);
  const setCards = (newCards: OPCardList) => {
    cards.value = newCards;
  };

  const view = ref<SearchResultsView>('images');
  const setView = (v: SearchResultsView) => {
    view.value = v;
  };

  const sort = ref<SearchResultsSort>('name');
  const setSort = (s: SearchResultsSort) => {
    sort.value = s;
  };

  const order = ref<SearchResultsOrder>('asc');
  const setOrder = (o: SearchResultsOrder) => {
    order.value = o;
  };

  provide('search-results', {
    cards,
    setCards,

    view,
    setView,

    order,
    setOrder,

    sort,
    setSort,
  });
</script>

<template>
  <slot />
</template>

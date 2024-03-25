<script setup lang="ts">
  import { provide, ref } from 'vue';

  import type {
    FeSearchResultsOrder,
    FeSearchResultsSort,
    FeSearchResultsView,
    OPCardList,
  } from '@opcgdb/types';

  const cards = ref<OPCardList>([]);
  const setCards = (newCards: OPCardList) => {
    cards.value = newCards;
  };

  const view = ref<FeSearchResultsView>('images');
  const setView = (v: FeSearchResultsView) => {
    view.value = v;
  };

  const sort = ref<FeSearchResultsSort>('name');
  const setSort = (s: FeSearchResultsSort) => {
    sort.value = s;
  };

  const order = ref<FeSearchResultsOrder>('asc');
  const setOrder = (o: FeSearchResultsOrder) => {
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

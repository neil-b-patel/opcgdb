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

  const currPage = ref(1);
  const setCurrPage = (page: number) => {
    currPage.value = page;
  };

  const queryMap = ref({});
  const setQueryMap = (map: Record<string, string>) => {
    queryMap.value = map;
  };

  const totalCards = ref(0);
  const setTotalCards = (total: number) => {
    totalCards.value = total;
  };

  const totalPages = ref(0);
  const setTotalPages = (total: number) => {
    totalPages.value = total;
  };

  const resetSearch = () => {
    setCards([]);
    setQueryMap({});
    setTotalCards(0);
    setTotalPages(0);
    setCurrPage(1);
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

    currPage,
    setCurrPage,

    queryMap,
    setQueryMap,

    totalCards,
    setTotalCards,

    totalPages,
    setTotalPages,

    resetSearch,
  });
</script>

<template>
  <slot />
</template>

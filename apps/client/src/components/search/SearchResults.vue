<script lang="ts" setup>
  import { useRoute } from '#imports';
  import { onMounted, ref, watch } from 'vue';

  import {
    FeSearchResultsOrderSchema,
    FeSearchResultsSortSchema,
    FeSearchResultsViewSchema,
  } from '@opcgdb/types';

  import CardGrid from '~/components/search/CardGrid.vue';
  import Paginator from '~/components/search/Paginator.vue';
  import SortBar from '~/components/search/SortBar.vue';
  import { useDb } from '~/composables/useDb';
  import { useSearchResults } from '~/composables/useSearchResults';
  import { getFilterMap } from '~/utils/getFilterMap';
  import { parseSearchQuery } from '~/utils/parseSearchQuery';

  const { getCardsByFilter } = useDb();
  const {
    cards,
    setCards,
    sort,
    order,
    view,
    setView,
    setOrder,
    setSort,
    currPage,
    setCurrPage,
    queryMap,
    setQueryMap,
    resetSearch,
    setTotalCards,
    setTotalPages,
  } = useSearchResults();

  const route = useRoute();
  const loading = ref(true);

  const sortCards = () => {
    setCards(
      cards.value.slice().sort((a, b) => {
        let result = 0;
        if (sort.value === 'name') {
          result = a.name.localeCompare(b.name);
        } else if (sort.value === 'set') {
          result = a.set.localeCompare(b.set);
        } else if (sort.value === 'category') {
          result = a.category.localeCompare(b.category);
        } else if (sort.value === 'rarity') {
          result = a.rarity.localeCompare(b.rarity);
        } else if (sort.value === 'cost') {
          result = parseInt(a.cost ? a.cost : '', 10) - parseInt(b.cost ? b.cost : '', 10);
        } else if (sort.value === 'power') {
          result = parseInt(a.power ? a.power : '', 10) - parseInt(b.power ? b.power : '', 10);
        }
        return order.value === 'desc' ? -result : result;
      })
    );
  };

  const updateResults = () => {
    const v = FeSearchResultsViewSchema.safeParse(route.query.view);
    const s = FeSearchResultsSortSchema.safeParse(route.query.sort);
    const o = FeSearchResultsOrderSchema.safeParse(route.query.order);

    if (v.success) {
      setView(v.data);
    }

    if (s.success) {
      setSort(s.data);
    }

    if (o.success) {
      setOrder(o.data);
    }

    sortCards();
    loading.value = false;
  };

  const searchCards = (query: string) => {
    loading.value = true;
    setQueryMap(parseSearchQuery(query));
    const filterMap = getFilterMap(queryMap.value);
    const res = getCardsByFilter(filterMap, 'en', currPage.value);
    setTotalCards(res.data?.totalCards || 0);
    setTotalPages(res.data?.totalPages || 0);
    setCards(res.data?.cards || []);
    updateResults();
  };

  const updateCurrPage = () => {
    if (route.query.p) {
      console.log('updating current page');
      setCurrPage(parseInt(route.query.p as string, 10));
    } else {
      setCurrPage(1);
    }
  };

  const init = () => {
    resetSearch();
    updateCurrPage();
    searchCards(route.query.q as string);
  };

  onMounted(() => {
    init();
  });

  watch(
    () => route.query,
    () => {
      init();
    }
  );
</script>

<template>
  <div class="search-results" v-if="!loading">
    <SortBar />
    <Paginator v-if="cards.length" section="top" />
    <CardGrid v-if="cards.length && view === 'images'" :cards="cards" />
    <div v-else>No cards found for your search</div>
    <Paginator v-if="cards.length" section="bottom" />
  </div>
</template>

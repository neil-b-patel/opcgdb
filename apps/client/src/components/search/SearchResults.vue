<script lang="ts" setup>
  import { useRoute, useRouter } from '#imports';
  import { onMounted, ref, watch } from 'vue';

  import { ApiOrderSchema, ApiSortSchema, FeSearchResultsViewSchema } from '@opcgdb/types';

  import ActionBar from '~/components/search/ActionBar.vue';
  import CardGrid from '~/components/search/CardGrid.vue';
  import ResultsDescription from '~/components/search/ResultsDescription.vue';
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
    filterMap,
    setFilterMap,
    resetSearch,
    setTotalCards,
    setTotalPages,
  } = useSearchResults();

  const route = useRoute();
  const router = useRouter();
  const loading = ref(true);

  const setOrderViewSortValues = () => {
    const v = FeSearchResultsViewSchema.safeParse(router.currentRoute.value.query.view);
    const s = ApiSortSchema.safeParse(router.currentRoute.value.query.sort);
    const o = ApiOrderSchema.safeParse(router.currentRoute.value.query.order);

    if (v.success) {
      setView(v.data);
    }

    if (s.success) {
      setSort(s.data);
    }

    if (o.success) {
      setOrder(o.data);
    }

    setCards(cards.value);
  };

  const searchCards = (query: string) => {
    loading.value = true;
    setOrderViewSortValues();
    const queryMap = parseSearchQuery(query);
    setFilterMap(getFilterMap(queryMap));
    const res = getCardsByFilter(filterMap.value, 'en', currPage.value, sort.value, order.value);
    setTotalCards(res.data?.totalCards || 0);
    setTotalPages(res.data?.totalPages || 0);
    setCards(res.data?.cards || []);
    loading.value = false;
  };

  const updateCurrPage = () => {
    if (router.currentRoute.value.query.p) {
      setCurrPage(parseInt(router.currentRoute.value.query.p as string, 10));
    } else {
      setCurrPage(1);
    }
  };

  const init = () => {
    resetSearch();
    updateCurrPage();
    searchCards(router.currentRoute.value.query.q as string);
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
    <ActionBar section="top" />
    <ResultsDescription v-if="cards.length" section="top" />
    <CardGrid v-if="cards.length && view === 'images'" :cards="cards" />
    <div v-else>No cards found for your search</div>
    <ActionBar section="bottom" />
  </div>
</template>

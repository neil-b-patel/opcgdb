import { inject, type Ref } from 'vue';

import type { ApiOrder, ApiSort, FeSearchResultsView, OPCardList } from '@opcgdb/types';

export const useSearchResults = () => {
  const {
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
    filterMap,
    setFilterMap,
    totalCards,
    setTotalCards,
    totalPages,
    setTotalPages,
    resetSearch,
  } = inject<{
    cards: Ref<OPCardList>;
    setCards: (c: OPCardList) => void;
    view: Ref<FeSearchResultsView>;
    setView: (v: FeSearchResultsView) => void;
    order: Ref<ApiOrder>;
    setOrder: (o: ApiOrder) => void;
    sort: Ref<ApiSort>;
    setSort: (s: ApiSort) => void;
    currPage: Ref<number>;
    setCurrPage: (p: number) => void;
    filterMap: Ref<Record<string, any>>;
    setFilterMap: (q: Record<string, any>) => void;
    totalCards: Ref<number>;
    setTotalCards: (t: number) => void;
    totalPages: Ref<number>;
    setTotalPages: (t: number) => void;
    resetSearch: () => void;
  }>('search-results')!;

  return {
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
    filterMap,
    setFilterMap,
    totalCards,
    setTotalCards,
    totalPages,
    setTotalPages,
    resetSearch,
  };
};

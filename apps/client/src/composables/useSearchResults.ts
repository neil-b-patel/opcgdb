import { inject, type Ref } from 'vue';

import type {
  FeSearchResultsOrder,
  FeSearchResultsSort,
  FeSearchResultsView,
  FeValidatedQueryMap,
  OPCardList,
} from '@opcgdb/types';

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
    queryMap,
    setQueryMap,
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
    order: Ref<FeSearchResultsOrder>;
    setOrder: (o: FeSearchResultsOrder) => void;
    sort: Ref<FeSearchResultsSort>;
    setSort: (s: FeSearchResultsSort) => void;
    currPage: Ref<number>;
    setCurrPage: (p: number) => void;
    queryMap: Ref<FeValidatedQueryMap>;
    setQueryMap: (q: FeValidatedQueryMap) => void;
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
    queryMap,
    setQueryMap,
    totalCards,
    setTotalCards,
    totalPages,
    setTotalPages,
    resetSearch,
  };
};

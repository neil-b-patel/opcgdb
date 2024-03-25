import { inject, type Ref } from 'vue';

import type { OPCardList } from '@opcgdb/data';

import type { SearchResultsOrder, SearchResultsSort, SearchResultsView } from '../types';

export const useSearchResults = () => {
  const { cards, setCards, view, setView, order, setOrder, sort, setSort } = inject<{
    cards: Ref<OPCardList>;
    setCards: (c: OPCardList) => void;
    view: Ref<SearchResultsView>;
    setView: (v: SearchResultsView) => void;
    order: Ref<SearchResultsOrder>;
    setOrder: (o: SearchResultsOrder) => void;
    sort: Ref<SearchResultsSort>;
    setSort: (s: SearchResultsSort) => void;
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
  };
};

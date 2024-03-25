import { inject, type Ref } from 'vue';

import type {
  FeSearchResultsOrder,
  FeSearchResultsSort,
  FeSearchResultsView,
  OPCardList,
} from '@opcgdb/types';

export const useSearchResults = () => {
  const { cards, setCards, view, setView, order, setOrder, sort, setSort } = inject<{
    cards: Ref<OPCardList>;
    setCards: (c: OPCardList) => void;
    view: Ref<FeSearchResultsView>;
    setView: (v: FeSearchResultsView) => void;
    order: Ref<FeSearchResultsOrder>;
    setOrder: (o: FeSearchResultsOrder) => void;
    sort: Ref<FeSearchResultsSort>;
    setSort: (s: FeSearchResultsSort) => void;
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

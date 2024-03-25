import type { OPLang } from '@opcgdb/types';

import { useDb } from './useDb';

export const useRandomCards = (n = 1, lang: OPLang = 'en') => {
  const { cards } = useDb();
  // Create a set to store unique items
  const shuffledArray = cards[lang].sort(() => Math.random() - 0.5);
  const uniqueItems = new Set(shuffledArray);

  // Convert the set back to an array
  const uniqueArray = Array.from(uniqueItems);

  // If the count requested is greater than the number of unique items, return all unique items
  if (n >= uniqueArray.length) {
    return uniqueArray;
  }

  // Otherwise, return a slice of the array containing the requested number of unique items
  return uniqueArray.slice(0, n);
};

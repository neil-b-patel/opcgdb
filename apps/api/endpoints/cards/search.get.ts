import type { Request, Response } from 'express';

import { cards } from '@opcgdb/data';

import query from '../../queries/getCardsByFilter.js';
import { SearchCardQuerySchema } from '../../types.js';

const searchCardsByFilter = (req: Request, res: Response) => {
  try {
    if (!req.query) {
      throw new Error(
        'No filters were passed. At least one filtes is necessary to perform a search.'
      );
    }
    const {
      lang = 'en',
      number,
      set,
      rarity,
      color,
      category,
      life,
      attribute,
      power,
      cost,
      type,
      name,
      counter,
      trigger,
    } = SearchCardQuerySchema.parse(req.query);

    const filters = {
      number,
      set,
      rarity,
      color,
      category,
      life,
      attribute,
      power,
      cost,
      type,
      name,
      counter: counter === '1',
      trigger: trigger === '1',
    };
    const qres = query(filters, cards[lang]);
    res.status(qres.status).json({ ...qres });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default searchCardsByFilter;

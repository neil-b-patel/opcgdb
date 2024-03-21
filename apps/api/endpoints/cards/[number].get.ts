import type { Request, Response } from 'express';

import { cards } from '@opcgdb/data';

import query from '../../queries/getCardsByNumber.js';
import { CardsByNumberParamsSchema, CardsByNumberQuerySchema } from '../../types.js';

const getCardsByNumber = (req: Request, res: Response) => {
  try {
    const { number } = CardsByNumberQuerySchema.parse(req.params);
    const { lang = 'en' } = CardsByNumberParamsSchema.parse(req.query);
    if (!number) {
      throw new Error('Number is required');
    }
    const qres = query(number, cards[lang]);
    res.status(qres.status).json({ ...qres });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getCardsByNumber;

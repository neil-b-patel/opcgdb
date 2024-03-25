import type { Request, Response } from 'express';

import { cards } from '@opcgdb/data';
import { ApiCardsByNumberParamsSchema, ApiCardsByNumberQuerySchema } from '@opcgdb/types';

import query from '../../queries/getCardsByNumber.js';

const getCardsByNumber = (req: Request, res: Response) => {
  try {
    const { number } = ApiCardsByNumberQuerySchema.parse(req.params);
    const { lang = 'en' } = ApiCardsByNumberParamsSchema.parse(req.query);
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

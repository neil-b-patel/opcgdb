import type { Request, Response } from 'express';

import { cards } from '@opcgdb/data';
import { ApiCardByIdParamsSchema, ApiCardsByIdQuerySchema } from '@opcgdb/types';

import query from '../../queries/getCardByID.js';

const getCardByID = (req: Request, res: Response) => {
  try {
    const { id } = ApiCardByIdParamsSchema.parse(req.params);
    const { lang = 'en' } = ApiCardsByIdQuerySchema.parse(req.query);
    const qres = query(id!, cards[lang]); // Adding ! is safe as if it's underfined zod will throw an error and we won't get here
    res.status(qres.status).json({ ...qres });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getCardByID;

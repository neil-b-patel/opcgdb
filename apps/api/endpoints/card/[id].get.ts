import type { Request, Response } from 'express';

import query from '../../queries/getCardByID.js';
import { CardByIdParamsSchema, CardsByNameQuerySchema } from '../../types.js';

const getCardByID = (req: Request, res: Response) => {
  try {
    const { id } = CardByIdParamsSchema.parse(req.params);
    const { lang } = CardsByNameQuerySchema.parse(req.query);
    const qres = query(id, lang);
    res.status(qres.status).json({ ...qres });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getCardByID;

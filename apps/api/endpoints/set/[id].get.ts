import type { Request, Response } from 'express';

import { sets } from '@opcgdb/data';

import query from '../../queries/getSetByID.js';
import { SetByIdParamsSchema, SetByIdQuerySchema } from '../../types.js';

const getSetById = (req: Request, res: Response) => {
  try {
    const { id } = SetByIdParamsSchema.parse(req.params);
    const { lang = 'en' } = SetByIdQuerySchema.parse(req.query);
    const qres = query(id!, sets[lang]); // Adding ! is safe as if it's underfined zod will throw an error and we won't get here
    res.status(qres.status).json({ ...qres });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getSetById;

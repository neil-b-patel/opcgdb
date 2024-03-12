import type { Request, Response } from 'express';

import query from '../../queries/getSetByID.js';
import { SetByIdParamsSchema } from '../../types.js';

const getSetById = (req: Request, res: Response) => {
  try {
    const { id } = SetByIdParamsSchema.parse(req.params);
    const qres = query(id!); // Adding ! is safe as if it's underfined zod will throw an error and we won't get here
    res.status(qres.status).json({ ...qres });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getSetById;

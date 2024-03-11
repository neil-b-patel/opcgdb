import type { Request, Response } from 'express';

import query from '../../queries/getSetByID.js';
import { SetByIdParamsSchema } from '../../types.js';

const getSetById = (req: Request, res: Response) => {
  try {
    const { id } = SetByIdParamsSchema.parse(req.params);
    const qres = query(id);
    res.status(qres.status).json({ ...qres });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getSetById;

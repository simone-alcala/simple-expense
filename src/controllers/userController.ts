import { Request, Response} from 'express';

import * as service from '../services/userService';

export async function findAll(req: Request, res: Response) {
  const result = await service.findAll();
  res.status(200).send(result);
}

export async function findById(req: Request, res: Response) {
  const { id } = req.params;
  const result = await service.findById(id);
  res.status(200).send(result);
}
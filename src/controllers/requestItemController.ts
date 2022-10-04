import { Request, Response} from 'express';

import * as service from '../services/requestItemService';
import { ControllerRequestItemType } from '../types/requestItemType';

export async function create(req: Request, res: Response) {
  const { id } = req.params;
  const body : ControllerRequestItemType = req.body;
  const result = await service.create(body as ControllerRequestItemType, id, res.locals.currentUserId);
  res.status(200).send(result);
}

export async function findById(req: Request, res: Response) {
  const { id } = req.params;
  const result = await service.getById(id, res.locals.currentUserId);
  res.status(200).send(result);
}

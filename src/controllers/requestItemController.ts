import { Request, Response} from 'express';

import * as service from '../services/requestItemService';
import { ControllerRequestItemType, UpdateRequestItemType } from '../types/requestItemType';

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

export async function findAllByRequestId(req: Request, res: Response) {
  const { id } = req.params;
  const result = await service.findAllByRequestId(id, res.locals.currentUserId);
  res.status(200).send(result);
}

export async function update(req: Request, res: Response) {
  const { requestId, itemId } = req.params;
  const body : UpdateRequestItemType = req.body;
  const result = await service.update(body, itemId, requestId, res.locals.currentUserId);
  res.status(200).send(result);
}
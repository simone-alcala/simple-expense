import { Request, Response} from 'express';

import * as service from '../services/requestService';
import { ControllerRequestType } from '../types/requestType';

export async function create(req: Request, res: Response) {
  const body : ControllerRequestType = req.body;
  const result = await service.create(body, res.locals.currentUserId);
  res.status(200).send(result);
}

export async function findById(req: Request, res: Response) {
  const { id } = req.params;
  const result = await service.getById(id);
  res.status(200).send(result);
}

export async function findByStatus(req: Request, res: Response) {
  const { status } = req.params;
  const result = await service.findByStatus(status);
  res.status(200).send(result);
}

export async function findByRequesterId(req: Request, res: Response) {
  const { requesterId } = req.params;
  const result = await service.getByRequesterId(requesterId);
  res.status(200).send(result);
}

export async function findAll(req: Request, res: Response) {
  const result = await service.findAll(res.locals.currentUserId);
  res.status(200).send(result);
}

export async function updateStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;
  await service.updateStatus(id, res.locals.currentUserId, status);
  res.sendStatus(200);
}
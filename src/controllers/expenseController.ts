import { Request, Response} from 'express';

import * as service from '../services/expenseService';
import { CreateExpenseType } from '../types/expenseType';

export async function create(req: Request, res: Response) {
  const data: CreateExpenseType = req.body;
  await service.create(data);
  res.sendStatus(201);
}

export async function findAll(req: Request, res: Response) {
  const result = await service.findAll();
  res.status(200).send(result);
}

export async function findById(req: Request, res: Response) {
  const { id } = req.params;
  const result = await service.getById(id);
  res.status(200).send(result);
}

/*
export async function findAllExpenseTypes(req: Request, res: Response) {
  const result = await service.findAllExpenseTypes();
  res.status(200).send(result);
}
*/

/*
export async function findByType(req: Request, res: Response) {
  const { type } = req.body;
  const result = await service.findByType(type);
  res.status(200).send(result);
}
*/

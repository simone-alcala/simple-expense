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

export async function updateUserType(req: Request, res: Response) {
  const { id } = req.params;
  const { type } = req.body;
  await service.updateUserType(id, type);
  res.sendStatus(200);
}

export async function validateToken(req: Request, res: Response) {
  const { token }  = req.body; 
  await service.isValidToken(token);
  res.sendStatus(200);
}
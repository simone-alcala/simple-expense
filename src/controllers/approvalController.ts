import { Request, Response} from 'express';

import * as service from '../services/approvalService';
import { ControllerApprovalType } from '../types/approvalType';

export async function create(req: Request, res: Response) {
  const { requestId } = req.params;
  const body : ControllerApprovalType = req.body;
  await service.create(body, res.locals.currentUserId, requestId);
  res.sendStatus(200);
}

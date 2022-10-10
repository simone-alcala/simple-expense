import { Router } from 'express';

import validateSchema from '../middlewares/validateSchemaMiddleware';
import validateToken from '../middlewares/validateTokenMiddleware';
import validateUserTypeMiddleware from '../middlewares/validateUserTypeMiddleware';
import * as controller from '../controllers/approvalController';
import { createApproval } from '../schemas/approvalSchema';

const approvalRouter = Router();

approvalRouter.post (
  '/approvals/:requestId', 
  validateToken, 
  validateUserTypeMiddleware('APPROVER'), 
  validateSchema(createApproval), 
  controller.create);

export default approvalRouter;
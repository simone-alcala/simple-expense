import { Router } from 'express';

import validateSchema from '../middlewares/validateSchemaMiddleware';
import validateToken from '../middlewares/validateTokenMiddleware';
import * as controller from '../controllers/approvalController';
import { createApproval } from '../schemas/approvalSchema';

const approvalRouter = Router();

approvalRouter.post ('/approvals/:requestId', validateToken, validateSchema(createApproval), controller.create);

export default approvalRouter;
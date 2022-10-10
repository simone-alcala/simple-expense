import { Router } from 'express';

import validateToken from '../middlewares/validateTokenMiddleware';
import validateSchema from '../middlewares/validateSchemaMiddleware';
import validateUserTypeMiddleware from '../middlewares/validateUserTypeMiddleware';
import * as controller from '../controllers/requestController';
import { createExpense, statusExpense } from '../schemas/requestSchema';

const requestRouter = Router();

requestRouter.post ('/requests'                   , validateToken, validateSchema(createExpense), controller.create       );
requestRouter.patch('/requests/:id'               , validateToken, validateSchema(statusExpense), controller.updateStatus );
requestRouter.get  ('/requests'                   , validateToken, controller.findAll          );
requestRouter.get  ('/requests/user/:requesterId' , validateToken, controller.findByRequesterId);
requestRouter.get  ('/requests/status/:status'    , validateToken, validateUserTypeMiddleware('APPROVER'), controller.findByStatus     );
requestRouter.get  ('/requests/:id'               , validateToken, controller.findById         );

export default requestRouter;
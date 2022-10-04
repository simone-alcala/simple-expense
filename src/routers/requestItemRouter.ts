import { Router } from 'express';

import validateSchema from '../middlewares/validateSchemaMiddleware';
import { createExpenseItem } from '../schemas/requestItemSchema';
import validateToken from '../middlewares/validateTokenMiddleware';
import * as controller from '../controllers/requestItemController';

const requestItemRouter = Router();

requestItemRouter.post('/request-items/:id'      , validateToken, validateSchema(createExpenseItem), controller.create  );
requestItemRouter.get ('/request-items/item/:id' , validateToken, controller.findById);
requestItemRouter.get ('/request-items/items/:id', validateToken, controller.findAllByRequestId  );

export default requestItemRouter;
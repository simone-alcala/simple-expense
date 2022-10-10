import { Router } from 'express';

import validateSchema from '../middlewares/validateSchemaMiddleware';
import { createExpenseItem, updateExpenseItem } from '../schemas/requestItemSchema';
import validateToken from '../middlewares/validateTokenMiddleware';
import * as controller from '../controllers/requestItemController';

const requestItemRouter = Router();

requestItemRouter.post('/request-items/:id'      , validateToken, validateSchema(createExpenseItem), controller.create  );
requestItemRouter.get ('/request-items/item/:id' , validateToken, controller.findById);
requestItemRouter.get ('/request-items/items/:id', validateToken, controller.findAllByRequestId  );
requestItemRouter.put ('/request-items/items/:requestId/:itemId', validateToken, validateSchema(updateExpenseItem), controller.update );
requestItemRouter.delete ('/request-items/items/:requestId/:itemId', validateToken, controller.deleteById );

export default requestItemRouter;
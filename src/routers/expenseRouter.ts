import { Router } from 'express';

import validateSchema from '../middlewares/validateSchemaMiddleware';
import { createExpense } from '../schemas/expenseSchema';
import validateToken from '../middlewares/validateTokenMiddleware';
import * as controller from '../controllers/expenseController';

const expenseRouter = Router();

expenseRouter.post('/expenses'    , validateToken, validateSchema(createExpense), controller.create  );
expenseRouter.get ('/expenses'    , validateToken, controller.findAll );
expenseRouter.get ('/expenses/:id', validateToken, controller.findById);

export default expenseRouter;
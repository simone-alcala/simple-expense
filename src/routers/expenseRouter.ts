import { Router } from 'express';

import validateToken from '../middlewares/validateTokenMiddleware';
import validateSchema from '../middlewares/validateSchemaMiddleware';
import validateUserTypeMiddleware from '../middlewares/validateUserTypeMiddleware';

import { createExpense } from '../schemas/expenseSchema';
import * as controller from '../controllers/expenseController';

const expenseRouter = Router();

expenseRouter.post('/expenses', 
  validateToken, 
  validateUserTypeMiddleware('ADMIN'), 
  validateSchema(createExpense), 
  controller.create  );
expenseRouter.get ('/expenses'    , validateToken, controller.findAll );
expenseRouter.get ('/expenses/:id', validateToken, controller.findById);

export default expenseRouter;
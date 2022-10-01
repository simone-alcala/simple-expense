import { Router } from 'express';

import validateToken from '../middlewares/validateTokenMiddleware';
import * as controller from '../controllers/expenseController';

const expenseRouter = Router();

expenseRouter.post('/expenses'        , validateToken, controller.create  );
expenseRouter.get ('/expenses'        , validateToken, controller.findAll );
expenseRouter.get ('/expenses/:id'    , validateToken, controller.findById);

export default expenseRouter;
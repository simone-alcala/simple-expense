import { Router } from 'express';

import validateToken from '../middlewares/validateTokenMiddleware';
import * as controller from '../controllers/userController';

const userRouter = Router();

userRouter.get('/users'     , validateToken, controller.findAll);
userRouter.get('/users/:id' , validateToken, controller.findById);

export default userRouter;
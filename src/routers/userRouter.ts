import { Router } from 'express';

import validateToken from '../middlewares/validateTokenMiddleware';
import validateSchema from '../middlewares/validateSchemaMiddleware';
import validateUserTypeMiddleware from '../middlewares/validateUserTypeMiddleware';
import * as controller from '../controllers/userController';
import { updateType } from '../schemas/userSchema';

const userRouter = Router();

userRouter.patch('/users/:id' , 
  validateToken, 
  validateUserTypeMiddleware('ADMIN'), 
  validateSchema(updateType) , 
  controller.updateUserType);
userRouter.get  ('/users'     , validateToken, validateUserTypeMiddleware('ADMIN'), controller.findAll);
userRouter.get  ('/users/:id' , validateToken, validateUserTypeMiddleware('ADMIN'), controller.findById);

userRouter.post('/token', controller.validateToken);

export default userRouter;
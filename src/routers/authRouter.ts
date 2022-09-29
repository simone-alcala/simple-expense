import { Router } from 'express';

import validateSchema from './../middlewares/validateSchemaMiddleware';
import { signUp, signIn } from '../schemas/userSchema';
import * as controller from '../controllers/authController';

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(signUp), controller.signUp);
authRouter.post('/sign-in', validateSchema(signIn), controller.signIn);

export default authRouter;
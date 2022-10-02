import { Router } from 'express';

import authRouter from './authRouter';
import userRouter from './userRouter';
import expenseRouter from './expenseRouter';
import requestRouter from './requestRouter';

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(expenseRouter);
router.use(requestRouter);

export default router;
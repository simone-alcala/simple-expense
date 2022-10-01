import { Router } from 'express';

import authRouter from './authRouter';
import userRouter from './userRouter';
import expenseRouter from './expenseRouter';

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(expenseRouter);

export default router;
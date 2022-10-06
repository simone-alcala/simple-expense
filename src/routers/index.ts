import { Router } from 'express';

import authRouter         from './authRouter';
import userRouter         from './userRouter';
import expenseRouter      from './expenseRouter';
import requestRouter      from './requestRouter';
import requestItemRouter  from './requestItemRouter';
import approvalRouter     from './approvalRouter';

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(expenseRouter);
router.use(requestRouter);
router.use(requestItemRouter);
router.use(approvalRouter);

export default router;
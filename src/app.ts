import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';

import router from '../src/routers/index';
import errorHandler from './middlewares/errorHandlerMiddleware';

const app = express();
app.use(cors());
app.use(json({ limit: '2mb' }));
app.use(router);
app.use(errorHandler);

export default app;
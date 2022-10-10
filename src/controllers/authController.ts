import { Request, Response} from 'express';

import { CreateUserType, LoginUserType } from '../types/userType';
import * as authService from '../services/authService';

export async function signUp(req: Request, res: Response) {
  const data: CreateUserType = req.body;
  await authService.SignUp(data);
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const data : LoginUserType = req.body;
  const { token, name } = await authService.SignIn(data);
  res.status(200).send({ token, name } );
}
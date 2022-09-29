import { Request, Response, NextFunction } from 'express';
import { isValidToken } from '../services/userService';
import { unauthorized } from '../utils/errorUtils';

export default async function validateToken(req: Request, res: Response, next: NextFunction) {
  const errorMessage = 'Invalid token';
  const token = req.headers['authorization'] as string;
  if (!token) {
    throw unauthorized(errorMessage);
  }
  const tokenBearer = token.split('Bearer ');
  if (tokenBearer[0] !== '') {    
    throw unauthorized(errorMessage);
  }
  isValidToken(tokenBearer[1], errorMessage);
  next();
}
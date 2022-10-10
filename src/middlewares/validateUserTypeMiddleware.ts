import { Request, Response, NextFunction } from 'express';

import { unauthorized } from '../utils/errorUtils';



export default function validateUserTypeMiddleware(type: string) {
  
  return ( (req: Request, res: Response, next: NextFunction) => {
    
    const errorMessage = 'Invalid user';
    const userType = res.locals.currentUserType;

    if (type === 'ADMIN' && userType !== type) {      
      throw unauthorized(errorMessage);
    } else if (type === 'APPROVER' && userType !== type) {
      throw unauthorized(errorMessage);
    }

    next();

  });
  
}
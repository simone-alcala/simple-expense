import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { wrongSchema } from '../utils/errorUtils';

export default function validateSchema(schema: ObjectSchema) {
  return ( (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      const sendMessage = wrongSchema(validation.error.message);
      return res.status(sendMessage.statusCode).send(sendMessage.message);
    }
    next();
  });
}
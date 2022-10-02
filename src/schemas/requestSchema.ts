import Joi from 'joi';
import { ControllerRequestType } from './../types/requestType';

export const createExpense = Joi.object<ControllerRequestType>({
  description: Joi.string().trim().required(),
});

export const statusExpense = Joi.object({
  status: Joi.string().trim().uppercase()
    .valid('OPEN', 'SENT', 'APPROVED', 'REJECTED', 'CANCELED')
    .required(),
});

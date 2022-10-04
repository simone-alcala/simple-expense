import Joi from 'joi';
import { ControllerRequestItemType } from './../types/requestItemType';

export const createExpenseItem = Joi.object<ControllerRequestItemType>({
  expenseId: Joi.number().integer().required(),
  observation: Joi.string().trim().allow(''),
  receipt: Joi.string().trim().allow(''),
  amount: Joi.number().min(0.00).required(),
  date: Joi.date().required(),
});

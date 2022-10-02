import Joi from 'joi';
import { ControllerRequestItemType } from './../types/requestItemType';

export const createExpenseItem = Joi.object<ControllerRequestItemType>({
  expenseId: Joi.number().integer().required(),
  observation: Joi.string().trim(),
  receipt: Joi.string().trim(),
  amount: Joi.number().min(0.00).required(),
  date: Joi.date().required(),
});

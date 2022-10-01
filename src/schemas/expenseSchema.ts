import Joi from 'joi';
import { CreateExpenseType } from '../types/expenseType';

export const createExpense = Joi.object<CreateExpenseType>({
  description: Joi.string().trim().required(),
  type: Joi.string().trim().uppercase()
    .valid('ACCOMMODATION', 'CLEANING', 'OFFICE', 'MEAL', 'TRANSPORT', 'OTHER')
    .required(),
});

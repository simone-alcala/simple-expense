import { Expense } from '@prisma/client';

export type CreateExpenseType = Omit<Expense, 'id'>;

export type expenseTypes =
  'ACCOMMODATION' |
  'CLEANING'      |
  'OFFICE'        |
  'MEAL'          |
  'TRANSPORT'     |
  'OTHER' 


import * as repository from '../repositories/expenseRepository';
import { CreateExpenseType, expenseTypes } from '../types/expenseType';
import * as throwError from './../utils/errorUtils';

export async function create(data: CreateExpenseType) {
  const newExpense : CreateExpenseType = {
    ...data,
    description: data.description.toUpperCase(),
    type: data.type.toUpperCase() as expenseTypes
  }
  await findByDescriptionAndFail(newExpense.description);
  return await repository.insert(newExpense);
}

export async function findByDescriptionAndFail(description: string) {
  const result = await findByDescription(description);
  if (result) {
    throw throwError.conflict('Description already registered')
  }
}

export async function findByDescription(description: string) {
  return await repository.findByDescription(description.toUpperCase());
}

export async function findAll() {
  return await repository.findAll();
}

export async function findByType(type: expenseTypes) {
  return await repository.findByType(type);
}

export async function getById(stringId: string) {
  const id = Number(stringId);
  if (isNaN(id)) {
    return {};
  }
  const result = await findById(id);
  if (!result) {
    return {};
  }
  return result;
}

export async function findById(id: number) {
  return await repository.findById(id);
}

export async function findAllExpenseTypes() {
  return [  
    'ACCOMMODATION',
    'CLEANING',
    'OFFICE',
    'MEAL',
    'TRANSPORT',
    'OTHER' 
  ];
}
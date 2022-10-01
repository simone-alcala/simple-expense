import prisma from '../database/config';

import { CreateExpenseType, expenseTypes } from '../types/expenseType';

export async function insert(data: CreateExpenseType) {
  return prisma.expense.create({ data });  
}

export async function findById(id: number) {
  return prisma.expense.findUnique({ 
    where: { id },
  });  
}

export async function findAll() {
  return prisma.expense.findMany();  
}

export async function findByType(type: expenseTypes) {
  return prisma.expense.findMany({ 
    where: { type },
  });  
}

export async function findByDescription(description: string) {
  return prisma.expense.findUnique({ 
    where: { description },
  });  
}
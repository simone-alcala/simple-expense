import * as repository from '../repositories/requestItemRepository';
import * as requestService from './requestService';
import * as expenseService from './expenseService';
import { ControllerRequestItemType, CreateRequestItemType } from '../types/requestItemType';
import * as throwError from '../utils/errorUtils';

export async function create(data: ControllerRequestItemType, requestId: string, userId: number) {
  const request = await getByRequestId(requestId, userId);
  await findExpenseByIdOrFail(data.expenseId);
  const newItem : CreateRequestItemType = {
    ...data,
    observation: data.observation ? data.observation.toUpperCase() : null,
    requestId: request.id,
    date: new Date(data.date)
  }
  const result = await repository.insert(newItem);
  await updateRequestAmount(request.id, 'increment', data.amount);
  return { requestItemId: result.id };
}

async function findExpenseByIdOrFail(expenseId: number) {
  const result = await expenseService.findById(expenseId);
  if (!result) {
    throw throwError.badRequest('Invalid expense ID');
  }
}

export async function getByRequestId(stringId: string, userId: number) {
  const id = Number(stringId);
  if (!isNaN(id)) {
    const result = await findByRequestId(id);
    if (result && result.requesterId === userId) {
      return result;
    }
  }
  throw throwError.unauthorized('Invalid request ID');
}

export async function findByRequestId(id: number) {
  return await requestService.findById(id);
}

async function updateRequestAmount (id: number, type: 'increment' | 'decrement', amount: number) {
  return await requestService.updateAmount(id, type, amount)
}

export async function getById(stringId: string, userId: number) {
  const id = Number(stringId);
  if (isNaN(id)) {
    return {};
  }
  const result = await findById(id);
  if (!result || result?.request.requesterId !== userId) {
    return {};
  }
  return result;
}

export async function findById(id: number) {
  return await repository.findById(id);
}
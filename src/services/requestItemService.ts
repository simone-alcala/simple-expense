import dayjs from 'dayjs';
import { RequestItem, Request } from '@prisma/client';
import * as repository from '../repositories/requestItemRepository';
import * as requestService from './requestService';
import * as expenseService from './expenseService';
import { ControllerRequestItemType, CreateRequestItemType, UpdateRequestItemType } from '../types/requestItemType';
import * as throwError from '../utils/errorUtils';

export async function create(data: ControllerRequestItemType, requestId: string, userId: number) {
  const request = await getByRequestId(requestId, userId);

  if (request.status !== 'OPEN') {
    throw throwError.badRequest('Request item can not be added');
  }

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

export async function findAllByRequestId(requestId: string, userId?: number) {
  const result:any[] = [];
  if (isNaN(Number(requestId))) {
    return [];
  }

  const request = await requestService.findByIdAndRequester(Number(requestId), Number(userId));

  if (!request) {
    throw throwError.notFound('Request ID not found');
  }

  const items = await repository.findAllByRequestId(Number(requestId));
  items.map(item => {
    result.push({
      id: item.id,
      date: dayjs(item.date).format('DD/MM/YYYY'),
      amount: (Math.round(item.amount * 100) / 100).toFixed(2),
      observation: item.observation,
      receipt: item.receipt,
      expense: item.expense.description,
    })
  });
  return result;
}

export async function update(data: UpdateRequestItemType, itemId: string, requestId: string, userId: number) {
  const request = await getByRequestId(requestId, userId);

  if (request.status !== 'REVIEW' && request.status !== 'OPEN') {
    throw throwError.badRequest('Request item can not be modified');
  }
  
  const item = await getById(itemId, userId) as RequestItem & { request: Request; };
  
  if (request.id !== item.requestId) {
    throw throwError.conflict('Invalid relation requestId and itemId');
  }

  if (data.expenseId) {
    await findExpenseByIdOrFail(data.expenseId);
  }

  let newItem : UpdateRequestItemType = {
    ...data,
  }

  if (data.date) {
    newItem = {
      ...data,
      date: new Date(data.date)
    }
  } 

  if (data.observation) {
    newItem = {
      ...data,
      observation: data.observation.toUpperCase(),
    }
  } 

  const result = await repository.updateById(item.id, newItem);

  if (data.amount) {
    await updateRequestAmount(request.id, 'decrement', item.amount);
    await updateRequestAmount(request.id, 'increment', data.amount);
  }
  
  return { requestItemId: result.id };
}
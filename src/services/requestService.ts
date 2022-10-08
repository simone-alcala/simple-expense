import { Request, Approval, RequestItem } from '@prisma/client';
import dayjs from 'dayjs';
import * as repository from '../repositories/requestRepository';
import { ControllerRequestType, CreateRequestType, requestStatus } from '../types/requestType';
import { ApprovalStatus } from '../types/approvalType';
import * as throwError from './../utils/errorUtils';

export async function create(data: ControllerRequestType, currentUserId: number) {
  const newRequest : CreateRequestType = {
    ...data,
    description: data.description.toUpperCase(),
    requesterId: currentUserId,
  }
  const result = await repository.insert(newRequest);
  return { requestId: result.id };
}

export async function findAll(requesterId: number) {
  const result: any[]= [];

  const requests =  await repository.findAll(requesterId);

  requests.map(request => {

    result.push({
      id: request.id,
      description: request.description,
      amount: (Math.round(request.amount * 100) / 100).toFixed(2),
      approverComment: request.approverComment,
      status: request.status,
      createdDate: dayjs(request.createdDate).format('DD/MM/YYYY'),
      requesterId: request.requesterId,
    })
  })

  return result;
}

export async function findByStatus(status: string) {
  status = status.toUpperCase();
  const result:any[] = [];

  if (getRequestStatusList().includes(status)) {
    const requests = await repository.findByStatus(status as requestStatus);

    requests.map(request => {
      const items: any[] = [];

      request.requestItems.map(item => {
        items.push({
          id: item.id,
          date: dayjs(item.date).format('DD/MM/YYYY'),
          amount: (Math.round(item.amount * 100) / 100).toFixed(2),
          observation: item.observation,
          receipt: item.receipt,
          expenseId: item.expenseId,
          expenseDesc: item.expense.description
        })
      });

      result.push({
        id: request.id,
        description: request.description,
        amount: (Math.round(request.amount * 100) / 100).toFixed(2),
        status: request.status,
        createdDate: dayjs(request.createdDate).format('DD/MM/YYYY'),
        requesterId: request.requesterId,
        requesterName: request.user.firstName + ' ' + request.user.lastName,
        requestItems: items,
      })
    })
  }

  return result;
}

export async function getByRequesterId(stringId: string) {
  const id = Number(stringId);
  if (isNaN(id)) {
    return {};
  }
  const result = await findByRequesterId(id);
  if (!result) {
    return {};
  }
  return result;
}

export async function findByRequesterId(requesterId: number) {
  return await repository.findAllByRequesterId(requesterId);
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

export async function updateStatus(stringId: string, userId: number, status: string) {
  status = status.toUpperCase();
  
  const result = await getById(stringId);
  
  if (Object.entries(result).length > 0) {

    const requests = {...result} as (Request & { 
      requestItems: RequestItem[];  
      approvals: Approval[]; 
    }) ;
    
    if (requests.requesterId === userId) {

      if (getRequestStatusList().includes(status)) {
        return await updateStatusById(requests.id, status as requestStatus)
      }
    }
  }

  throw throwError.unauthorized('Invalid request ID');
}

export async function updateStatusById(id: number, status: requestStatus) {
  await repository.updateStatus(id, status)
}

export function getRequestStatusList() {
  return ['OPEN', 'SENT', 'APPROVED', 'REJECTED', 'CANCELED'];
}

export async function updateAmount(id: number, type: 'increment' | 'decrement',  amount: number) {
  return await repository.updateAmount(id, type, amount);
}

export async function updateApproval(id: number, status: ApprovalStatus, comment: string) {
  return await repository.updateApproval(id, status, comment);
}
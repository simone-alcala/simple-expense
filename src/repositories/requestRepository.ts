import { Request } from '@prisma/client';
import prisma from '../database/config';

import { CreateRequestType, requestStatus } from '../types/requestType';

export async function insert(data: CreateRequestType) {
  return prisma.request.create({ data });  
}

export async function findById(id: number) {
  return prisma.request.findUnique({ 
    where: { id },
    include: {
      requestItems: true,
      approvals: true
    }
  });  
}

export async function findAll() {
  return prisma.request.findMany({ 
    include: {
      requestItems: true,
      approvals: true
    }
  });  
}

export async function findAllByRequesterId(requesterId: number) {
  return prisma.request.findMany({ 
    where: { requesterId },
    include: {
      requestItems: true,
      approvals: true
    }
  });  
}

export async function findByStatus(status: requestStatus) {
  return prisma.request.findMany({ 
    where: { status },
    include: {
      requestItems: true,
      approvals: true
    }
  });  
}

export async function updateStatus(id: number, status: requestStatus) {
  return prisma.request.update({ 
    where: { id },
    data: { status: status }
  })
}

export async function updateAmount(id: number, type: 'increment' | 'decrement', amount: number) {
  return prisma.request.update({ 
    where: { id },
    data: { amount: { [type]: amount } }
  })
}
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

export async function findAll(requesterId: number) {
  return prisma.request.findMany({ 
    where: {
      requesterId
    },
    orderBy: {
      id: 'asc'
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
    select: {
      id: true,
      description: true,
      amount: true,
      status: true,
      createdDate: true,
      requesterId: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
        }
      },
      requestItems: {
        select: {
          id: true,
          date: true,
          amount: true,
          observation: true,
          expenseId: true,
          receipt: true,
          expense: {
            select: {
              description: true
            }
          },
        },
        orderBy: [
          {
            date: 'asc'
          }
        ]
      }
    },
    orderBy: [
      {
        id: 'asc',
      },
    ]
      
    
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

export async function updateApproval(id: number, status: 'APPROVED' | 'REJECTED' | 'REVIEW', approverComment: string) {
  return prisma.request.update({ 
    where: { id },
    data: { status: status as requestStatus, approverComment }
  })
}

export async function findByIdAndRequester(id: number, requesterId: number) {
  return prisma.request.findFirst({ 
    where: { id, requesterId },
  });  
}
import prisma from '../database/config';

import { CreateRequestItemType, UpdateRequestItemType } from '../types/requestItemType';

export async function insert(data: CreateRequestItemType) {
  return prisma.requestItem.create({ data });  
}

export async function findById(id: number) {
  return prisma.requestItem.findUnique({ 
    where: { id },
    include: {
      request: true
    }
  });  
}

export async function findAll() {
  return prisma.requestItem.findMany();  
}

export async function findAllByRequestId(requestId: number) {
  return prisma.requestItem.findMany({ 
    where: { requestId },
    select: {
      id: true,
      date: true,
      amount: true,
      observation: true,
      receipt: true,
      expense: {
        select: {
          description: true
        }
      },
    },
    orderBy: [
      {
        date: 'asc',
      }
    ]
  });  
}

export async function updateById(id: number, data: UpdateRequestItemType) {
  return prisma.requestItem.update({ 
    where: { id },
    data
  })
}
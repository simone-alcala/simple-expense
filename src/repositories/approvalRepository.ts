import prisma from '../database/config';

import { CreateApprovalType } from '../types/approvalType';

export async function insert(data: CreateApprovalType) {
  return prisma.approval.create({ data });  
}

export async function findById(id: number) {
  return prisma.approval.findUnique({ 
    where: { id },
  });  
}

export async function findAllByRequestId(requestId: number) {
  return prisma.approval.findMany({ 
    where: { requestId },
  });  
}

export async function findLastApprovalByRequestId(requestId: number) {
  return prisma.approval.aggregate({ 
    where: { requestId },
    _max: {
      id: true
    }
  });  
}

import prisma from '../database/config';

import { CreateUserType } from '../types/userType';

export async function insert(data: CreateUserType) {
  return prisma.user.create({ data });  
}

export async function findById(id: number, password = false) {
  return prisma.user.findUnique({ 
    where: { id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      password
    }
  });  
}

export async function findByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });  
}

export async function findAll() {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    }
  });  
}
import prisma from '../database/config';

import { CreateUserType, UserType } from '../types/userType';

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
      type: true,
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
      type: true,
    },
    orderBy: [
      {
        firstName: 'asc'
      },
      {
        lastName: 'asc'
      }
    ]
  });  
}

export async function updateUserType(id: number, type: UserType) {
  return prisma.user.update({
    where: { id },
    data: { type },
  });  
}

export async function findBytype(type: UserType) {
  return prisma.user.findFirst({ where: { type } });  
}
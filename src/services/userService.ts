import loadEnv from '../config/envs';
import jwt from 'jsonwebtoken';

import * as throwError from '../utils/errorUtils';
import * as repository from '../repositories/userRepository';
import { UserType } from '../types/userType';

const JWT_KEY = process.env.JWT_KEY || '';

export async function findAll() {
  return await repository.findAll();
}

export async function findById(id: string) {
  if (isNaN(Number(id))){
    return {};
  }
  const result = await getUserById(Number(id), false);
  if (result === null) {
    return {};
  }
  return result;
}

export async function isValidToken(token: string, message?: string) {

  let userDecoded : { 
    userId: number   
  } | undefined;

  jwt.verify(token, JWT_KEY, (error, decoded) => {
    if (error) {
      throw throwError.unauthorized(message);
    } else {
      userDecoded = decoded as { userId: number };
    }
  });

  if (userDecoded?.userId){
    const user = await getUserById(userDecoded.userId);

    if (user) {
      return {
        userId: user.id,
        userType: user.type
      };
    } else {
      throw throwError.unauthorized('Invalid token');
    }
  }

}

async function getUserByEmail(email: string) {
  return await repository.findByEmail(email);
}

async function getUserById(id: number, password?: boolean) {
  if (password) {
    return await repository.findById(id, password);  
  }
  return await repository.findById(id);
}

export async function findUserByEmailAndFail(email: string) {
  const result = await getUserByEmail(email);
  if (result) {
    throw throwError.conflict('Email already registered');
  }
}

export async function findUserByEmailOrFail(email: string, message?: string) {
  const result = await getUserByEmail(email);
  if (!result) {
    throw throwError.notFound(message || 'User not found');
  }
  return result;
}

export async function findUserByIdOrFail(id: number) {
  const result = await getUserById(id);
  
  if (!result) {
    throw throwError.notFound('User not found');
  }
}

export async function updateUserType(id: string, type: UserType) {
  await findUserByIdOrFail(Number(id));
  if (type === 'APPROVER') {
    const approver = await repository.findBytype(type);
    if (approver) {
      throw throwError.conflict(`User ${approver.id} already is approver`);
    }
  }
  return repository.updateUserType(Number(id), type);
}

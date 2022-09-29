import { User } from '@prisma/client';

export type CreateUserType = Omit<User, 'id'>;

export type LoginUserType = Omit<User, 'id' | 'firstName' | 'lastName'>;


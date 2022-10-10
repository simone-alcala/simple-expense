import { User } from '@prisma/client';

export type CreateUserType = Omit<User, 'id' | 'type'>;

export type LoginUserType = Omit<User, 'id' | 'firstName' | 'lastName' | 'type'>;

export type UserType = 'ADMIN' |  'USER' | 'APPROVER';



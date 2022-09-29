import Joi from 'joi';
import { CreateUserType, LoginUserType } from '../types/userType';

export const signUp = Joi.object<CreateUserType>({
  email: Joi.string().trim().email().required(),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  password: Joi.string().trim().min(4).required(),
});

export const signIn = Joi.object<LoginUserType>({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(4).required(),
});